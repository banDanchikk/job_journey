import os
from fastapi import HTTPException

from fastapi import Depends, UploadFile
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.src.auth.base_config import fastapi_users
from backend.src.database import get_async_session
from backend.src.models.user_models import User, CV, SocialLink
from backend.src.user.role_enum import RoleEnum


async def check_role(
    role: RoleEnum,
    current_user: User = Depends(fastapi_users.current_user())
):
    if current_user.role_id != role.value:
        raise HTTPException(status_code=403, detail="Ви не маєте доступу до цієї частини сайту")
    else:
        return True


async def save_cv_locally(user_id: int, cv_file: UploadFile) -> str:
    if cv_file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Файл повинен бути у форматі PDF")

    cv_folder = f"uploads/cv/{user_id}/"
    os.makedirs(cv_folder, exist_ok=True)
    cv_path = f"{cv_folder}{cv_file.filename}"
    with open(cv_path, "wb") as cv_file_write:
        cv_file_write.write(cv_file.file.read())

    return cv_path


async def get_cv_path_to_delete(cv_id: int, session: AsyncSession = Depends(get_async_session)) -> str:
    cv = await session.execute(
        select(CV.cv_path).filter(CV.id == cv_id)
    )
    cv_row = cv.fetchone()

    if not cv_row:
        raise HTTPException(status_code=404, detail="Резюме не знайдено")

    return cv_row[0]


async def save_avatar_locally(user_id: int, avatar_file: UploadFile) -> str:
    if not avatar_file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Файл повинен бути у форматі зображення")

    avatar_folder = f"uploads/avatar/{user_id}/"
    os.makedirs(avatar_folder, exist_ok=True)

    avatar_path = f"{avatar_folder}{avatar_file.filename}"

    if os.path.exists(avatar_path):
        os.remove(avatar_path)

    with open(avatar_path, "wb") as avatar_file_write:
        avatar_file_write.write(avatar_file.file.read())

    return avatar_path


def update_account_filling(current_user: User = Depends(fastapi_users.current_user())):
    account_fields = ['email', 'hashed_password', 'username', 'date_of_birth', 'city', 'phone_number', 'avatar']

    filled_fields_count = sum(1 for field_name in account_fields if getattr(current_user, field_name) is not None)
    total_fields_count = len(account_fields)
    filling_percentage = (filled_fields_count / total_fields_count) * 100

    return str(filling_percentage)


async def get_all_cv(
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    cv_query = select(CV).where(CV.user_id == current_user.id)
    cv_result = await session.execute(cv_query)
    cv_data = [list(row) for row in cv_result]

    return cv_data


async def get_all_social_links(
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    social_links_query = select(SocialLink).where(SocialLink.user_id == current_user.id)
    social_links_result = await session.execute(social_links_query)
    social_links_data = [list(row) for row in social_links_result]

    return social_links_data
