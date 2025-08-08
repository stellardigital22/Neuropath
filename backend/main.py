from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://neuropath-cgtb.vercel.app"],  # allow your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
