from fastapi import APIRouter, Request
from starlette.responses import RedirectResponse
from app.models.user import UserModel

router = APIRouter()
@router.get("/login/callback")
async def oauth_callback(request: Request):
    google_user = {
        "email": "test@example.com",
        "username": "TestUser"
    }

    user = UserModel.get_user_by_email(google_user["email"])
    if not user:
        UserModel.create_user(
            email=google_user["email"],
            username=google_user["username"]
        )
        return {"message": "User created in Supabase", "user": google_user}

    return {"message": "User already exists", "user": user}
