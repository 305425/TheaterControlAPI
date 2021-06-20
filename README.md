"# TheaterControlAPI" 

### Technical stack used
- Hapi js
- Mongodb
- Swagger UI
- JWT


### Solution setup steps

- Please clone the repo https://github.com/305425/TheaterControlAPI.git.
- Navigate to directory "TheaterControlAPI" using  command "cd TheaterControlAPI".
- Run "npm install" command.
- Add .env file and add the follwing variables
------------

    DEBUGGER=false                          // Enable/disable debug mode
    NODE_ENV=                                 // Node environment development/production
    PORT=8080                                  // Server Port
    SERVER_HOST=localhost              // Hapi Server host
    COOKIE_SECRET=This_Should_be_32_characters_long
    YAR_COOKIE_SECRET=This_Should_be_32_characters_long
    JWT_SECRET=This_Should_be_32_characters_long                                  
    SWAGGER_HOST=localhost:8080   // Host Url for Swagger
    DATABASE_URL= // Mongo database url
- Execute "npm start" to run the solution.
-Execute "npm test" to run the test cases
- Swagger url will be available at http://localhost:8080/documentation;
- Please call Login api with {
  "email": "admin@gmail.com",
  "password": "any password morethamn 5 character length"
} to aquire token.
- Use thet token in swagger ui to call rest of the apis


