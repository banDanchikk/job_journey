from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, insert, update
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import JSONResponse

from src.auth.base_config import fastapi_users
from src.models.user_models import User
from src.database import get_async_session
from src.models.vacancy_models import Vacancy
from src.schemas.vacancy_schemas import VacancyCreate
from src.utils.vacancy_utils import convert_into_json_vacancy

router = APIRouter()


@router.get("/")
async def get_all_vacancies(session: AsyncSession = Depends(get_async_session)):
    query = select(Vacancy)
    result = await session.execute(query)
    vacancies = [list(row) for row in result]
    print(vacancies)
    json_data = convert_into_json_vacancy(vacancies)
    return JSONResponse(content={"result": json_data})


@router.post("/add")
async def add_specific_vacancies(
        new_vacancy: VacancyCreate,
        current_user: User = Depends(fastapi_users.current_user()),
        session: AsyncSession = Depends(get_async_session)
):
    vacancy_data = new_vacancy.dict()
    vacancy_data["user_id"] = current_user.id

    stmt = insert(Vacancy).values(**vacancy_data)
    await session.execute(stmt)
    await session.commit()
    return {"status": "success"}


@router.put("/update/{vacancy_id}")
async def update_vacancy(
        vacancy_id: int,
        title: str = Query(None),
        category: str = Query(None),
        location: str = Query(None),
        work_type: str = Query(None),
        salary: str = Query(None),
        description: str = Query(None),
        session: AsyncSession = Depends(get_async_session)
):
    vacancy_data = {}
    if title:
        vacancy_data['title'] = title
    if description:
        vacancy_data['description'] = description
    if location:
        vacancy_data['location'] = location
    if salary:
        vacancy_data['salary'] = salary
    if category:
        vacancy_data['category'] = category
    if work_type:
        vacancy_data['work_type'] = work_type

    stmt = update(Vacancy).where(Vacancy.id == vacancy_id).values(**vacancy_data)
    await session.execute(stmt)
    await session.commit()

    updated_vacancy_query = select(Vacancy).where(Vacancy.id == vacancy_id)
    updated_vacancy_result = await session.execute(updated_vacancy_query)
    updated_vacancy = updated_vacancy_result.fetchone()

    json_data = convert_into_json_vacancy([updated_vacancy])
    return JSONResponse(content={"result": json_data})