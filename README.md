# SAEC

## Setup

Steps to run this application:

1. Run npm install
2. Create .env
3. Add DB info
4. Add DEFAULT_ROLE=student
5. Composer install
6. php artisan migrate --seed
7. php artisan passport:install
8. php artisan passport:client --personal
9. php artisan key:generate
10. php artisan serve

## Graphql-playground

When running the application, you can access a graphql-playground to test the various queries used in the application.

Just enter localhost:8000/graphql-playground

Note that in order to run queries you must add the following header to the HTTP Headers tab:

{ "authorization": "Bearer [token]" }

where [token] should be replaced by an authorization token. You can receive one by sending a POST request in postman
at localhost:8000/api/login with the following parameters.

1. In headers, add a Content-Type: application/json header
2. In body, select x-www-form-urlencoded and add a email key and a password key, with values from a user in your database 
that you wish to login as.
3. After sending a request, you should receive a response, your token should appear in the "token" field.

## Saving changes

This application runs with webpack, so in order to see changes in the frontend you should run npm run watch (so your 
application recompiles files after detecting a change) or npm run dev if you don't want changes to inmediatly show up.
