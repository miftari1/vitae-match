import pdfplumber
from sentence_transformers import SentenceTransformer, util
from .skills_extractor import extract_skills_from_text

model = SentenceTransformer('all-MiniLM-L6-v2')

def extract_text_from_pdf(path: str) -> str:
    with pdfplumber.open(path) as pdf:
        return " ".join(page.extract_text() or "" for page in pdf.pages)

def extract_resume_skills(text: str):
    return extract_skills_from_text(text)

def compute_similarity(resume_text: str, job_text: str) -> float:
    embeddings = model.encode([resume_text, job_text], convert_to_tensor=True)
    similarity = util.pytorch_cos_sim(embeddings[0], embeddings[1]).item()
    return round(similarity * 100, 2)

def analyze_resume(file_path: str, job_description: str):
    resume_text = extract_text_from_pdf(file_path)
    job_skills = extract_skills_from_text(job_description)
    resume_skills = extract_resume_skills(resume_text)

    matched = list(set(resume_skills) & set(job_skills))
    missing = list(set(job_skills) - set(resume_skills))
    score = compute_similarity(resume_text, job_description)

    return {"score": score, "matched_skills": matched, "missing_skills": missing}
