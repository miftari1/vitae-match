from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from ..models import User, UserCreate, UserRead
from ..database import get_session
from ..auth import create_access_token, verify_password, get_password_hash

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
def login(email: str, password: str, session: Session = Depends(get_session)):
    user = session.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}
