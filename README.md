# FacePost API REST

This project implements JWT authentication and upload posts images to AWS S3

### Tech

FacePost uses a number of open source projects to work properly:
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework

### Installation

FacePost requires [Node.js](https://nodejs.org/) v10+ to run.

Environment variables
* Create .env file on the root of the project with the following environment variables
```sh
# server config

SERVER_PORT=
SERVER_HOSTNAME=
SECRET_KEY=

# mongo db config

DB_URL_CONNECTION=

# AWS
AWS_KEY_ID=
AWS_KEY_SECRET=
AWS_BUCKET_NAME=
```


Install the dependencies and devDependencies and start the server by default the server run on http://0.0.0.0:3000

```sh
$ cd FacePostsBack
$ npm install
$ npm start
```

# REST API

- Auth
### Request
`POST api/auth/singup`
```sh
curl -i -H 'Accept: application/json' -d "email='some@gmail.com'&password='secret password'&username='some username'" http://0.0.0.0:3000/api/auth/singup
```
### Response
The token response expire in 1 hour
```sh
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 195
ETag: W/"c3-kH32IzFeUKOPCz/CGPuEONznV2c"
Date: Fri, 19 Jun 2020 21:05:18 GMT
Connection: keep-alive

{
"auth":true,
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZWQyODhlMWU2ZmQzOWExZGRiYTVmYyIsImlhdCI6MTU5MjYwMDcxOCwiZXhwIjoxNTkyNjA0MzE4fQ.etAeqw2lfwzyGFyT2TXB6q9Qfo3wSati_ZDVrBihMhc"
}
```
### Request
`POST api/auth/singin`
```sh
curl -i -H 'Accept: application/json' -d "email='some@gmail.com'&password='secret password'" http://0.0.0.0:3000/api/auth/singin
```
### Response
The token response expires in 1 hour
```sh
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 195
ETag: W/"c3-iMTjGhE1HefKBEaZuY6NrE7TO5g"
Date: Fri, 19 Jun 2020 21:17:36 GMT
Connection: keep-alive

{
"auth":true,
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZWQyODhlMWU2ZmQzOWExZGRiYTVmYyIsImlhdCI6MTU5MjYwMDcxOCwiZXhwIjoxNTkyNjA0MzE4fQ.etAeqw2lfwzyGFyT2TXB6q9Qfo3wSati_ZDVrBihMhc"
}
```

### Request
Get all posts of authenticated user 
`GET api/posts`
```sh
curl -i -X GET \
-H 'Accept: application/json' \
-H 'authorization: Basic <Access-Token>' \
 http://0.0.0.0:3000/api/posts

```
### Response
The token response expires in 1 hour
```sh
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 11
ETag: W/"b-EFAlOux7Kcr/ZEgGkn2r+oFAbu4"
Date: Fri, 19 Jun 2020 21:38:33 GMT
Connection: keep-alive

{
    "data":[
        {"_id":"5eed311d5bb5d79cb2c3a234",
        "createdAt":"2020-06-19T21:41:49.815Z",
        "content":"this is my first content for  more large posts",
        "title":"Some posts",
        "user":{"username":"'some username'","email":"'some@gmail.com'"},
        "image_url":"<aws url>"
        }]
}
```
- Manage pagination http://0.0.0.0:3000/api/posts?page=1&pagination=20


### Request
Create post 
`POST api/posts`

##### Required Fields
- content
- title
- file   Image to be upload to Aws S3 use

##### Headers
` authorization: Basic <Access-Token>`


### Request
Update Post
`PUT api/posts/`

##### Body
```sh
{
    "postId": "<Post id>" 
    "title" : "optional"
    "content": "optional"
}
```
##### Headers
` authorization: Basic <Access-Token>`



### Request
Delete Post
`DELETE api/posts/`

##### Body
```sh
{
    "postId": "<Post id>" 
}
```
##### Headers
` authorization: Basic <Access-Token>`
