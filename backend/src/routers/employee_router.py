from fastapi import APIRouter
from backend.src.routers.vacancy_employee_router import router as vacancy_router
from backend.src.routers.acc_employee_router import router as account_router
from backend.src.routers.saved_vacancies_router import router as saved_vacancies_router

router = APIRouter(
    prefix="/employee",
    tags=["Employee"]
)

router.include_router(vacancy_router, prefix="/vacancies")
router.include_router(account_router, prefix="/account")
router.include_router(saved_vacancies_router, prefix='/saved-vacancies')


@router.get("/")
async def main_page():
    return {"message": "Welcome to your dashboard, employee"}

