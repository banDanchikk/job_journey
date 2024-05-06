from datetime import datetime

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Query
from sqlalchemy import insert, select, and_, delete, update
from sqlalchemy.ext.asyncio import AsyncSession

from backend.src.utils.acc_utils import check_role, get_cv_path_to_delete, update_account_filling, get_all_cv, \
    get_all_social_links
from backend.src.auth.base_config import fastapi_users
from backend.src.models.user_models import User, CV, SocialLink
from backend.src.database import get_async_session
from backend.src.user.role_enum import RoleEnum
from backend.src.utils.acc_utils import save_cv_locally

from backend.src.routers.acc_base_router import router as base_router

import os

router = APIRouter()

router.include_router(base_router)


@router.get("/")
async def account(
        current_user: User = Depends(fastapi_users.current_user()),
        session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYEE, current_user)

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

    user_data['cv'] = await get_all_cv(current_user, session)
    user_data['social_links'] = await get_all_social_links(current_user, session)

    return user_data


@router.put("/update-profile")
async def update_user_profile(
        username: str = Query(None),
        email: str = Query(None),
        date_of_birth: datetime = Query(None),
        city: str = Query(None),
        phone_number: str = Query(None),
        current_user: User = Depends(fastapi_users.current_user()),
        session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYEE, current_user)

    user_data = {}
    if username:
        user_data['username'] = username
    if email:
        user_data['email'] = email
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
