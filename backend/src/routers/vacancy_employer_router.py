from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy import select, insert, update, func, delete
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import JSONResponse

from backend.src.auth.base_config import fastapi_users
from backend.src.models.user_models import User
from backend.src.database import get_async_session
from backend.src.models.vacancy_models import Vacancy
from backend.src.schemas.vacancy_schemas import VacancyCreate
from backend.src.user.role_enum import RoleEnum
from backend.src.utils.acc_utils import check_role
from backend.src.utils.vacancy_utils import convert_into_json_vacancy

router = APIRouter()


@router.get("/")
async def get_all_vacancies(
    title: str = Query(None),
    location: str = Query(None),
    work_type: str = Query(None),
    salary: str = Query(None),
    current: str = Query(None),
    archived: str = Query(None),
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYER, current_user)

    query = select(Vacancy)

    if title:
        query = query.where(func.lower(Vacancy.title).like(func.lower(f"%{title}%")))
    if location:
        query = query.where(func.lower(Vacancy.location).like(func.lower(f"%{location}%")))
    if salary:
        query = query.where(func.lower(Vacancy.salary).like(func.lower(f"%{salary}%")))
    if work_type:
        query = query.where(func.lower(Vacancy.work_type).like(func.lower(f"%{work_type}%")))
    if current:
        query = query.where(Vacancy.is_archived == False)
    if archived:
        query = query.where(Vacancy.is_archived == True)

    result = await session.execute(query)
    vacancies = [list(row) for row in result]
    json_data = convert_into_json_vacancy(vacancies)
    return JSONResponse(content={"result": json_data})


@router.get("/clear")
async def clear_all_vacancies(
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYER, current_user)

    stmt = delete(Vacancy).where(Vacancy.user_id == current_user.id)
    await session.execute(stmt)
    await session.commit()

    return {'status': 'everything were deleted'}


@router.get("{vacancy_id}/archive")
async def archive_vacancy(
    vacancy_id: int,
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYER, current_user)

    result = await session.execute(select(Vacancy).filter(Vacancy.id == vacancy_id))
    vacancy = result.scalar()

    if not vacancy:
        raise HTTPException(status_code=404, detail="Vacancy not found")

    vacancy.is_archived = True

    await session.commit()

    return {"message": "Vacancy archived successfully"}


@router.get("{vacancy_id}/restore")
async def restore_vacancy(
    vacancy_id: int,
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYER, current_user)

    result = await session.execute(select(Vacancy).filter(Vacancy.id == vacancy_id))
    vacancy = result.scalar()

    if not vacancy:
        raise HTTPException(status_code=404, detail="Vacancy not found")

    vacancy.is_archived = False

    await session.commit()

    return {"message": "Vacancy restored successfully"}


@router.post("/add")
async def add_vacancy(
    new_vacancy: VacancyCreate,
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYER, current_user)

    vacancy_data = new_vacancy.dict()
    vacancy_data["user_id"] = current_user.id

    stmt = insert(Vacancy).values(**vacancy_data)
    await session.execute(stmt)
    await session.commit()
    return {"status": "success"}


@router.put("{vacancy_id}/update")
async def update_vacancy(
    vacancy_id: int,
    title: str = Query(None),
    category: str = Query(None),
    location: str = Query(None),
    work_type: str = Query(None),
    salary: str = Query(None),
    description: str = Query(None),
    current_user: User = Depends(fastapi_users.current_user()),
    session: AsyncSession = Depends(get_async_session)
):
    await check_role(RoleEnum.EMPLOYER, current_user)

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
