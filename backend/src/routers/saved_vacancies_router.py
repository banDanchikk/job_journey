from fastapi import APIRouter, Depends
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from starlette.responses import JSONResponse

from backend.src.auth.base_config import fastapi_users
from backend.src.database import get_async_session
from backend.src.models.user_models import User
from backend.src.models.vacancy_models import SavedVacancies, Vacancy
from backend.src.user.role_enum import RoleEnum
from backend.src.utils.acc_utils import check_role
from backend.src.utils.vacancy_utils import convert_into_json_vacancy

router = APIRouter()


@router.get("/")
async def get_saved_vacancies(
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYEE, current_user)

    query = (
        select(Vacancy)
        .join(SavedVacancies, SavedVacancies.vacancy_id == Vacancy.id)
        .filter(SavedVacancies.user_id == current_user.id)
        .options(selectinload(Vacancy.user))
    )
    result = await session.execute(query)
    vacancies_info = [list(row) for row in result]

    json_data = convert_into_json_vacancy(vacancies_info)

    return JSONResponse(content={"result": json_data})


@router.delete("/{saved_vacancy_id}")
async def delete_saved_vacancy(
    saved_vacancy_id: int,
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYEE, current_user)

    stmt = delete(SavedVacancies).where(SavedVacancies.id == saved_vacancy_id)
    await session.execute(stmt)
    await session.commit()

    return {"message": "Збережену вакансію успішно видалено"}