from fastapi import APIRouter

from src.routers.acc_employer_router import router as account_router
from src.routers.vacancy_employer_router import router as vacancy_router

router = APIRouter(
    prefix="/employer",
    tags=["Employer"]
)

router.include_router(vacancy_router, prefix="/vacancies")
router.include_router(account_router, prefix="/account")

@router.get("/")
async def dashboard():
    return {"message": "Welcome to your dashboard, employer"}
