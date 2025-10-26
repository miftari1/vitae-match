import spacy

nlp = spacy.load("en_core_web_sm")

def extract_skills_from_text(text: str):
    doc = nlp(text)
    chunks = [chunk.text.strip() for chunk in doc.noun_chunks]
    props = [token.text for token in doc if token.pos_ in ("PROPN", "NOUN")]
    skills = list(set(chunks + props))
    return [s for s in skills if len(s) > 1]
