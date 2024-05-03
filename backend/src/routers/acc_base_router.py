from datetime import datetime

from fastapi import APIRouter, Depends, Query, UploadFile, File
from sqlalchemy import update, insert, select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.base_config import fastapi_users
from src.models.user_models import User, SocialLink, CV
from src.database import get_async_session
from src.user.role_enum import RoleEnum
from src.utils.acc_utils import save_avatar_locally, update_account_filling, check_role, get_all_cv, \
    get_all_social_links

router = APIRouter()


@router.get("/")
async def account(
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    user_data = dict()

    user_data['info'] = [{
        'email': current_user.email,
        'username': current_user.username,
        'date_of_birth': current_user.date_of_birth,
        'city': current_user.city,
        'phone_number': current_user.phone_number,
        'avatar': current_user.avatar,
        'acc_filling': current_user.acc_filling
    }]

    if await check_role(RoleEnum.EMPLOYEE, current_user):
        user_data['cv'] = await get_all_cv(current_user, session)
        user_data['social_links'] = await get_all_social_links(current_user, session)

    return user_data

@router.post("/upload-avatar")
async def upload_avatar(
        avatar: UploadFile = File(...),
        current_user: User = Depends(fastapi_users.current_user()),
        session: AsyncSession = Depends(get_async_session)
):
    avatar_path = await save_avatar_locally(current_user.id, avatar)

    current_user.avatar = avatar_path
    await session.commit()

    current_user.acc_filling = update_account_filling(current_user)
    await session.commit()

    return {'status': 'success'}