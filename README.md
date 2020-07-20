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
- In .env file: type out the entire IP address instead of using localhost
	```javascript
	DATABASE=mongodb://127.0.0.1:27017/ecommerce
	PORT=8000
	```

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
	- Import express in order to use router
	- Create the router: `router.get('/', (req, res) => {res.send('hello from node')})`
	- Don't forget to export the module
- Import the user routes in app.js file and register routes as middleware: `app.use('/api', userRoutes)`

**6. Create controllers**
- Controllers are methods to handle incoming routes
- Create a new folder called controllers
- Inside the folder, create a file called user.js
- In user.js file:
	- Write a function that sends back a response in json format
	- Don't forget to export
- Import the above module in routes/user.js file and call the function in router

### NODE: USER SIGNUP AND SIGNIN
**1. Create user model and define userSchema, virtual fields, and methods**
- Create a new folder called models
- Inside the folder, create a file called user.js
- In user.js file, define the user schema:
	- Require mongoose to create the User model and schema: `const mongoose = require('mongoose')`
	- Require crypto to encrypt the password: `const crypto = require('crypto')`
	- Require uuid to generate unique id: `const { v4: uuidv4 } = require('uuid')`
	- Define the user schema
	- Create userSchema virtual fields and methods that encrypts the password with uuid
	- Export the module: `module.exports = mongoose.model('User', userSchema)`

**2. User signup**
- Install: `npm i body-parser cookie-parser morgan`
- Require all three middlewares in app.js file and use them
- In controllers/user.js file:
	- Require in User from models/user.js
	- Create a signup method to sign up a new user
		- Save the new user or error in json format
- In routes/user.js file:
	- Require in the signup method from constrollers/user.js
	- Call a post() method that takes in takes '/signup' route as the 1st arg and the signup method as 2nd arg

**3. Use Postman to signup user**
- Select a POST request from the dropdown menu
- Provide the url: `http://localhost:8000/api/signup`
- Select 'Body' and 'raw' and 'JSON' from the pulldown menu
- Then enter name, email, and password in json format. Should get a success or failed code status

**4. Write a friendly error message for user signup**
- Create a folder called helpers
- Inside helpers, create a file called dbErrorHandler.js
- Write an errorHandler method that takes in the error response code to create a unique message
- Require in the errorHanderler method in controllers/user.js file
	- Call the method in the error handling code block

**5. Write a helper method that validates the data for user signup process**
- Install middleware: `npm i express-validator@5.3.1`
- Require expressValidator in app.js file and use it as middleware: `app.use(expressValidator())`
- Create a new folder called validator
- Inside validator, create a file called index.js
- Inside index.js file:
	- Write a userSignupValidator method that validates the user name, email, and password
	- Also catch all the errors coming from the request
	- Whenever using a middleware, don't forget to call next() as a callback to move forward
- Then require in the userSignupValidator method in routes/user.js file
	- Pass in this method as a 2nd argument to the post method

**6. User signin using Jason Web Token(JWT) and express-jwt**
- Install: `npm i express-jwt jsonwebtoken`
- In routes/user.js file:
	- Create a user '/signin' route: `router.post('/signin', signin)`
	- Require in signin method from controllers/user.js
- In controllers/user.js file:
	- Require in jwt. It's used to generate signed token: `const jwt = require('jsonwebtoken')`
	- Require in expressJWT. It's used for authorization check: `const expressJWT = require('express-jwt')`
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