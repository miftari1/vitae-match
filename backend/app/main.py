from typing import Annotated
import logging

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from sqlmodel import Session
from starlette.middleware.cors import CORSMiddleware

from .database import init_db, get_session
from .auth import create_access_token, authenticate_user, get_current_active_user, ACCESS_TOKEN_EXPIRE_MINUTES
from pydantic import BaseModel

from .routers import users

# === INIT DB ===
init_db()

app = FastAPI()
origins = [
    "http://localhost:3000",  # React dev server
    # "http://your-production-domain.com" # add more if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger(__name__)
app.include_router(users.router)


class Token(BaseModel):
    access_token: str
    token_type: str

@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Annotated[Session, Depends(get_session)],
) -> Token:
    user = authenticate_user(session, form_data.username, form_data.password)
    logger.info(f'User: {user}')
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")
