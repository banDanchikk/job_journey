from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload
from starlette.responses import JSONResponse

from backend.src.auth.base_config import fastapi_users
from backend.src.database import get_async_session
from backend.src.models.user_models import User
from backend.src.models.vacancy_models import VacanciesWithCV, Vacancy
from backend.src.routers.acc_base_router import router as base_router
from backend.src.user.role_enum import RoleEnum
from backend.src.utils.acc_utils import get_all_social_links, check_role
from backend.src.utils.vacancy_utils import convert_into_json_vacancy

router = APIRouter()

router.include_router(base_router)


@router.get("/")
async def account(
        current_user: User = Depends(fastapi_users.current_user()),
        session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYER, current_user)

    user_data = dict()

    user_data['info'] = [{
        'email': current_user.email,
        'username': current_user.username,
        'city': current_user.city,
        'phone_number': current_user.phone_number,
        'company_name': current_user.company_name,
        'avatar': current_user.avatar,
    }]

    user_data['social_links'] = await get_all_social_links(current_user, session)

    return user_data


@router.put("/update-profile")
async def update_user_profile(
        username: str = Query(None),
        email: str = Query(None),
        city: str = Query(None),
        company_name: str = Query(None),
        phone_number: str = Query(None),
        current_user: User = Depends(fastapi_users.current_user()),
        session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYER, current_user)

    user_data = {}
    if username:
        user_data['username'] = username
    if email:
        user_data['email'] = email
    if city:
        user_data['city'] = city
    if company_name:
        user_data['company_name'] = company_name
    if phone_number:
        user_data['phone_number'] = phone_number

    stmt = update(User).where(User.id == current_user.id).values(**user_data)
    await session.execute(stmt)
    await session.commit()

    return {'result': 'success'}


@router.get("/vacancies-with-recall")
async def get_all_vacancies_with_recall(
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYER, current_user)

    # Отримати всі вакансії користувача разом з користувачами, які відкликалися
    query = (
        select(Vacancy, User, VacanciesWithCV)
        .join(VacanciesWithCV, VacanciesWithCV.vacancy_id == Vacancy.id)
        .join(User, User.id == VacanciesWithCV.user_id)
        .filter(Vacancy.user_id == current_user.id)
    )
    result = await session.execute(query)
    vacancies_info = {}

    for row in result:
        vacancy, user, vacancy_with_cv = row

        # Перевірка, чи вже маємо запис про цю вакансію
        if vacancy.id not in vacancies_info:
            # Якщо ні, створюємо новий запис
            vacancies_info[vacancy.id] = {
                "id": vacancy.id,
                "title": vacancy.title,
                "category": vacancy.category,
                "location": vacancy.location,
                "work_type": vacancy.work_type,
                "salary": vacancy.salary,
                "description": vacancy.description,
                "timestamp": vacancy.registered_at.isoformat(),
                "is_archived": vacancy.is_archived,
                "user_id": vacancy.user_id,
                "users": []
            }

        # Додавання інформації про користувача, який відкликався на вакансію
        vacancies_info[vacancy.id]["users"].append({
            "user_id": user.id,
            "email": user.email,
            "username": user.username,
            "date_of_birth": user.date_of_birth,
            "city": user.city,
            "phone_number": user.phone_number,
            "avatar": user.avatar,
            "acc_filling": user.acc_filling,
            "cv_path": vacancy_with_cv.cv_path
        })

    # Перетворення словника у список для JSON-відповіді
    json_data = list(vacancies_info.values())

    return JSONResponse(content={"result": json_data})