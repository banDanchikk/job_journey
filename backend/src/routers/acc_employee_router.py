from datetime import datetime

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Query
from sqlalchemy import insert, select, and_, delete, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.utils.acc_utils import check_role, get_cv_path_to_delete, update_account_filling
from src.auth.base_config import fastapi_users
from src.models.user_models import User, CV, SocialLink
from src.database import get_async_session
from src.user.role_enum import RoleEnum
from src.utils.acc_utils import save_cv_locally

from src.routers.acc_base_router import router as base_router

import os

router = APIRouter()

router.include_router(base_router)

@router.put("/update-profile")
async def update_user_profile(
        username: str = Query(None),
        email: str = Query(None),
        password: str = Query(None),
        date_of_birth: datetime = Query(None),
        city: str = Query(None),
        phone_number: str = Query(None),
        current_user: User = Depends(fastapi_users.current_user()),
        session: AsyncSession = Depends(get_async_session)
):
    user_data = {}
    if username:
        user_data['username'] = username
    if email:
        user_data['email'] = email
    if password:
        user_data['password'] = password
    if date_of_birth:
        user_data['date_of_birth'] = date_of_birth
    if city:
        user_data['city'] = city
    if phone_number:
        user_data['phone_number'] = phone_number

    stmt = update(User).where(User.id == current_user.id).values(**user_data)
    await session.execute(stmt)
    await session.commit()

    current_user.acc_filling = update_account_filling(current_user)
    await session.commit()

    return {'result': 'nisichy'}



@router.post("/upload-cv")
async def upload_cv(
        cv_file: UploadFile = File(...),
        current_user: User = Depends(fastapi_users.current_user()),
        session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYEE, current_user)

    cv_name = cv_file.filename

    existing_cv = await session.execute(
        select(CV)
        .filter(
            and_(
                CV.user_id == current_user.id,
                CV.cv_path.contains(cv_name)
            )
        )
    )
    existing_cv_row = existing_cv.fetchone()

    if existing_cv_row:
        raise HTTPException(status_code=400, detail="Резюме з такою назвою для цього користувача вже існує")

    cv_path = await save_cv_locally(current_user.id, cv_file)
    cv_data = {"user_id": current_user.id, "cv_path": cv_path}

    stmt = insert(CV).values(**cv_data)
    await session.execute(stmt)
    await session.commit()

    return {"status": "success"}


@router.delete("/delete-cv")
async def delete_cv(
        cv_id: int,
        current_user: User = Depends(fastapi_users.current_user()),
        session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYEE, current_user)

    cv_path = await get_cv_path_to_delete(cv_id, session)

    if os.path.exists(cv_path):
        os.remove(cv_path)

    stmt = delete(CV).where(CV.id == cv_id)
    await session.execute(stmt)
    await session.commit()

    return {"message": "Резюме успішно видалено"}

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

