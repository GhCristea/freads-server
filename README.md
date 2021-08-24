Little API for book-list, built on top of NestJS

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Requets

    GET:

```
/  - list all books

/:id - get book with ID = id

/search?search=some - list all books with title containing "some"
```

    POST:

```
    /insert?title=title&authors=author1,author2,...&category=category1,category2
```

    PATCH:

```
    /:bookId/rating?rate?rating=5 //rate book with ID = bookId
```
