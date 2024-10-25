# Covid-19 India

Given two files `app.js` and a database file `admitusers.db`,`contactusers.db` consisting of two tables `Users` and `Contact`.

Write APIs to perform CRUD operations on the tables `state`, `district` containing the following columns,

**Users Table**

| Columns    | Type    |
| ---------- | ------- |
| _id        | INTEGER |
| username   | TEXT    |
| password   | INTEGER |

**Contact Table**

| Columns       | Type    |
| ------------- | ------- |
| id            | INTEGER |
| name          | TEXT    |
| email         | TEXT    |
| phone         | TEXT    |
| address       | TEXT    |
| createdAt     | TEXT    |
| updatedAt     | TEXT    |

### API 1

#### Path: `/contact/`

#### Method: `GET`

#### Description:

Returns a list of all Contacts in the contact table

#### Response

```
[
  {
    _id: "671be2ed597330a0483f59e7",
    name: "vinay",
    email: "vinay@gmail.com",
    phone: "9030664422",
    address: "met Mandal",
    createdAt: "2024-10-25T18:26:53.428Z",
    updatedAt: "2024-10-25T18:26:53.428Z",
    date: "2024-10-25T18:26:53.428Z",
    v: 0
},

  ...
]
```

### API 2

#### Path: `/contact/:id/`

#### Method: `GET`

#### Description:

Returns a Contacts based on the id

#### Response

```
 {
    _id: "671be2ed597330a0483f59e7",
    name: "vinay",
    email: "vinay@gmail.com",
    phone: "9030664422",
    address: "met Mandal",
    createdAt: "2024-10-25T18:26:53.428Z",
    updatedAt: "2024-10-25T18:26:53.428Z",
    date: "2024-10-25T18:26:53.428Z",
    v: 0
}
```

### API 3

#### Path: `/register/`

#### Method: `POST`

#### Description:

Create a register in the Users table, `id` is auto-incremented

#### Request

```
{
  _id:{"$oid":"671b9dcf203a96440357b6b8"},
  username:"mallesh",
  email:"devaragarimalleshyadav7@gmail.com",
  password:"$2b$10$iIBCA3zhKR8lKCZhpvopXeo3AgKOJZZdfLN0YzFuybNAx57P3uxHe",
  date:{"$date":{"$numberLong":"1729863119653"}},
  __v:{"$numberInt":"0"},
}
```

#### Response

```
Register Succesfully

```

### API 4

#### Path: `/contact/:id/`

#### Method: `PUT`

#### Description:

Updated a Contacts based on the id 

#### Request

```
{
  
  "_id": "671be2ed597330a0483f59e7",
    "name": "vinay"
    email": "vinay@gmail.com",
    "phone": "9030664422",
    "address": "met Mandal",
    "createdAt": "2024-10-25T18:26:53.428Z",
    "updatedAt": "2024-10-25T18:26:53.428Z",
    "date": "2024-10-25T18:26:53.428Z",
    "__"v": 0
}
```


#### Response

```
{
  {
    "_id": "671be2ed597330a0483f59e7",
    "name": "vinay"
    email": "vinay@gmail.com",
    "phone": "9030664422",
    "address": "met Mandal",
    "createdAt": "2024-10-25T18:26:53.428Z",
    "updatedAt": "2024-10-25T18:26:53.428Z",
    "date": "2024-10-25T18:26:53.428Z",
    "__"v": 0
},
}
```

### API 5

#### Path: `/contact/:id/`

#### Method: `DELETE`

#### Description:

Deletes a conatct from the contacts table based on the id

#### Response

```
Contact Deleted Succesfully

```

### API 6

#### Path: `/login/`

#### Method: `POST`

#### Description:

Create a register in the Users table, `id` is auto-incremented

#### Request

```
{
  
  "email":"devaragarimalleshyadav7@gmail.com",
  "password":"$2b$10$iIBCA3zhKR8lKCZhpvopXeo3AgKOJZZdfLN0YzFuybNAx57P3uxHe",
}
```

#### Response

```
{
    "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxYjlkY2YyMDNhOTY0NDAzNTdiNmI4In0sImlhdCI6MTcyOTg4MjM3MX0.C8vHa--25HEgjLutynbSETiGwoQs4HwnvfVv9fmzkTI"
}

```

### API 7

#### Path: `/changePassword`

#### Method: `PUT`

#### Description:

Updated a oldPassword to newPassword Based on there email.

#### Request

```
{
  
 
    "email": "vinay@gmail.com",
    "oldPassword:"2342",
    "newPassword:"ssdf",
    
}
```


#### Response

```
 Password updated successfully

```


<br/>

Use `npm install` to install the packages.

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.**
