from fastapi import APIRouter, Depends

from src.auth.base_config import fastapi_users
from src.models.user_models import User

router = APIRouter()