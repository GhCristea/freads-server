Books API, created with NestJS

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

## Requets

### GET:

```bash
#list all books

/:id
#get book with ID = id

/search?search=some
#list all books with title containing "some"
```

### POST:

```bash
    /insert?title=title&authors=author1,author2,...&category=category1,category2
    #insert book
```

### PATCH:

```bash
    /:bookId/rate?rating=5
    #rate book with ID = bookId
```
