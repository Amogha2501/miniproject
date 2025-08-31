from app.database.db import supabase

class UserModel:
    @staticmethod
    def create_user(email: str, username: str):
        response = supabase.table("users").insert({
            "email": email,
            "username": username
        }).execute()
        return response

    @staticmethod
    def get_user_by_email(email: str):
        response = supabase.table("users").select("*").eq("email", email).execute()
        if response.data:
            return response.data[0]
        return None
