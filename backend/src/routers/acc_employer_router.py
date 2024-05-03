from fastapi import APIRouter

from src.routers.acc_base_router import router as base_router

router = APIRouter()

router.include_router(base_router)
