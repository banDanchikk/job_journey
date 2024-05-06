from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from auth.base_config import auth_backend, fastapi_users
from backend.src.config import SECRET_KEY
from backend.src.schemas.user_schemas import UserRead, UserCreate

from backend.src.routers.employee_router import router as employee_router
from backend.src.routers.employer_router import router as employer_router

app = FastAPI(
    title="Job Journey"
)

app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth",
    tags=["Auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["Auth"],
)

app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)

app.include_router(employer_router)
app.include_router(employee_router)
#app.include_router(google_router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=8001)
