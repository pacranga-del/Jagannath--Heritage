from dotenv import load_dotenv
from pathlib import Path
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import uuid
import logging
import bcrypt
import jwt as pyjwt
from datetime import datetime, timezone, timedelta
from typing import List, Optional

from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response, Query
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr


# ---------- Config ----------
MONGO_URL = os.environ['MONGO_URL']
DB_NAME = os.environ['DB_NAME']
JWT_SECRET = os.environ.get('JWT_SECRET', 'change-me')
JWT_ALGO = 'HS256'
ACCESS_MIN = 60 * 24  # 1 day
REFRESH_DAYS = 30
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@example.com')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')

CATEGORY_SLUGS = {
    "rath-yatra": "Rath Yatra",
    "daily-darshan": "Daily Darshan",
    "charitable-activities": "Charitable Activities",
    "festivals": "Festivals",
}


# ---------- DB ----------
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]


# ---------- App ----------
app = FastAPI(title="Shri Puri Jagannath Trust API")
api = APIRouter(prefix="/api")


# ---------- Utils ----------
def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(pw: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(pw.encode('utf-8'), hashed.encode('utf-8'))
    except Exception:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(minutes=ACCESS_MIN),
    }
    return pyjwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)


def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "type": "refresh",
        "exp": datetime.now(timezone.utc) + timedelta(days=REFRESH_DAYS),
    }
    return pyjwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)


def set_auth_cookies(resp: Response, access: str, refresh: str):
    resp.set_cookie("access_token", access, httponly=True, secure=True, samesite="none",
                    max_age=ACCESS_MIN * 60, path="/")
    resp.set_cookie("refresh_token", refresh, httponly=True, secure=True, samesite="none",
                    max_age=REFRESH_DAYS * 86400, path="/")


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = pyjwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except pyjwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except pyjwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


async def require_admin(user: dict = Depends(get_current_user)) -> dict:
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    return user


# ---------- Models ----------
class LoginIn(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    email: EmailStr
    name: str
    role: str


class PhotoIn(BaseModel):
    caption: str = Field(default="", max_length=280)
    category: str
    image_data: str  # data:image/...;base64,....


class PhotoOut(BaseModel):
    id: str
    caption: str
    category: str
    category_label: str
    image_data: str
    created_at: str


class CategoryOut(BaseModel):
    slug: str
    label: str
    count: int


# ---------- Startup ----------
@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.users.create_index("id", unique=True)
    await db.photos.create_index("id", unique=True)
    await db.photos.create_index("category")

    existing = await db.users.find_one({"email": ADMIN_EMAIL.lower()})
    if not existing:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": ADMIN_EMAIL.lower(),
            "name": "Trust Admin",
            "role": "admin",
            "password_hash": hash_password(ADMIN_PASSWORD),
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
    else:
        if not verify_password(ADMIN_PASSWORD, existing["password_hash"]):
            await db.users.update_one(
                {"email": ADMIN_EMAIL.lower()},
                {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}},
            )

    # Seed a few placeholder photos if collection is empty
    count = await db.photos.count_documents({})
    if count == 0:
        seeds = [
            ("rath-yatra", "The chariots of Lord Jagannath rolling through Bada Danda", "https://images.pexels.com/photos/17349035/pexels-photo-17349035.jpeg"),
            ("rath-yatra", "Ratha Yatra — sea of devotees, Puri", "https://images.unsplash.com/photo-1784177542889-49bc95213140"),
            ("rath-yatra", "Chariot festival procession", "https://images.unsplash.com/photo-1577649428994-a41a39ff862c"),
            ("rath-yatra", "The three chariots — Nandighosa, Taladhwaja, Darpadalana", "https://images.unsplash.com/photo-1577649428176-212243cd0655"),
            ("daily-darshan", "Morning aarti at the sanctum", "https://images.unsplash.com/photo-1701453344115-e4616d4844d9"),
            ("daily-darshan", "Lamps of devotion", "https://images.unsplash.com/photo-1666694051761-cd972857da30"),
            ("daily-darshan", "Bhog offering", "https://images.unsplash.com/photo-1630764883473-e8c2056f0589"),
            ("daily-darshan", "Sri Jagannath, Balabhadra and Subhadra", "https://images.unsplash.com/photo-1750992459302-7c17ef2501e4"),
            ("daily-darshan", "Deities garlanded", "https://images.unsplash.com/photo-1722404348790-85bf847dd863"),
            ("charitable-activities", "Annadanam — feeding the pilgrims", "https://images.pexels.com/photos/32299890/pexels-photo-32299890.jpeg"),
            ("charitable-activities", "Flowers and offerings collected for seva", "https://images.pexels.com/photos/31317668/pexels-photo-31317668.jpeg"),
            ("charitable-activities", "Community assembly in devotion", "https://images.pexels.com/photos/19195759/pexels-photo-19195759.jpeg"),
            ("festivals", "Snana Yatra — the bathing festival", "https://images.pexels.com/photos/34484944/pexels-photo-34484944.jpeg"),
            ("festivals", "Temple corridor lit by lamps", "https://images.pexels.com/photos/31969419/pexels-photo-31969419.jpeg"),
            ("festivals", "Ancient temple spires", "https://images.pexels.com/photos/31969428/pexels-photo-31969428.jpeg"),
            ("festivals", "Classical dance offered to the Lord", "https://images.pexels.com/photos/34717652/pexels-photo-34717652.jpeg"),
        ]
        now = datetime.now(timezone.utc)
        docs = []
        for idx, (cat, cap, url) in enumerate(seeds):
            docs.append({
                "id": str(uuid.uuid4()),
                "caption": cap,
                "category": cat,
                "image_data": url,  # for seeds we store url; admin uploads will store base64
                "created_at": (now - timedelta(minutes=idx)).isoformat(),
            })
        await db.photos.insert_many(docs)


@app.on_event("shutdown")
async def shutdown():
    client.close()


# ---------- Routes: health ----------
@api.get("/")
async def root():
    return {"message": "Shri Puri Jagannath Trust API"}


# ---------- Routes: auth ----------
@api.post("/auth/login")
async def login(body: LoginIn, response: Response):
    email = body.email.lower()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    access = create_access_token(user["id"], user["email"])
    refresh = create_refresh_token(user["id"])
    set_auth_cookies(response, access, refresh)
    return {
        "id": user["id"],
        "email": user["email"],
        "name": user["name"],
        "role": user["role"],
        "access_token": access,
    }


@api.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"ok": True}


@api.get("/auth/me", response_model=UserOut)
async def me(user: dict = Depends(get_current_user)):
    return {"id": user["id"], "email": user["email"], "name": user["name"], "role": user["role"]}


# ---------- Routes: gallery ----------
def _serialize_photo(doc: dict) -> dict:
    return {
        "id": doc["id"],
        "caption": doc.get("caption", ""),
        "category": doc["category"],
        "category_label": CATEGORY_SLUGS.get(doc["category"], doc["category"]),
        "image_data": doc["image_data"],
        "created_at": doc["created_at"],
    }


@api.get("/gallery/categories", response_model=List[CategoryOut])
async def gallery_categories():
    out = []
    for slug, label in CATEGORY_SLUGS.items():
        c = await db.photos.count_documents({"category": slug})
        out.append({"slug": slug, "label": label, "count": c})
    return out


@api.get("/gallery", response_model=List[PhotoOut])
async def gallery_list(category: Optional[str] = Query(default=None)):
    query = {}
    if category and category != "all":
        if category not in CATEGORY_SLUGS:
            raise HTTPException(status_code=400, detail="Invalid category")
        query["category"] = category
    docs = await db.photos.find(query, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [_serialize_photo(d) for d in docs]


@api.post("/gallery", response_model=PhotoOut)
async def gallery_create(body: PhotoIn, _admin: dict = Depends(require_admin)):
    if body.category not in CATEGORY_SLUGS:
        raise HTTPException(status_code=400, detail="Invalid category")
    if not body.image_data or (not body.image_data.startswith("data:image/") and not body.image_data.startswith("http")):
        raise HTTPException(status_code=400, detail="Invalid image data")
    doc = {
        "id": str(uuid.uuid4()),
        "caption": body.caption.strip(),
        "category": body.category,
        "image_data": body.image_data,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.photos.insert_one(doc)
    return _serialize_photo(doc)


@api.delete("/gallery/{photo_id}")
async def gallery_delete(photo_id: str, _admin: dict = Depends(require_admin)):
    res = await db.photos.delete_one({"id": photo_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Photo not found")
    return {"ok": True}


# ---------- Contact ----------
class ContactIn(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=2000)


@api.post("/contact")
async def contact_submit(body: ContactIn):
    doc = {
        "id": str(uuid.uuid4()),
        "name": body.name.strip(),
        "email": body.email.lower(),
        "message": body.message.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.contact_messages.insert_one(doc)
    return {"ok": True, "id": doc["id"]}


# ---------- Mount ----------
app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("trust")
