from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, insert, and_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func
from starlette.responses import JSONResponse

from backend.src.auth.base_config import fastapi_users
from backend.src.database import get_async_session
from backend.src.models.user_models import User, CV
from backend.src.models.vacancy_models import Vacancy, SavedVacancies, VacanciesWithCV
from backend.src.user.role_enum import RoleEnum
from backend.src.utils.acc_utils import get_all_cv, check_role
from backend.src.utils.vacancy_utils import convert_into_json_vacancy

router = APIRouter()


@router.get("")
async def get_all_vacancies(
    category: str = Query(None),
    location: str = Query(None),
    work_type: str = Query(None),
    salary: str = Query(None),
    session: AsyncSession = Depends(get_async_session)
):
    query = select(Vacancy).where(Vacancy.is_archived == False)

    if location:
        query = query.where(func.lower(Vacancy.location).like(func.lower(f"%{location}%")))
    if salary:
        query = query.where(func.lower(Vacancy.salary).like(func.lower(f"%{salary}%")))
    if category:
        query = query.where(func.lower(Vacancy.category).like(func.lower(f"%{category}%")))
    if work_type:
        query = query.where(func.lower(Vacancy.work_type).like(func.lower(f"%{work_type}%")))

    result = await session.execute(query)
    vacancies = [list(row) for row in result]
    json_data = convert_into_json_vacancy(vacancies)
    return JSONResponse(content={"result": json_data})


@router.get("/{vacancy_id}")
async def get_vacancy_by_id(
    vacancy_id: int,
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYEE, current_user)

    query = select(Vacancy).filter(Vacancy.id == vacancy_id)
    result = await session.execute(query)
    vacancies = [list(row) for row in result]
    json_data = convert_into_json_vacancy(vacancies)
    return JSONResponse(content={"result": json_data})


@router.get("/{vacancy_id}/save")
async def save_vacancy(
    vacancy_id: int,
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYEE, current_user)

    query = select(SavedVacancies).where(
        SavedVacancies.user_id == current_user.id and SavedVacancies.vacancy_id == vacancy_id
    )
    result = await session.execute(query)
    existing_entry = result.fetchone()

    if existing_entry:
        return {"status": "error", "message": "Vacancy already saved for this user"}

    data = {"user_id": current_user.id, "vacancy_id": vacancy_id}
    stmt = insert(SavedVacancies).values(**data)
    await session.execute(stmt)
    await session.commit()
    return {"status": "success"}


@router.get("/{vacancy_id}/select-cv")
async def select_cv(
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYEE, current_user)

    data = dict()

    data['all_cv'] = await get_all_cv(current_user, session)
    data['user'] = current_user

    return data


@router.get("/{vacancy_id}/select-cv/send-cv")
async def send_cv(
    cv_id: int,
    vacancy_id: int,
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    query = select(VacanciesWithCV).where(
        and_(VacanciesWithCV.user_id == current_user.id, VacanciesWithCV.vacancy_id == vacancy_id)
    )
    result = await session.execute(query)
    existing_entry = result.scalar_one_or_none()

    if existing_entry:
        return {"status": "error", "message": "This vacancy is already selected by the user"}

    cv_query = select(CV.cv_path).where(
        and_(CV.user_id == current_user.id, CV.id == cv_id)
    )
    cv_result = await session.execute(cv_query)
    cv_path = cv_result.scalar_one()

    data = {"vacancy_id": vacancy_id, "user_id": current_user.id, "cv_path": cv_path}
    stmt = insert(VacanciesWithCV).values(**data)
    await session.execute(stmt)
    await session.commit()

    return {'status': 'success'}
