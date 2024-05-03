from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func
from starlette.responses import JSONResponse

from src.auth.base_config import fastapi_users
from src.database import get_async_session
from src.models.user_models import User
from src.models.vacancy_models import Vacancy, SavedVacancies
from src.utils.vacancy_utils import convert_into_json_vacancy

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
async def get_vacancy_by_id(vacancy_id: int, session: AsyncSession = Depends(get_async_session)):
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

