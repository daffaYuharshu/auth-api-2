DOKUMENTASI API

1. REGISTER

Method : POST
URL : /users
Body Request:
{
  name: string,
  email: string,
  password: string
}
Bila akun berhasil ditambahkan, server harus mengembalikan response dengan ketentuan:

Status Code : 201
Response Body:
{
  "error": false,
  "message": "account has been created"
}

2. GET AKUN

Method : GET
URL : /users
Server harus mengembalikan respons dengan::

Status Code : 200
Response Body:
{
  "id": "user-ei20j102e1290",
  "name": "windah",
  "email": "windah@gmail.com"
}

3. LOGIN
   
Method : POST
URL : /LOGIN
Body Request:
{
  email: string,
  password: string
}
Bila berhasil login, server harus mengembalikan response dengan ketentuan:

Status Code : 200
Response Body:
{
  "error": false,
    "message": "success",
    "loginResult": {
        "userId": "user-Do2Y5sZ11LIF",
        "email": "windah@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLURvMlk1c1oxMUxJRiIsIm5hbWUiOiJkYWZmYSIsImVtYWlsIjoiZGFmZmFAZ21haWwuY29tIiwiaWF0IjoxNzAxMjg0MzE4LCJleHAiOjE3MDEyODQzMzh9.cZrd5yGmescAD70WmAolWwwRUrC8-X6Vz8EmiM9VHHk"
    }
}

Bila email atau password salah, server merespons :
{
    "error": true,
    "message": "Wrong email or password. Please try again"
}

4. REFRESH TOKEN
   
Method : GET
URL : /token
Server harus mengembalikan respons dengan::
    
Status Code : 200
Response Body:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLURvMlk1c1oxMUxJRiIsIm5hbWUiOiJkYWZmYSIsImVtYWlsIjoiZGFmZmFAZ21haWwuY29tIiwiaWF0IjoxNzAxMjg0Nzc1LCJleHAiOjE3MDEyODQ3OTB9.qsQny_WshPR-32idSYQajFlwAaUL9frXbJtYFL7dcwg"
}
6. LOGOUT
   
Method : DELETE
URL : /logout
Server harus mengembalikan respons dengan::
    
Status Code : 200
Response Body:
    OK
