from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy import delete, insert
from sqlalchemy.ext.asyncio import AsyncSession

from backend.src.auth.base_config import fastapi_users
from backend.src.models.user_models import User, SocialLink
from backend.src.database import get_async_session
from backend.src.user.role_enum import RoleEnum
from backend.src.utils.acc_utils import save_avatar_locally, update_account_filling, check_role, get_all_cv, \
    get_all_social_links

router = APIRouter()


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


@router.post("/add-social-links")
async def add_social_links(
    social_name: str,
    social_link: str,
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    data = dict()
    data["user_id"] = current_user.id
    data["social_name"] = social_name
    data["social_link"] = social_link

    stmt = insert(SocialLink).values(**data)
    await session.execute(stmt)
    await session.commit()
    return {"status": "success"}


@router.delete("/delete-social-links/{social_link_id}")
async def delete_social_links(
    social_link_id: int,
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYEE, current_user)

    stmt = delete(SocialLink).where(SocialLink.id == social_link_id)
    await session.execute(stmt)
    await session.commit()

    return {"message": "Соціальна мережа успішно видалена"}
