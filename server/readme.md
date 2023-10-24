### Имеющиеся эндпоинты:

GET /artists - получить список исполнителей.
GET /artists/:id - получить исполнителя по id.
POST /artists - создать исполнителя

GET /albums - получить все альбомы.
GET /albums?artist=:id - список альбомов конкретного исполнителя.
GET /albums/:id - получить информацию о конкретном альбоме, включая информацию о его исполнителе.
POST /albums - создать альбом

GET /tracks - получить все треки
GET /tracks?album=:id - получить список треков в конкретном альбоме.
POST /tracks - создать трек

POST /users - Регистрация нового пользователя
POST /users/sessions - Логин пользователя
DELETE /users/logout - Логаут пользователя

### Ипользуемые методы отправки

Для метода POST использовался thunder client, по адресу http://localhost:8001/.

### Пример post-запроса

GET http://localhost:8001/tracks
[
{
"id": 2,
"name": "aadadd",
"duration": "17:03",
"numeration": "1",
"albumId": 3
},
{
"id": 4,
"name": "aadadawdad",
"duration": "17:03",
"numeration": "2",
"albumId": 3
},
]

=============================================

GET http://localhost:8001/tracks?album=:id
{
"tracks": [
{
"id": 2,
"name": "aadadd",
"duration": "17:03",
"numeration": "1",
"albumId": 3,
"album": {
"id": 3,
"title": "11aed",
"year": "2024",
"image": "704042a0-2238-4556-8a90-60abec6ccf3b.png",
"artistId": 1
}
},
{
"id": 4,
"name": "aadadawdad",
"duration": "17:03",
"numeration": "2",
"albumId": 3,
"album": {
"id": 3,
"title": "11aed",
"year": "2024",
"image": "704042a0-2238-4556-8a90-60abec6ccf3b.png",
"artistId": 1
}
}
],
"quantity": 2
}

=============================================

POST http://localhost:8001/tracks
{
"name": "aadadd",
"duration": "8223",
"albumId": "1",
"numeration": "1"
}

пример ответа:
{
"name": "aadaddфв",
"duration": "17:03",
"numeration": "1",
"albumId": "5",
"id": 7
}

при ошибке любого поля
{
"type": "name",
"messages": [
"name must be a string",
"Поле name обязательное"
]
},

============================================

GET http://localhost:8001/artists
[
{
"id": 1,
"name": "asd",
"info": "asd",
"image": "0e1a7fbb-f6bd-43c5-b7e1-9032546628df.png"
},
{
"id": 2,
"name": "wdaaawd",
"info": "adadadw",
"image": "adadad"
},
]

=============================================

GET http://localhost:8001/artists/:id
{
"id": 1,
"name": "asd",
"info": "asd",
"image": "0e1a7fbb-f6bd-43c5-b7e1-9032546628df.png"
}

=============================================

POST http://localhost:8001/artists
используется формдата, так как имеются картинки
{
"name": "ad",
"info": "adwad",
"image": (binary)
}

пример ответа:
{
"name": "artist 1awda",
"info": "2222adwa wd wd awdwaw a",
"image": "a9182227-342a-43f6-9422-d088365af604.jpg",
"id": 6
}

при ошибке любого поля
{
"type": "name",
"messages": [
"name must be a string",
"Поле name обязательное"
]
},

============================================

GET http://localhost:8001/albums
[
{
"id": 3,
"title": "11aed",
"year": "2024",
"image": "704042a0-2238-4556-8a90-60abec6ccf3b.png",
"artistId": 1,
"artist": {
"id": 1,
"name": "asd",
"info": "asd",
"image": "0e1a7fbb-f6bd-43c5-b7e1-9032546628df.png"
}
},
{
"id": 4,
"title": "11aed",
"year": "2024",
"image": "2b440004-4edf-446f-a4a5-6764b86fabfa.png",
"artistId": 2,
"artist": {
"id": 2,
"name": "wdaaawd",
"info": "adadadw",
"image": "adadad"
}
},
]

=============================================

GET http://localhost:8001/albums/:id
{
"id": 6,
"title": "11aed",
"year": "2024",
"image": "a32ed470-54d8-4fec-b612-818195f51390.png",
"artistId": 2,
"artist": {
"id": 2,
"name": "wdaaawd",
"info": "adadadw",
"image": "adadad"
}
}

=============================================

GET http://localhost:8001/albums?artist=:id
[
{
"id": 3,
"title": "11aed",
"year": "2024",
"image": "704042a0-2238-4556-8a90-60abec6ccf3b.png",
"artistId": 1,
"artist": {
"id": 1,
"name": "asd",
"info": "asd",
"image": "0e1a7fbb-f6bd-43c5-b7e1-9032546628df.png"
}
}
]

=============================================

POST http://localhost:8001/albums
используется формдата, так как имеются картинки
{
"title": "ad",
"year": "2023",
"artistId": "1",
"image": (binary)
}

пример ответа:
{
"title": "11aed",
"artistId": "2",
"year": "2024",
"image": "4ee7d46a-c2d8-429f-afbe-62fd4723eacb.png",
"id": 8
}

при ошибке любого поля
{
"type": "name",
"messages": [
"name must be a string",
"Поле name обязательное"
]
},

============================================

POST http://localhost:8000/trackHistory
Authorization: 5enDI2paOqusPavVWOnwB
{
"trackId": 1
}

пример ответа
{
"trackId": "7",
"userId": 3,
"datetime": "2023-10-10T18:30:08.000Z",
"id": 3
}

при неавторизованном юзере
{
"error": {
"message": "No token present"
}
}

при неверном токене
{
"error": {
"message": "Wrong token"
}
}

============================================

POST http://localhost:8000/users
{
"username": "exampleuser",
"password": "examplepassword"
}

пример ответа:
{
"username": "wdaawdw",
"token": null,
"id": 3
}

при ошибке любого поля
{
"type": "username",
"messages": [
"username should not be empty",
"username must be a string"
]
}

=============================================

POST http://localhost:8000/users/sessions
{
"username": "exampleuser",
"password": "examplepassword"
}

пример ответа:
{
"id": 3,
"username": "wdaawdw",
"token": "61e0330c-c610-49a2-a475-d83a1916ca37"
}

при несуществующем юзере
{
"error": {
"message": "User not exist"
}
}

при неверном пароле
{
"error": {
"message": "Login or password is wrong"
}
}

=============================================

DELETE http://localhost:8000/users
