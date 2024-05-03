from authlib.integrations.base_client import OAuthError
from fastapi import APIRouter, Request
from authlib.integrations.starlette_client import OAuth

from src.config import GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID

router = APIRouter(
    tags=['GoogleAuth']
)

oauth = OAuth()
oauth.register(
    name='google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    client_kwargs={
        'scope': 'email openid profile',
        'redirect_url': 'http://127.0.0.1:8000/auth'
    }
)


@router.get("/login")
async def login(request: Request):
    url = request.url_for('auth')
    return await oauth.google.authorize_redirect(request, url)


@router.get('/auth')
async def auth(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
    except OAuthError as e:
        return {'info': e}
    user = token.get('userinfo')
    print(user)
    return {'status': 'success'}
