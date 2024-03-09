# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/h4cktivist/nodejs2024Q1-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

In the root directory create a file named .env and declare the PORT variable there. For example:

```
PORT=4000
```

Then use:

```
npm start
```

The server will run on http://localhost:PORT 

## Endpoints

### Users

* `GET /user` - get all users
* `GET /user/:id` - get single user by `id`
* `POST /user` - create user. Body is required:
  ```json
  {
    "login": string,
    "password": string
  }
  ```
* `PUT /user/:id` - update user's password. Body is required:
    ```json
    {
      "oldPassword": string,
      "newPassword": string
    }
    ```
* `DELETE /user/:id` - delete user

### Artists

* `GET /artist` - get all artists
* `GET /artist/:id` - get single artist by `id`
* `POST /artist` - create artist. Body is required:
  ```json
  {
    "login": string,
    "grammy": boolean
  }
  ```
* `PUT /artist/:id` - update artist. The same body as in POST is required
* `DELETE /artist/:id` - delete artist

### Albums

* `GET /album` - get all albums
* `GET /album/:id` - get single album by `id`
* `POST /album` - create album. Body is required:
  ```json
  {
    "name": string,
    "year": number,
    "artistId": string | null // refers to Artist
  }
  ```
* `PUT /album/:id` - update album. The same body as in POST is required
* `DELETE /album/:id` - album artist

### Tracks

* `GET /track` - get all tracks
* `GET /track/:id` - get single track by `id`
* `POST /track` - create track. Body is required:
  ```json
  {
    "name": string,
    "artistId": string | null // refers to Artist
    "albumId": string | null // refers to Album
    "duration": integer
  }
  ```
* `PUT /track/:id` - update track. The same body as in POST is required
* `DELETE /track/:id` - album track

### Favorites

* `GET /favs` - get all favorites
* `POST /favs/track/:id` - add track to the favorites by its `id`
* `DELETE /favs/track/:id` - delete track from favorites
* `POST /favs/album/:id` - add album to the favorites by its `id`
* `DELETE /favs/album/:id` - delete album from favorites
* `POST /favs/artist/:id` - add artist to the favorites by its `id`
* `DELETE /favs/artist/:id` - delete artist from favorites

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```
