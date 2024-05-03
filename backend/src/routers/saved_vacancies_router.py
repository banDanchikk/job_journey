from fastapi import APIRouter, Depends
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from starlette.responses import JSONResponse

from src.auth.base_config import fastapi_users
from src.database import get_async_session
from src.models.user_models import User
from src.models.vacancy_models import SavedVacancies, Vacancy
from src.utils.vacancy_utils import convert_into_json_vacancy

router = APIRouter()


@router.get("/")
async def get_saved_vacancies(
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    query = (
        select(Vacancy)
        .join(SavedVacancies, SavedVacancies.vacancy_id == Vacancy.id)
        .filter(SavedVacancies.user_id == current_user.id)
        .options(selectinload(Vacancy.user))
    )
    result = await session.execute(query)
    vacancies_info = [list(row) for row in result]

    print(vacancies_info)

    json_data = convert_into_json_vacancy(vacancies_info)

    return JSONResponse(content={"result": json_data})


@router.delete("/{saved_vacancy_id}")
async def delete_saved_vacancy(
    saved_vacancy_id: int,
    session: AsyncSession = Depends(get_async_session)
):
    stmt = delete(SavedVacancies).where(SavedVacancies.id == saved_vacancy_id)
    await session.execute(stmt)
    await session.commit()

    return {"message": "Збережену вакансію успішно видалено"}