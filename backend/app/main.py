# from fastapi import FastAPI,HTTPException
# import bcrypt
# from app.database.db import supabase

# app=FastAPI()

# @app.post("/signup")
# def signup(name:str,email:str,password:str):
#     #hash password
#     hashed_pw=bcrypt.hashpw(password.encode("utf-8"),bcrypt.gensalt()).decode()

#     # Insert into Supabase
#     response = supabase.table("users").insert({
#         "name": name,
#         "email": email,
#         "password_hash": hashed_pw,
#         "profile_pic": ""
#     }).execute()

#     if response.data:
#         return {"message": "User created", "user": response.data}
    

# @app.post("/login")
# def login(email:str,password:str):
#     #fetch user details
#     response=supabase.table("users").select("*").eq("email",email).execute()

#     if not response.data:
#         raise HTTPException(status_code=404, detail="User not found")
   
#     user=response.data[0]

#     #verify password
#     if bcrypt.checkpw(password.encode("utf-8"), user["password_hash"].encode("utf-8")):
#         return {"message": "Login successful", "user": user}
#     else:
#         raise HTTPException(status_code=401, detail="Invalid password")


from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv
import os

# Load env
load_dotenv()

app = FastAPI()

# Add session middleware (needed for OAuth)
app.add_middleware(SessionMiddleware, secret_key="supersecret_session_key")


from app.routes import oauth  

app.include_router(oauth.router)   

@app.get("/")
def root():
    return {"message": "Welcome to FastAPI with Supabase + Google OAuth"}
