from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from sqlmodel import Session
from starlette.middleware.cors import CORSMiddleware

from .database import init_db, get_session
from .auth import create_access_token, authenticate_user, get_current_active_user, ACCESS_TOKEN_EXPIRE_MINUTES
from .models import User
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
app.include_router(users.router)


class Token(BaseModel):
    access_token: str
    token_type: str

# === REGISTER USER ===
# @app.post("/register", response_model=User)
# def register_user(username: str, password: str, full_name: str | None = None, email: str | None = None, session: Session = Depends(get_session)):
#     existing = session.exec(select(User).where(User.username == username)).first()
#     if existing:
#         raise HTTPException(status_code=400, detail="Username already registered")
#     user = create_user(session, username=username, password=password, full_name=full_name, email=email)
#     return user

# === LOGIN ===
@app.post("/token", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}

# === PROTECTED ===
@app.get("/users/me", response_model=User)
def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user
