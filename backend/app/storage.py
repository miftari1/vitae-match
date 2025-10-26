from pathlib import Path
from fastapi import UploadFile

UPLOAD_DIR = Path("uploaded_resumes")
UPLOAD_DIR.mkdir(exist_ok=True)

def save_resume(file: UploadFile) -> str:
    file_path = UPLOAD_DIR / file.filename
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    return str(file_path)
