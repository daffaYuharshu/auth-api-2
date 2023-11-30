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

## Get Akun
- **Metode** : GET
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
