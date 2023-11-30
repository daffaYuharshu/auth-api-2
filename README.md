# Dokumentasi API

Ini merupakan sebuah API yang menyediakan fungsi autentikasi pengguna.

## Register
- **Metode** : POST
- **URL**    : **'/users'**
- **Request Body** :
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
- Jika akun berhasil ditambahkan, server akan mengembalikan respons sebagai berikut:
  - **Status Code** : 201
  - **Response Body** :
    ```json
    {
      "error": false,
      "message": "account has been created"
    }
    ```
- Jika email sudah digunakan, server akan mengembalikan respons :
  - **Status Code** : 400
  - **Response Body** : 
    ```json
    {
      "error" : true,
      "message" : "Email has been used"
    }
    ```
- Jika field nama kosong (tidak di input), server akan mengembalikan respons :
  - **Status code** : 400
  - **Respons Body** :
    ```json
    {
    "errors": [
        {
            "type": "field",
            "value": "",
            "msg": "Invalid name",
            "path": "name",
            "location": "body"
        }
      ]
    }
    ```
- Jika format penulisan email salah, server akan mengambalikan respons :
  - **Status Code** : 400
  - **Respons Body** :
    ```json
    {
    "errors": [
        {
            "type": "field",
            "value": "windahgmail.com",
            "msg": "Invalid email",
            "path": "email",
            "location": "body"
        }
      ]
    }
    ```

- Jika jumlah karakter dalam password kurang dari 8, server akan mengembalikan respons :
  - **Status Code** : 400
  - **Respons Body** :
    ```json
    {
    "errors": [
        {
            "type": "field",
            "value": "windah1",
            "msg": "Password must be at least 8 characters",
            "path": "password",
            "location": "body"
        }
      ]
    }
    ```
    
## Get Akun
- **Metode** : GET
- **Headers** : Authorization Bearer Token
- **URL** : **'/users'**
- Server akan mengembalikan respons sebagai berikut :
  - **Status Code** : 200
  - **Response Body** :
    ```json
    {
      "id": "user-ei20j102e1290",
      "name": "windah",
      "email": "windah@gmail.com"
    }
    ```

## Login
- **Metode** : POST
- **URL** : **'/login'**
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- Jika login berhasil, server akan mengembalikan respons sebagai berikut :
  - **Status Code** : 200
  - **Respons Body** :
    ```json
    {
      "error": false,
      "message": "success",
      "loginResult": {
        "userId": "user-Do2Y5sZ11LIF",
        "email": "windah@gmail.com",
        "token": "string"
      }
    }
    ```
- Jika email atau password salah, server akan merespons :
  ```json
  {
    "error": true,
    "message": "Wrong email or password. Please try again"
  }

## Resfresh Token
- **Metode** : GET
- **URL** : **'/token'**
- Server akan mengembalikan respons sebagai berikut :
  - **Status Code** : 200
  - **Respons Body** :
    ```json
    {
      "accessToken": "string"
    }
    ```

## Logout
- **Metode** : DELETE
- **URL** : **'/logout'**
- Server akan mengembalikan respons sebagai berikut :
  - **Status Code** : 200
  - **Respons Body** : OK
