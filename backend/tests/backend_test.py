"""Backend tests for Shri Puri Jagannath Trust API."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://jagannath-heritage.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@purijagannathtrust.com"
ADMIN_PASSWORD = "JaiJagannath@2025"

# 1x1 transparent PNG
TINY_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="


@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    return s


@pytest.fixture(scope="session")
def admin_session():
    s = requests.Session()
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"admin login failed: {r.status_code} {r.text}"
    return s


# ---------- Health ----------
def test_health():
    r = requests.get(f"{API}/")
    assert r.status_code == 200
    assert "message" in r.json()


# ---------- Auth ----------
def test_login_success():
    s = requests.Session()
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200
    data = r.json()
    assert data["email"] == ADMIN_EMAIL
    assert data["role"] == "admin"
    assert "access_token" in data and len(data["access_token"]) > 10
    # cookies set
    assert "access_token" in s.cookies
    assert "refresh_token" in s.cookies


def test_login_wrong_password():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong"})
    assert r.status_code == 401


def test_me_with_cookies(admin_session):
    r = admin_session.get(f"{API}/auth/me")
    assert r.status_code == 200
    data = r.json()
    assert data["email"] == ADMIN_EMAIL
    assert data["role"] == "admin"


def test_me_without_auth():
    r = requests.get(f"{API}/auth/me")
    assert r.status_code == 401


def test_logout_clears_cookies():
    s = requests.Session()
    s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert "access_token" in s.cookies
    r = s.post(f"{API}/auth/logout")
    assert r.status_code == 200
    # After logout, /me should fail
    r2 = s.get(f"{API}/auth/me")
    assert r2.status_code == 401


# ---------- Gallery public ----------
def test_gallery_categories():
    r = requests.get(f"{API}/gallery/categories")
    assert r.status_code == 200
    data = r.json()
    slugs = {c["slug"] for c in data}
    assert slugs == {"rath-yatra", "daily-darshan", "charitable-activities", "festivals"}
    for c in data:
        assert "count" in c and isinstance(c["count"], int)


def test_gallery_list_all():
    r = requests.get(f"{API}/gallery")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) > 0


def test_gallery_list_filter():
    r = requests.get(f"{API}/gallery", params={"category": "rath-yatra"})
    assert r.status_code == 200
    data = r.json()
    for p in data:
        assert p["category"] == "rath-yatra"


def test_gallery_list_invalid_category():
    r = requests.get(f"{API}/gallery", params={"category": "invalid-cat"})
    assert r.status_code == 400


# ---------- Gallery admin ----------
def test_gallery_create_no_auth():
    r = requests.post(f"{API}/gallery", json={"caption": "x", "category": "festivals", "image_data": TINY_PNG})
    assert r.status_code == 401


def test_gallery_create_and_delete(admin_session):
    r = admin_session.post(f"{API}/gallery", json={
        "caption": "TEST_pytest_photo",
        "category": "festivals",
        "image_data": TINY_PNG,
    })
    assert r.status_code == 200, r.text
    photo = r.json()
    assert photo["caption"] == "TEST_pytest_photo"
    assert photo["category"] == "festivals"
    assert photo["category_label"] == "Festivals"
    pid = photo["id"]

    # Verify GET returns it
    g = requests.get(f"{API}/gallery", params={"category": "festivals"})
    assert any(p["id"] == pid for p in g.json())

    # Delete
    d = admin_session.delete(f"{API}/gallery/{pid}")
    assert d.status_code == 200

    # Delete again -> 404
    d2 = admin_session.delete(f"{API}/gallery/{pid}")
    assert d2.status_code == 404


def test_gallery_create_invalid_category(admin_session):
    r = admin_session.post(f"{API}/gallery", json={
        "caption": "x", "category": "bogus", "image_data": TINY_PNG,
    })
    assert r.status_code == 400


def test_gallery_create_invalid_image(admin_session):
    r = admin_session.post(f"{API}/gallery", json={
        "caption": "x", "category": "festivals", "image_data": "notanimage",
    })
    assert r.status_code == 400


def test_gallery_delete_no_auth():
    r = requests.delete(f"{API}/gallery/nonexistent")
    assert r.status_code == 401


# ---------- Products ----------
EXPECTED_PRODUCTS = {"Poonal (Iyer)", "Poonal (Iyengar)", "Vibhuthi", "Thiruman", "Srichurnam",
                     "Pavithram (2-Dharbai)", "Pavithram (3-Dharbai)", "Koorcham", "Kattai Dharbai", "Bughnam"}


def test_products_list_public():
    r = requests.get(f"{API}/products")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    names = {p["name"] for p in data}
    missing = EXPECTED_PRODUCTS - names
    assert not missing, f"missing seed products: {missing}"
    # Validate schema on one product
    p0 = data[0]
    for k in ("id", "name", "description", "price", "image_data", "variant", "is_available", "created_at"):
        assert k in p0
    assert isinstance(p0["price"], (int, float))


def test_products_create_no_auth():
    r = requests.post(f"{API}/products", json={
        "name": "TEST_x", "description": "d", "price": 10.0, "image_data": TINY_PNG,
    })
    assert r.status_code == 401


def test_products_create_invalid_image(admin_session):
    r = admin_session.post(f"{API}/products", json={
        "name": "TEST_bad", "description": "d", "price": 10.0, "image_data": "notanimage",
    })
    assert r.status_code == 400


def test_products_crud(admin_session):
    # Create
    r = admin_session.post(f"{API}/products", json={
        "name": "TEST_pytest_product",
        "description": "test desc",
        "price": 99.5,
        "image_data": TINY_PNG,
        "variant": "TESTvar",
        "is_available": True,
    })
    assert r.status_code == 200, r.text
    p = r.json()
    assert p["name"] == "TEST_pytest_product"
    assert p["price"] == 99.5
    assert p["variant"] == "TESTvar"
    pid = p["id"]

    # GET verify persistence
    g = requests.get(f"{API}/products")
    assert any(x["id"] == pid for x in g.json())

    # Update - change price
    u = admin_session.put(f"{API}/products/{pid}", json={
        "name": "TEST_pytest_product",
        "description": "test desc updated",
        "price": 150.0,
        "image_data": TINY_PNG,
        "variant": "TESTvar2",
        "is_available": False,
    })
    assert u.status_code == 200, u.text
    up = u.json()
    assert up["price"] == 150.0
    assert up["variant"] == "TESTvar2"
    assert up["is_available"] is False

    # Verify update persisted
    g2 = requests.get(f"{API}/products")
    found = next((x for x in g2.json() if x["id"] == pid), None)
    assert found and found["price"] == 150.0 and found["description"] == "test desc updated"

    # Delete
    d = admin_session.delete(f"{API}/products/{pid}")
    assert d.status_code == 200

    # Delete missing -> 404
    d2 = admin_session.delete(f"{API}/products/{pid}")
    assert d2.status_code == 404


def test_products_update_missing(admin_session):
    r = admin_session.put(f"{API}/products/does-not-exist-xyz", json={
        "name": "x", "description": "", "price": 1.0, "image_data": TINY_PNG,
    })
    assert r.status_code == 404


# ---------- Settings ----------
def test_settings_get_public():
    r = requests.get(f"{API}/settings")
    assert r.status_code == 200
    d = r.json()
    for k in ("whatsapp_number", "upi_id", "upi_qr_image", "payee_name", "updated_at"):
        assert k in d


def test_settings_update_no_auth():
    r = requests.put(f"{API}/settings", json={
        "whatsapp_number": "911111111111", "upi_id": "x@upi", "payee_name": "X", "upi_qr_image": "",
    })
    assert r.status_code == 401


def test_settings_update_admin(admin_session):
    # Read original
    orig = requests.get(f"{API}/settings").json()
    payload = {
        "whatsapp_number": "919000000001",
        "upi_id": "TEST_pytest@upi",
        "payee_name": "TEST_Pytest Payee",
        "upi_qr_image": TINY_PNG,
    }
    r = admin_session.put(f"{API}/settings", json=payload)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["whatsapp_number"] == payload["whatsapp_number"]
    assert d["upi_id"] == payload["upi_id"]
    assert d["payee_name"] == payload["payee_name"]
    assert d["upi_qr_image"] == payload["upi_qr_image"]

    # Verify persisted via GET
    g = requests.get(f"{API}/settings").json()
    assert g["upi_id"] == "TEST_pytest@upi"

    # Restore original
    admin_session.put(f"{API}/settings", json={
        "whatsapp_number": orig.get("whatsapp_number", "919999999999"),
        "upi_id": orig.get("upi_id", "purijagannathtrust@upi"),
        "payee_name": orig.get("payee_name", "Shri Puri Jagannath Trust"),
        "upi_qr_image": orig.get("upi_qr_image", ""),
    })


# ---------- Contact ----------
def test_contact_submit():
    r = requests.post(f"{API}/contact", json={
        "name": "TEST_Test User",
        "email": "test@example.com",
        "message": "Jai Jagannath - test message",
    })
    assert r.status_code == 200
    assert r.json().get("ok") is True
