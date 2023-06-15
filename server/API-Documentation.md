## Endpoints
  List of Available Endpoints:
  - POST /register
  - POST /login
  - POST /google-sign-in
  - GET /profile
  - PATCH /premiumMember
  - POST /generateMidtransToken
  - GET /categories
  - GET /foodReviews
  - POST /foodReviews
  - GET /foodReviews/:id
  - PUT /foodReviews/:id
  - DELETE /foodReviews/:id
  - GET /restaurantMenus/:foodReviewId
  - POST /restaurantMenus/:foodReviewId


## POST /register
**Description**
  - Create a new user

**Request**
  - Body
  
  ```javascript
  {
        username: String,
        email: String,
        password: String,
        phoneNumber: String,
      }
  ```

**Response**

*201 - Created*

  - Body

  ```javascript
  {
    id: Integer,
    email: String
  }
  ```

*400 - Bad Request*

  - Body

  ```javascript
  {
    "message": 'Please input your username'
  }
  OR
  {
    "message": 'Please input your email'
  }
  OR
  {
    "message": 'Please input your password'
  }
  OR
  {
    "message": 'Please input your Phone Number'
  }
  OR
  {
    "message": 'Email has already been used!'
  }
  ```


## POST /login
**Description**
  - Login as user

**Request**
  - Body

  ```javascript
  {
    email: String,
    password: String
  }
  ```

**Response**
*200 - OK*

- Body

```javascript
{
  "access_token": String,
  "id": Integer,
  "email": String,
  "phoneNumber": String,
  "role": String,
  "username": String
}
```

*400 - Bad Response*
- Body

```javascript
{
  "message": 'Please input your email'
}
OR
{
  "message": 'Please input your password'
}
```

*401 - Unauthorized*

- Body

```javascript
{
  "message": 'Incorrect email or password'
}
```

## POST /google-sign-in
**Description**
  - Login as user with Gmail account

**Request**
  - headers

  ```javascript
  {
    "token": String
  }
  ```

**Response**
*200 - OK*

- Body

```javascript
{
  "access_token": String,
  "id": Integer,
  "username": String,
  "email": String,
  "role": String
}
```

## GET /profile
**Description**
  - Get user profile detail

**Request**
  - headers
  ```javascript
  {
    "access_token": String
  }
  ```

**Response**
*200 - OK*

- Body

```javascript
{
    "id": Integer,
    "username": String,
    "email": String,
    "phoneNumber": String,
    "status": String,
    "role": String,
    "viewsCount": Integer
}
```

## PATCH /premiumMember
**Description**
  - Update user role to Premium

**Request**
  - headers
  ```javascript
  {
    "access_token": String
  }
  ```

**Response**
*200 - OK*

- Body

```javascript
{
   "message":"user role with id <user.id> is now premium"
}
```

## POST /generateMidtransToken
**Description**
  - Generate midtrans token for transaction

**Request**
  - headers
  ```javascript
  {
    "access_token": String
  }
  ```

**Response**
*200 - OK*

- Body

```javascript
{
   "token": String,
   "redirect_url": String
}
```

*400 - Bad Response*
- Body

```javascript
{
   "message": "your role is already premium"
}
```

## GET /categories
**Description**
  - Get categories

**Response**
*200 - OK*

- Body

```javascript
   [
    {
        "id": Integer,
        "name": String,
        "iconUrl": String
    },
    {
        "id": Integer,
        "name": String,
        "iconUrl": String
    }
   ]
```