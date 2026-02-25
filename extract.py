import fitz

def extract_pages(pdf_path, pages):
    doc = fitz.open(pdf_path)
    res = {}
    for p in pages:
        # 1-indexed to 0-indexed
        page = doc.load_page(p - 1)
        res[p] = page.get_text()
    
    for p, text in res.items():
        print(f"--- PAGE {p} ---")
        print(text)
        print("\n\n")

if __name__ == "__main__":
    pdf_path = r"h:\Website\damha\회사소개 및 상품제안(250725).pdf"
    pages = [8, 9, 33, 34, 35, 36, 37]
    extract_pages(pdf_path, pages)
