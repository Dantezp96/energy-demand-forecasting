from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    FRONTEND_URL: str = "http://localhost:5173"
    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
