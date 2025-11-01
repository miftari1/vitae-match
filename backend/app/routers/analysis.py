from typing import List

from fastapi import APIRouter, UploadFile, Form, Depends
from fastapi.encoders import jsonable_encoder
from sqlmodel import Session, select
from ..models import AnalysisSession, User
from ..database import get_session
from ..auth import get_current_active_user
from ..resume_analyzer import analyze_resume
from ..storage import save_resume

router = APIRouter(tags=["Analysis"])

@router.post("/analyze", response_model=AnalysisSession)
async def analyze_endpoint(file: UploadFile, job_description: str = Form(...),
                           session: Session = Depends(get_session),
                           user: User = Depends(get_current_active_user)):
    path = save_resume(file)
    result = analyze_resume(path, job_description)
    new_analysis = AnalysisSession(
        filename=file.filename,
        match_score=result["score"],
        matched_skills=result["matched_skills"],
        missing_skills=result["missing_skills"],
        user_id=user.id
    )
    session.add(new_analysis)
    session.commit()
    session.refresh(new_analysis)

    return new_analysis

@router.get("/analyses", response_model=List[AnalysisSession])
async def get_user_analyses(
    session: Session = Depends(get_session),
    user: User = Depends(get_current_active_user)
):
    analyses = session.exec(select(AnalysisSession).where(AnalysisSession.user_id == user.id)).all()
    return analyses
