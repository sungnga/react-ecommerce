# STEPS TO BUILDING THIS ECOMMERCE APPLICATION

### NODE: PROJECT SETUP
**1. Setup the project**
- Initialize npm and create package.json file: `npm init -y`
- Install: `npm i express dotenv nodemon`
- In package.json file, write a script to run nodemon: `"start": "nodemon app.js"`
- Create a .gitignore file and include `node_module` and `.env`

**2. Setup express server and configure port in app.js file**
```javascript
const express = require('express');
const app = express();
require('dotenv').config();

app.get('/', (req, res) => {
	res.send('hello from node');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
```

**3. Setup database MongoDB Atlas**
- https://www.mongodb.com/cloud/atlas
- Create a new project on the mongoDB Atlas website
- On the left sidebar, click on 'Network Access' and create an IP Whitelist address to be: 0.0.0.0/0
- On the left sidebar, click on 'Database Access'. Add database user and remember the password
- On the left sidebar, click on 'Clusters' and click the 'CONNECT' button. Select the second item on the list 'Connect your application'. Copy this string
- In .env file: 
	- type out the entire IP address instead of using localhost
	- include the port number


**4. Setup mongoose**
- Install: `npm install mongoose`
- Import mongoose in app.js file: `const mongoose = require('mongoose')`
- Setup the db connection in app.js:
	```javascript
	mongoose
		.connect(process.env.DATABASE, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		})
		.then(() => console.log('DB Connected'));
	``` 
- Connect to mongoDB using the terminal: NOTE ON THE IP ADDRESS AND THE PORT NUMBER
	```
	Nga-MacBook-Air:react-ecommerce nga$ cd
	Nga-MacBook-Air:~ nga$ /Users/Nga/mongodb/bin/mongod --dbpath=/Users/Nga/mongodb-data
	```

**5. Create routes**
- Create a new folder called routes
- Inside routes folder, create a file called user.js
- In user.js file:
	- Import express in order to use router: `const express = require('express')`
	- Create the router: `router.get('/', (req, res) => {res.send('hello from node')})`
	- Don't forget to export the module
- In app.js file:
	- Import the user routes: `const userRoutes = require('./routes/user')`
	- Register routes as middleware: `app.use('/api', userRoutes)`

**6. Create controllers**
- Controllers are methods to handle incoming routes
- Create a new folder called controllers
- Inside the folder, create a file called auth.js
- In auth.js file:
	- Write a function that sends back a response in json format
	- Don't forget to export
- Import the above module in routes/auth.js file and call the function in router

### NODE: USER SIGNUP AND SIGNIN
**1. Create user model and define userSchema, virtual fields, and methods**
- Create a new folder called models
- Inside the folder, create a file called user.js
- In user.js file, define the user schema:
	- Import mongoose to create the User model and schema: `const mongoose = require('mongoose')`
	- Import crypto to encrypt the password: `const crypto = require('crypto')`
	- Import uuid to generate unique id: `const { v4: uuidv4 } = require('uuid')`
	- Define the user schema
	- Create userSchema virtual fields and methods that encrypts the password with uuid
	- Export the module: `module.exports = mongoose.model('User', userSchema)`

**2. User signup**
- Install: `npm i body-parser cookie-parser morgan`
- Import all three middlewares in app.js file and use them
- In controllers/auth.js file:
	- Import User from models/user.js
	- Create a signup method to sign up a new user
		- Save the new user or error in json format
- In routes/auth.js file:
	- Import the signup method from constrollers/auth.js
	- Create a user signup route using post() method: `router.get('/signup', signup)`
		- The 2nd argument is the signup method coming from controllers/auth.js

**3. Use Postman to signup user**
- Select a POST request from the dropdown menu
- Provide the url: `http://localhost:8000/api/signup`
- Select 'Body' and 'raw' and 'JSON' from the pulldown menu
- Then enter name, email, and password in json format. Should get a success or failed code status

**4. Write a friendly error message for user signup**
- Create a folder called helpers
- Inside helpers, create a file called dbErrorHandler.js
- Write an errorHandler method that takes in the error response code to create a unique message
- Import the errorHanderler method in controllers/auth.js file
	- Call the method in the error handling code block

**5. Write a helper method that validates the data for user signup process**
- Install middleware: `npm i express-validator@5.3.1`
- Import expressValidator in app.js file and use it as middleware: `app.use(expressValidator())`
- Create a new folder called validator
- Inside validator, create a file called index.js
- In index.js file:
	- Write a userSignupValidator method that validates the user name, email, and password
	- Also catch all the errors coming from the request
	- Whenever using a middleware, don't forget to call next() as a callback to move forward
- Then import the userSignupValidator method in routes/auth.js file
	- Pass in this method as a 2nd argument to the post method

**6. User signin using Jason Web Token(JWT) and express-jwt**
- Install: `npm i express-jwt jsonwebtoken`
- In routes/auth.js file:
	- Create a user signin route: `router.post('/signin', signin)`
		- 2nd arg is the signup method coming from controllers/auth.js
	- Import signin method from controllers/auth.js
- In controllers/auth.js file:
	- Import jwt. It's used to generate signed token: `const jwt = require('jsonwebtoken')`
	- Import expressJWT. It's used for authorization check: `const expressJWT = require('express-jwt')`
	- Write a signin method...
		- that takes the user email and password from the request (req.body)
		- and find the user based on email
		- handle the error if no email is found
		- if user is found, use the authenticate method from user model to check the email and password match
		- handle the error if the password does not match
		- generate a signed token with user id and secret
		- persist the token as 't' in cookie with expiry date
		- return response with user and token to frontend client in json format
- In models/user.js file:
	- In the userSchema.methods, create an authenticate method that checks the given password with the hashed password and returns true or false
- Use Postman to test user signin

**7. Implement user signout**
- In route/auth.js file:
	- Create a user signout route using get() method: `router.get('/signout', signout)`
		- 2nd arg is the signout method coming from controllers/auth.js
	- Import signout method from controllers/auth.js
- In controllers/auth.js file:
	- Write a signout method that clears the token that is stored in the cookie
- Test the signout route in Postman

### NODE: AUTH AND ADMIN MIDDLEWARES
**1. Require signin middleware**
- In controllers/auth.js file:
	- Write a requireSignin method that acts as middleware for routes that restricts unauthorized user access
	- Use express-jwt
In routes/auth.js file:
	- Import requireSignin method from controllers/auth.js

**2. RENAMING USER TO AUTH (IN CONTROLLERS AND ROUTES)**
- Rename controllers/user.js file to auth.js
- Rename routes/user.js file to auth.js
- In app.js file, rename userRoutes to authRoutes

**3. Create user by id middleware**
- Inside routes folder, create a file called user.js. And in this file:
	- Import express and create router from express
	- Create a route that, whenever there's a 'userId' in the route paramenter, call the userById method: `router.param('userId', userById)`
	- Import userById method from controllers/user.js
- Inside controller folder, create a file called user.js. And in this file:
  - Import User from user model, models/user.js
	- Write a userById method that..
		- takes the parameters of req, res, next and id
		- then it tries to find the user by their id using the findById() method
		- then calls the exec() method to execute the callback function
		- in this callback, we'll either get an error or the user as param
		- if error or no user, return a response with status code of 400 and an error message
		- if a user is found, set the user info to profile: `req.profile = user`
		- since this is a middleware, call next() to move on
- In routes/user.js file:
	- Create a route using get() method with 3 arguments
		- 1st arg is the path: `'/secret/:userId'`
		- 2nd arg is the require signin middleware: `requireSignin`
		- 3rd arg is a function that responds with the user info, in json format, coming from `req.profile`
- In app.js file:
	- Import user routes: `const userRoutes = require('./routes/user')`
	- Use user routes as routes middleware: `app.use('/api', userRoutes)`
- Test with Postman
	- Use get() method and set URL to `http://localhost:8000/api/secret/userId`
	- Under 'Headers' tab:
		- Set Key to be Authorization and set the value to be Bearer + userToken
		- Set Key to be Content-Type and set the value to be application/json



# LIBRARIES USED

- express
- dotenv
- nodemon
- mongoose
- crypto
- uuid
- body-parser
- cookie-parser
- morgan
- express-validator
- express-jwt
- jsonwebtoken