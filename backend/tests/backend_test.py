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


# ---------- Contact ----------
def test_contact_submit():
    r = requests.post(f"{API}/contact", json={
        "name": "TEST_Test User",
        "email": "test@example.com",
        "message": "Jai Jagannath - test message",
    })
    assert r.status_code == 200
    assert r.json().get("ok") is True
