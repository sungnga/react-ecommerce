# STEPS TO BUILDING THIS E-COMMERCE APPLICATION WITH NODE.JS

### NODE: PROJECT SETUP
**1. Setup the project**
- Initialize npm and create package.json file: `npm init -y`
- Install express, dotenv, and nodemon modules:
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
	- Import the signup method from controllers/auth.js
	- Create a user signup route using post() method: `router.get('/signup', signup)`
		- The 2nd argument is the signup method coming from controllers/auth.js

**3. Use Postman to signup user**
- Select a **POST** request from the dropdown menu
- Provide the url: `http://localhost:8000/api/signup`
- Select 'Body' and 'raw' and 'JSON' from the pulldown menu
- Then enter name, email, and password in json format. Should get a success or failed code status

**4. Write a friendly error message for user signup**
- Create a folder called helpers
- Inside helpers, create a file called dbErrorHandler.js
- Write an errorHandler method that takes in the error response code to create a unique message
- Import the errorHandler method in controllers/auth.js file
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
	- Create a route that, whenever there's a 'userId' in the route parameter, call the userById method: `router.param('userId', userById)`
	- Import userById method from controllers/user.js
- Inside controller folder, create a file called user.js. And in this file:
  - Import User model from models/user.js
	- Write a userById method that
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
		- 3rd arg is a function that sends back a json response with the user info coming from `req.profile`
- In app.js file:
	- Import user routes: `const userRoutes = require('./routes/user')`
	- Use user routes as routes middleware: `app.use('/api', userRoutes)`
- Test with Postman
	- Use **get** request and set URL to `http://localhost:8000/api/secret/:userId`
	- Under 'Headers' tab:
		- Set Key to be Authorization and set the value to be Bearer + userToken
		- Set Key to be Content-Type and set the value to be application/json

**4. Create two middlewares: one for authenticated user and another for admin user**
- In controllers/auth.js file:
	- Write an isAuth function that checks to see if the user is an authenticated user
		- This middleware prevents a signed-in user to have access to another user's profile
		- The authenticated id must match the profile id
		- Handle the error with a status code of 403 and a json response message
		- Then call next() to move on
	- Write an isAdmin function that checks to see if the user is an admin user
		- If a user has a role property with the value of 0, then the user is NOT an admin user
		- Handle the error with status code of 403 and a json response message
		- Call next() to move forward
- In routes/user.js file:
	- Import isAuth and isAdmin middlewares from controllers/auth.js
	- Pass in the isAuth and isAdmin middlewares to the router as arguments
	- `router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {...}`
- Use Postman to test
	- Make sure the Bearer token value is the same as the token when signin
	- To test if a user is an admin user, change the role property with a value of 1


### NODE: PRODUCT AND CATEGORIES
**1. Create category model, route, and controller**
- In models folder, create a file called category.js. In this file:
	- Import mongoose: `const mongoose = require('mongoose')`
	- Create a categorySchema using mongoose schema
		- Define name and timestamps properties
	- Export the module: `module.exports = mongoose.model('Category', categorySchema)`
- In routes folder, create a file called category.js. In this file:
	- Import express: `const express = require('express')`
	- Create a new router from express.Router()
	- Create a route using **post()** method to create a new category
		- 1st arg is the path: `'/category/create'`
		- 2nd arg is the create method coming from controllers/category: `create` 
- In app.js file:
	- Import category routes: `const categoryRoutes = require('./routes/category')`
	- Use the routes as middleware: `app.use('/api', categoryRoutes)`
- In controllers folder, create a file called category.js. In this file:
	- Import Category from category model: `const Category = require('../models/category')`
	- Import errorHandler helper method: `const { errorHandler } = require('../helpers/dbErrorHandler')`
	- Write a create method that creates and saves a category
		- Save the data in json format
		- Or handle the request error with status code of 400 and a json response message

**2. Add middlewares and create a category using Postman**
- In routes/category.js file:
	- Add middlewares so that only admin users can create a category. Also, user must require signin and is an authenticated user
	- Import requireSignin, isAuth, and isAdmin middlewares from controllers/auth
	- `router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create)`
- Use Postman to create a category
	- Make a **post** request with this URL: `http://localhost:8000/api/category/create/:userId`
	- Make sure this userId is already signed-in
	- Make sure this user role property has a value of 1
	- Make sure the Bearer token matches the token generated when the user signin

**2. Add product model**
- In models folder, create a file called product.js. In this file:
	- Import mongoose: `const mongoose = requir('mongoose')`
	- Create a productSchema using mongoose schema
		- Define its properties
		- For the category property, the schema type is an ObjectId that reference the Category model
	- Export the module: `module.exports = mongoose.model('Product', productSchema)`

**3. Create product with file upload**
- In routes folder, create a file called product.js. In this file:
	- Import express: `const express = require('express')`
	- Create a new router from express.Router()
	- Create a route using **post()** request method to create a new product and add middlewares to validate user
		- 1st arg is the path: `'/product/create/:userId'`
		- 2nd arg requires user signin: `requireSignin`
		- 3rd arg checks to see if user is authenticated: `isAuth`
		- 4th arg checks to see if it is admin user: `isAdmin`
		- 5th arg is the create method coming from controllers/category: `create`
	- If userId is in route param, run the userById method
- In app.js file:
	- Import category routes: `const productRoutes = require('./routes/product')`
	- Use the routes as middleware: `app.use('/api', productRoutes)`
- In controllers folder, create a file called product.js. In this file:
	- Import Product from product model: `const Product = require('../models/product')`
	- Write a create method that creates a product, accepts product photo upload and saves the product
	- For photo upload, we need to handle form data coming from the client using libraries
		- Install libraries: `npm i formidable lodash`
		- Import both formidable and lodash
		- Create a new form using formidable library
		- Parse the form for error, fields and files
			- Handle the error by sending status code and error message
			- Assign the fields to product
			- Accept the incoming photo file using fs library
			- Import fs filesystem built-in library
	- Save the product either with a result or an error
		- Handle the error using errorHandler helper function
		- Import errorHandler helper method
		- Or send the result in json response

**4. Create a product using Postman**
- Make a **post** request with this URL: `http://localhost:8000/api/product/create/:userId`
- Make sure this userId is already signed-in
- Make sure this user role property has a value of 1
- Make sure the Bearer token matches the token generated when the user signin
- **Under the Headers tab: delete ContentType and only Authorization key is provided**
- Under Body tab, select form-data to fill out product information
	- Under key column, enter all the product properties that were defined in product schema
	- For category property, the value for ObjectId is the id of the category created earlier
	- For photo property, select 'file' instead of 'text'. And then upload a photo

**5. Create product validation**
- In controllers/product.js file:
	- Validate uplode photo size
		- In create method, write a condition that checks for image size less than 1mb
		- If greater than 1mb, return a response with status code and error message
	- Validate that all fields are filled out
		- Destructure all properties from fields
		- Write a condition that checks for all properties
		- If error, return a response with status code and error message

**6. Create productById middleware and read a productById**
- In routes/product.js file:
	- Create a route that, whenever there's a 'productId' in the route paramenter, call the productById method: `router.param('productId', productById)`
	- Import productById method from controllers/product.js
- In controllers/product.js file:
	- Write a productById method that..
		- takes the parameters of req, res, next and id
		- then it tries to find the product in the Product model using the findById() method
		- then calls the exec() method to execute the callback function
		- in this callback, we'll either get an error or the product as param
			- if error or no product, return a response with status code of 400 and an error message
			- if a product is found, set the product info to product: `req.product = product`
		- since this is a middleware, call next() to move on
- In routes/product.js file:
	- Create a route that retrieves a product by its id
		- `router.get('/product/:productId', read);`
		- Use **get()** request method
		- 1st arg is the path: `'/product/:productId'`
		- 2nd arg is the read middleware coming from controllers/product.js
	- Import read method from controllers/product.js
- In controllers/product.js file:
	- Write a middleware read method that sends back a json response of `req.product`
		- Leave the product.photo property as undefined for now. We will write a separate method to handle the photo

**7. Delete product**
- In routes/product.js file:
	- Create a route that deletes a product by its id and by a specific user
		- `router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);`
		- Use **delete()** method
		- 1st arg is the path: `'/product/:productId/:userId'`
		- 2nd arg is user must sign in: `requireSignin`
		- 3rd arg is user is authenticated: `isAuth`
		- 4th arg is an admin user: `isAdmin`
		- 5th arg is the remove method: `remove`
	- Import remove method from controllers/product.js
- In controllers/product.js file:
	- Write a remove method that removes the product
		- Get the product from `req.product` object: `const product = req.product`
		- Then call a remove() method on product with a callback that either has the error or the deletedProduct
			- If error, return a status code and a json response of the error message
			- If success, return a json response with a message that product is deleted
- Test delete a product using Postman
	- Make a **delete** request with this URL: `http://localhost:8000/api/product/:productId/:userId`

**8. Update product**
- In routes/product.js file:
	- Create a route that updates a product by its id and by a specific user
		- `router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update)`
		- Use **put()** method
		- 1st arg is the path: `'/product/:productId/:userId'`
		- 2nd arg is user must sign in: `requireSignin`
		- 3rd arg is user is authenticated: `isAuth`
		- 4th arg is an admin user: `isAdmin`
		- 5th arg is the update method: `update`
	- Import update method from controllers/product.js
- In controllers/product.js file:
	- Write an update method that updates the product
	- This method is very similar to the create product method
	- The difference is instead of creating a product from Product model: `let product = new Product(fields);`
	- We first get the product from `req.product` object: `const product = req.product`
	- Then we update the product with the new fields using the extend() method from the lodash library
	```javascript
	let product = req.product;
	product = _.extend(product, fields)
	```
- Test update a product using Postman
	- Make a **put** request with this URL: `http://localhost:8000/api/product/:productId/:userId`

**9. Create categoryById middleware and read a categoryById**
- In routes/category.js file:
	- Create a route that, whenever there's a 'categoryId' in the route parameter, call the categoryById middleware method: `router.param('categoryId', categoryById)`
	- Import categoryById method from controllers/category.js
- In controllers/product.js file:
	- Write a categoryById method that..
		- takes the parameters of req, res, next and id
		- then it tries to find the product in the Category model using the findById() method
		- then calls the exec() method to execute the callback function
		- in this callback, we'll either get an error or the category as param
			- if error or no category, return a response with status code of 400 and an error message that category does not exist
			- if a category is found, set the category info to the category object: `req.category = category`
		- since this is a middleware, call next() to move on
- In routes/product.js file:
	- Create a route that retrieves a single category by its id
		- `router.get('/category/:categoryId', read);`
		- Use **get()** request method
		- 1st arg is the path: `'/category/:categoryId'`
		- 2nd arg is the read middleware coming from controllers/category.js
	- Import read method from controllers/category.js
- In controllers/product.js file:
	- Write a middleware read method that sends back a json response of `req.category`
- Test read categoryById using Postman
	- Read: us **get** request with this url: `http://localhost:8000/api/category/:categoryId`

**10. Update, delete, and get all category**
- In routes/category.js file:
	- Create a route that deletes a category by its id and by a specific user
		- `router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);`
		- Use **delete()** method
	- Create a route that updates a category by its id and by a specific user
		- `router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);`
		- Use **put()** method
	- Create a route that lists all the categories
		- `router.get('/categories', list)`
		- Use **get()** method
	- Import remove, update, and list methods from controllers/category.js
- In controllers/category.js file:
	- Write an update method that updates the category
		- Get the category from `req.category` object: `const category = req.category`
		- Set the category name property to request body name object: `category.name = req.body.name`
		- Then call a save() method on category with a callback that either has the error or the data
			- If error, return a status code and a json response of the error message
			- If success, return a json response of the data
	- Write a remove method that removes the category
		- Get the category from `req.category` object: `const category = req.category`
		- Then call a remove() method on category with a callback that either has the error or the data
			- If error, return a status code and a json response of the error message
			- If success, return a json response with a message that category is deleted
	- Write a list method that lists all the categories
		- Use find() method to find categories in Category model
		- Then call the exec() function to execute a callback that either has the error or the data
			- If error, return a status code and a json response of the error message
			- If success, return a json response of the data
- Test using Postman
	- Delete: use **delete** request with this URL: `http://localhost:8000/api/category/:categorytId/:userId`
	- Update: use **put** request with this URL: `http://localhost:8000/api/category/:categorytId/:userId`
	- List categories: use **get** request with this URL: `http://localhost:8000/api/categories`


### NODE: SENDING PRODUCTS WITH QUERIES
**1. Display products by sell/arrival on request query params**
- In routes/products.js file:
	- Create a route that list all the products
		- `router.get('/products', list)`
		- Use **get()** method
	- Import list method from controllers/products
- In controllers/product.js file:
	- Write a list method that lists all the products based on the request query params
		- Get the order, sortBy, and limit params from the request query. If no param is provided, set a default value param
		- `let limit = req.query.limit ? parseInt(req.query.limit) : 6`
		- On Product model, call find() method to find all the products, then call populate() method to populate the category property, then call sort() method to sort products by 'sortBy' and 'order', then call limit() method to set the number of products returned, lastly call exec() method to execute the callback function that has either the error or the products
			- If error, return a status code and a json response of the error message
			- If success, send a json response with the products: `res.json(products)`
		```javascript	
		Product.find()
		.select('-photo')
		.populate('category')
		.sort([[sortBy, order]])
		.limit(limit)
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error: 'Products not found'
				});
			}
			res.json(products);
		});
		```
- Test using Postman
	- Use **get** request with this url: `http://localhost:8000/api/products`
	- Request with params: `http://localhost:8000/api/products?sortBy=sold&order=desc&limit=4`

**2. Display related products**
- In routes/products.js file:
	- Create a route that fetch related products based on the product id
		- `router.get('/products/related/:productId', listRelated)`
		- Use **get()** method
	- Import listRelated method from controllers/products
- In controllers/product.js file:
	- Write a listRelated method that
		- finds the products based on the req product category
		- And other products that has the same category, will be returned
		- First, define the limit. Use the limit param from the request query, if given. Else set a default value param
		- `let limit = req.query.limit ? parseInt(req.query.limit) : 6;`
		- Next, on Product model, call find() method to find all the products in the category based on the product id EXCEPT the requested product itself. Then call limit() method to set the number of products returned, call populate() method to populate the category property, then lastly call exec() method to execute the callback function that has either the error or the products
			- If error, return a status code and a json response of the error message
			- If success, send json response with the products: `res.json(products)`
		```javascript
		Product.find({ _id: { $ne: req.product }, category: req.product.category })
		.limit(limit)
		.populate('category', '_id name')
		.exec((err, product) => {
			if (err) {
				return res.status(400).json({
					error: 'Products not found'
				});
			}
			res.json(products);
		});
		```
- Test using Postman
	- Use **get** request with this url: `http://localhost:8000/api/products/related/:productId`

**3. List product categories**
- In routes/products.js file:
	- Create a route that lists product categories
		- `router.get('/products/categories', listCategories);`
		- Use **get()** method
	- Import listCategories method from controllers/products
- In controllers/product.js file:
	- Write a listCategories method that lists all categories used on products
		- On Product model, call distinct() method to get the 'category' that is used on product model
		- Pass a callback function that has either the error or the categories
			- If error, return a status code and a json response of the error message
			- If success, send json response with the categories: `res.json(categories)`
- Test using Postman
	- Use **get** request with this url: `http://localhost:8000/api/products/categories`

**4. List products by search**
- In routes/products.js file:
	- Create a route that lists products based on search requirements
	- `router.post('/products/by/search', listBySearch)`
	- Use **post()** method
	- Import listBySearch method from controllers/products
- In controllers/product.js file:
	- We will implement product search in react frontend
	- We will show categories in checkbox and price range in radio buttons
	- We will make api request and show the products to users based on what the user wants
	- Write a listBySearch method that lists products by search
		- First, define the order, sortBy, limit, skip, and findArgs. Use the params from the request query if they are given. Else set a default value params
		- Second, look through the request body for the key and set it to the findArgs object
		- Then in Product model, use find() method to find products based on the findArgs object, call exec() method to execute the callback function that has either the error or the products
			- If error, return a status code and a json response of the error message
			- If success, send json response with the size of products and product details
- Test using Postman
	- Use **post** request with this url: `http://localhost:8000/api/products/by/search`

**5. Send a product photo**
- In routes/products.js file:
	- Create a route that displays product photo based on product id
	- `router.get('/poduct/photo/:productId', photo)`
	- Use **get()** method
	- Import photo method from controllers/products
- In controllers/product.js file:
	- Write a photo method that sends product photo
		- This method acts as middleware
		- Check to see if photo exists in req.product: `req.product.photo.data`
		- If it does, set the content-type of req.product to `req.product.photo.contentType`
		- Then send the product photo: `return res.send(req.product.photo.data)`
		- Cal next() method to move forward
- Test using Postman
	- Use **get** request with this url: `http://localhost:8000/api/product/photo/:productId`
	- Copy and paste this url in the browser to view the product image

**6. Read and update user profile**
- In routes/user.js file:
	- Create a route for user to read their profile
		- Add requireSignin and isAuth middlewares
		- Use **get()** method
		- `router.get('/user/:userId', requireSignin, isAuth, read)`
		- Import read method from controllers/user
	- Create a route for user to update their profile
		- Add requireSignin and isAuth middlewares
		- Use **put()** method
		- `router.put('/user/:userId', requireSignin, isAuth, update)`
		- Import update method from controllers/user
- In controllers/user.js file:
	- Write a read method that reads user profile based on the user id
		- Send a json response of the user profile from `req.profile`
		- However, don't send the hashed password and salt
	- Write an update method that updates the user profile base on the user id
		- On User model, call findOneAndUpdate() method to 
			- find the user by id
			- set the incoming data to request body
			- set new data to be true
			- a callback function that has either the error or the user
				- if error, return a status code of 400 and a json response of the error message
				- if success, set user hashed_password and salt to undefined, and send json response of the user
		```javascript
		exports.update = (req, res) => {
			User.findOneAndUpdate(
				{ _id: req.profile._id },
				{ $set: req.body },
				{ new: true },
				(err, user) => {
					if (err) {
						return res.status(400).json({
							error: 'You are not authorized to perform this action'
						});
					}
					user.hashed_password = undefined;
					user.salt = undefined;
					res.json(user);
				}
			);
		};
		```
- Test read user profile using Postman
	- Use **get** request with this url: `http://localhost:8000/api/user/:userId`
	- Make sure user is signed in
	- Make sure user is authenticated. Get the generated token
	- Then in Headers tab, set the Bearer token value to this token
- Test update user profile using Postman
	- Use **put** request with this url: `http://localhost:8000/api/user/:userId`
	- In Body tab, use raw json data format to update user info

**7. Install CORS**
- CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS for various options
- This way, our application will be able to handle requests coming from different routes/ports
- Install: `npm i cors`
- Import cors in app.js file: `const cors = require('cors')`
- Use the middleware: `app.use(cors())`


### REACT: REACT APP WITH PAGES AND LAYOUTS
**1. Create react app**
- At the root of project directory, run: `npx create-react-app react-frontend --use-npm`
- This will create a react application. Add the switch flag to ensure that it's using the npm package manager
- Go to the project directory: `cd react-frontend`
- Start the project: `npm start`




# LIBRARIES USED
- express, dotenv, nodemon
	- Install: `npm i express dotenv nodemon`
	- In package.json file, create a start script to use nodemon
		```
		"scripts": {
			"start": "nodemon app.js"
		}
		```
	- Import express in app.js file: `const express = require('express');`
- mongoose
	- Install: `npm install mongoose`
	- Import mongoose in app.js, models/ser.js files: `const mongoose = require('mongoose')`
- body-parser, cookie-parser, morgan
	- Install: `npm i body-parser cookie-parser morgan`
	- Import in app.js file:
		```js
		const morgan = require('morgan');
		const bodyParser = require('body-parser');
		const cookieParser = require('cookie-parser');
		```
- crypto and uuid
	- Install: `npm i crypto uuid`
	- Import in models/user.js file: `const crypto = require('crypto')`
	- Import in models/user.js file: `const { v4: uuidv4 } = require('uuid')`
- express-validator middleware
	- Install: `npm i express-validator@5.3.1`
	- Import in app.js file: `const expressValidator = require('express-validator');`
- express-jwt and jsonwebtoken
	- Install: `npm i express-jwt jsonwebtoken`
	- Import in controllers/auth.js file:
		- Import jwt. It's used to generate signed token: `const jwt = require('jsonwebtoken')`
		- Import expressJWT. It's used for authorization check: `const expressJWT = require('express-jwt')`
- formidable and lodash
	- Install: `npm i formidable lodash`
	- Import in controllers/product.js file:
		```js
		const formidable = require('formidable');
		const _ = require('lodash');
		```
- cors
	- CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS for various options. This way, our application will be able to handle requests coming from different routes/ports
	- Install: `npm i cors`
	- Import in app.js file: `const cors = require('cors')`



# VSCODE EXTENSIONS
- Auto Import
- Auto Rename Tag
- Bracket Pair Colorizer 2
- ESLint
- Javascript Debugger (Nightly)
- Material Icon Theme
- npm Intellisense
- Path Intellisense
- Prettier - Code Formatter
