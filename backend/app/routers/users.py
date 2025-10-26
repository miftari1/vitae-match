from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ..models import User, UserCreate, UserRead
from ..database import get_session
from ..auth import create_access_token, verify_password, get_password_hash, get_current_active_user, \
    get_user_by_username, oauth2_scheme, authenticate_user

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register", response_model=UserRead)
def register(user: UserCreate, session: Session = Depends(get_session)):
    password_hash = get_password_hash(user.password)
    extra_data = {"password_hash": password_hash}
    user = User.model_validate(user, update=extra_data)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.post("/login")
def login(username: str, password: str, session: Annotated[Session, Depends(get_session)], token: Annotated[str, Depends(oauth2_scheme)]):
    user = authenticate_user(session, username, password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return token

@router.get("/users/me", response_model=UserRead)
def read_users_me(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user


