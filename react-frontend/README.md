# STEPS TO BUILDING THE FRONTEND PORTION OF THIS ECOMMERCE APP WITH REACT

### REACT: REACT APP WITH PAGES AND LAYOUTS
**1. Create react app**
- At the root of project directory, run: `npx create-react-app react-frontend --use-npm`
- This will create a react application. Add the switch flag to ensure that it's using the npm package manager
- Go to the project directory: `cd react-frontend`
- Start the project: `npm start`
- In src/App.js file:
  ```javascript
  import React from 'react';

  const App = () => {
    return <div>Hello from React</div>;
  };

  export default App;
  ```
- In src/index.js file:
  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';

  ReactDOM.render(<App />, document.getElementById('root'));
  ```

**2. Create user signin, signup, and home pages and implement routing**
- In src folder, create a folder called user
- Inside the user folder, create two files called Signup.js and Signin.js
- Note in React: capitalized first letter of a file name means that it's a component
- In Signup.js file:
  - Import React: `import React from 'react'`
  - Write a Signup functional component that returns a text says 'signup'
  - Export the component: `export default Signup`
- In Signin.js file:
  - Import React: `import React from 'react'`
  - Write a Signin functional component that returns a text says 'signin'
  - Export the component: `export default Signin`
- In src folder, create a folder called core. Inside core folder, create a file called Home.js
- In Home.js file:
  - Import React: `import React from 'react'`
  - Write a Home functional component that returns a text says 'Home'
  - Export the component: `export default Home`
- Implement routing
  - Install in react-frontend directory: `npm i react-router-dom`
  - In src folder, create a file called Routes.js
  - In Routes.js file:
    - Import React: `import React from 'react'`
    - Import BrowserRouter, Switch, Route components: `import {BrowserRouter, Switch, Route} from 'react-router-dom'`
    - Import Signup component: `import Signup from './user/Signup'`
    - Import Signin component: `import Signin from './user/Signin'`
    - Import Home component: `import Home from './core/Home'`
    - Write a Routes functional component that renders the routes for user signup, signin, and home pages
    ```javascript
    const Routes = () => {
      return (
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signin' exact component={Signin} />
            <Route path='/signup' exact component={Signup} />
          </Switch>
        </BrowserRouter>
      );
    };
    ```
    - Export the component: `export default Routes`
  - In index.js file, render the Routes component instead of the App component:
    - Import Routes component: `import Routes from './Routes'`
    - `ReactDOM.render(<Routes />, document.getElementById('root'));`
  - Test routes in the browser with these url:
    - Home page: `http://localhost:3000`
    - Signin page: `http://localhost:3000/signin`
    - Signup papge: `http://localhost:3000/signup`

**3. Style the application using Bootstrap**
- Bootstrap website: getbootstrap.com
- Get the CSS CDN link and paste it in public/index.html file

**4. Menu and active links**
- In core folder, create a file called Menu.js
- In Menu.js file:
  - Import React: `import React from 'react'`
  - Import Link and withRouter components: `import {Link, withRouter} from 'react-router-dom'`
  - Write a Menu functional component that renders a link list for home, signup, and signin
    - Use ul and li elements to create the menu list
    - Use Link component to create the links with a given path
    - Use Bootstrap to style the menu list
  - Export the component with withRouter: `export default withRouter(Menu)`
  - withRouter allows us to access props history
- In Routes.js file:
  - Import Menu component: `import Menu from './core/Menu'`
  - Render the Menu component just above the Switch component: `<Menu />`
- Implement active links
  - In Menu.js file:
    - Write a helper function called isActive that checks to see if the current path matches the path in props history. If it matches, the link is active and make the text color orange, else make the text link white
      - It takes two arguments, history and path
      ```javascript
      const isActive = (history, path) => {
        if (history.location.pathname === path) {
          return { color: '#ff9900' };
        } else {
          return { color: '#ffffff' };
        }
      };
      ```
    - Call this helper function on each of the link list: 
      - Destructure history from props.history
      - Pass history as first argument
      - Pass the Link path property as second argument
      - `style={isActive(history, '/signup')}` 

**5. Shared Layout component**
- This Layout component contains the Menu component, title, and description
- This component can be used in other components
- In core folder, create a file called Layout.js
- In Layout.js file:
  - Write a Layout functional component that
    - takes these arguments: title, description, className, children
    - and renders the title, description and children
    - Use Bootstrap to style the component
  - Render the Menu component
    - Import Menu component: `import Menu from './Menu'`
    - Render the Menu component first thing: `<Menu />`
    - And remove the Menu component from Routes.js component
- To use this component:
  - Import the Layout component
  - Render the component: `<Layout title='...' description='...' >...</Layout>`
- Use this component in Home.js, Signin.js, Signup.js components
  ```javascript
  const Signup = () => (
    <Layout title='Signup' description='Signup to Node React E-commerce App'>
      ...
    </Layout>
  );
  ```

**6. Create environment variables**
- Install dotenv: `npm i dotenv`
- At the root of react-frontend directory, create a file called .env
- In .env file: 
  - This environment variable holds the value of the backend api
- In src folder, create a file called config.js
  - `export const API = process.env.<the url>;`
  - Now can use this API anywhere else
- In Signup.js file:
  - Import the API: `import {API} from '../config'`


### REACT: USER SIGNUP AND SIGNIN
**1. Create Signup form and handle change**
- In Signup.js file:
  - Inside the Signup component, write a signUpForm function that renders the signup form
    - The form should have a name, email, and password input fields, and a submit button
    - Use Bootstrap to style the form
  - Render this form in the Layout component: `{signUpForm()}`
  - Next, we need to grab the values from the input fields and store them in a component state. Then send the state to the backend so we can create a new user
  - Create state
    - Import useState from react: `import React, {useState} from 'react'`
    ```javascript
    const [values, setValues] = useState({
      name: '',
      email: '',
      password: '',
      error: '',
      success: false
    });
    ```
  - Write a handleChange HOF that updates the state whenever the input value of form changes
    ```javascript
    // handleChange is a HOF that returns another function
    // The value we pass in for name is either name, email, or password
    // On handleChange, we want to set the value state
    // The value for [name] is dynamically generated depending on where it's coming from
    const handleChange = name => event => {
      setValues({...values, error: false, [name]: event.target.value})
    }
    ```
    - Call this handleChange function on onChange event in the input fields and pass in the appropriate name to the function
    - `<input onChange={handleChange('password')} type='password' className='form-control' />`

**2. User signup**
- In Signup.js file:
  - When the form submit button is clicked, the user data (name, email, password) is sent to the backend to create a new user
  - Write a clickSubmit method that executes the signup() method which receives the user's data (name, email, and password) as arguments
  ```javascript
	const clickSubmit = (event) => {
		// Prevent default behavior of reload of the browser when the button is clicked
		event.preventDefault();
		// The data we send is an object
		signup({ name, email, password });
	};
  ```
  - Write a signup method that sends the data to backend to create a new user
  ```javascript
  // Note: user is an object received from clickSubmit() method
	const signup = (user) => {
		// console.log(name, email, password);
		return fetch(`${API}/signup`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
			.then((response) => {
				return response.json();
			})
			.catch((err) => {
				console.log(err);
			});
  };
  ```
- Check to see if a new user has been successfully created in mongoDB database

**3. User signup success and error handling**
- In Signup.js file:
  - When form submit button is clicked, we send the data to backend to create a new user using the signup() method
  - This is an async operation. The data we get back is either an error or a success
  - If it's an error, set error property state to the data.error we get back and set success state to false
  - If it's a success, clear the form input fields and set success state to true
  ```javascript
  const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false });
		signup({ name, email, password }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, success: false });
			} else {
				setValues({
					...values,
					name: '',
					email: '',
					password: '',
					error: '',
					success: true
				});
			}
		});
	};
  ```
- Write a showError function to display the error 
  ```javascript
	const showError = () => (
		<div
			className='alert alert-danger'
			style={{ display: error ? '' : 'none' }}
		>
			{error}
		</div>
	);
  ```
  - Render it inside the Layout component: `{showError()}`
- Write a showSuccess function that lets user know they've successfully signup
  ```javascript
  const showSuccess = () => (
		<div
			className='alert alert-info'
			style={{ display: success ? '' : 'none' }}
		>
			New account is created. Please <Link to='/signin'>Signin</Link>
		</div>
  );
  - Use Link to create a link to Signin page
  - Render it inside the Layout component: `{showSuccess()}`

**4. Signup - refactor code**
- Move authentication matters to its own folder
- In src folder, create a folder called auth
- In auth folder, create a file called index.js
- In index.js file:
  - Move the signup method from Signup.js file
  - Don't forget to export the method
  - Import the API: `import { API } from '../config';`
- Use the signup method in Signup.js functional component
  - Import signup: `import {signup} from '../auth'`

**5. Implement user signin**
- Code for user signin is very similar to code for user signup. We only need user email and password to signin. We also need to display loading progress
- In auth/index.js file:
  - Write a signin method that sends the data (email and password) to the backend
  - Very similar to signup method
- In Signin.js file
  - Create state with these properties: email, password, error, loading, redirectToReferrer
    - Use useState() react hook
  - Create a signInForm that displays email and password input fields and a submit button
  - Write a handleChange HOF method that updates the state with the new input values
  - Write a clickSubmit method that executes the signin() which receives the email and password data
  - Import the signin method from auth/index.js and run this method when the submit button is clicked
    - This method sends the data to the backend
    - And it's an async operation, so we'll get back either an error data or a success
    - If it's an error, set the error property state to data.error and display the error message
    - If it's successful, set the redirectToReferrer property state to true and redirect user
  - Write a showError method that displays the error message
  - Write a showLoading method that displays 'Loading...' when data is being sent to backend
  - Write a redirectUser method that redirects the user if they've successfully signed in
    - Do this by checking if redirectToReferrer is set to true
    - Use the Redirect component that comes with react-router-dom
    ```javascript
    import { Redirect } from 'react-router-dom';
    const redirectUser = () => {
      if (redirectToReferrer) {
        return <Redirect to='/' />;
      }
    };
    ```
  - Render the Layout component which contains the menu, page title and description

**6. Save user and token in local storage**
- If the user is successfully able to sign in, save the user data and token in local storage
- In auth/index.js file:
  - Write a authenticate method that saves the user data in local storage
    - It takes two arguments. The first is the data, the 2nd is a callback function
    ```javascript
    export const authenticate = (data, cb) => {
      // Check if we have the window object, because local storage is a property of the browser window object
      // If we do, we want to access the local storage
      if (typeof window !== 'undefined') {
        // Use setItem() method to save to local storage
        // 1st arg is the key
        // 2nd arg is the item you want to save
        // Make sure the data is saved as JSON data, use JSON stringify() method
        localStorage.setItem('jwt', JSON.stringify(data));
        // This callback function will execute after the data is saved to local storage
        cb();
      }
    }; 
    ```
- In Signin.js file:
  - Import the authenicate method: `import { authenticate } from '../auth'`
  - Inside the signin() method, if the user is successfully signed-in, call the authenticate() method to save the data in local storage
  - For 2nd arg callback function, set the redirectToReferrer property state to true. This will redirect user after the data is saved in local storage
- Check to see if user jwt is in local storage
  - In dev tools, click on Application tab. Click the localhost list under Storage section

**6. Implement user signout**
- Upon signing out,
  - remove user token from local storage
  - make request to backend so we're logged out
  - then redirect user to homepage
- In auth/index.js file:
  - Write a signout method that removes user token from localStorage, makes a request to backend to logout, and a callback function that executes to redirect user
  ```javascript
  export const signout = (cb) => {
    if (typeof window !== 'undefined') {
      // Pass in the key to remove an item from local storage
      localStorage.removeItem('jwt');
      cb();
      return fetch(`${API}/signout`, {
        method: 'GET'
      })
        .then((response) => {
          console.log('signout', response);
        })
        .catch((err) => console.log(err));
    }
  };
  ```
- In Menu.js file:
  - Import the signout method from auth/index.js: `import { signout } from '../auth';`
  - Create a signout item link
    - On click event, call the signout() method which takes a callback function
    - In this callback function, redirect user to homepage
    ```javascript
    onClick={() =>
      signout(() => {
        history.push('/');
      })
    }
    ```
- Check to see if the user jwt has been remove from local storage
  - In dev tools, click the Application tab and click on localhost under the Storage section on the left

**7. Conditionally show and hide signin signout**
- If the user is authenticated(signed in), hide signup and signin. Only show signout
- In auth/index.js file:
  - We need to access the user from the local storage
  - Write a isAuthenticated helpher method that returns true if the user is authenticated (jwt is in local storage), else returns false
  ```javascript
  export const isAuthenticated = () => {
    // Check if window object is undefined, return false
    if (typeof window == 'undefined') {
      return false;
    }
    // If we can get jwt from local storage, return the jwt in javascript form
    if (localStorage.getItem('jwt')) {
      return JSON.parse(localStorage.getItem('jwt'));
    } else {
      return false;
    }
  };
  ```
- In Menu.js file:
  - Import the isAuthenticated method: `import { signout, isAuthenticated } from '../auth'`
  - Write a condition that if the user is NOT authenticated, display the signup and signin links
    - Make sure to invoke the isAuthenticated method here
    - `{!isAuthenticated() && ( <render signup and signin links> )}`
  - Write a condition that if the user is authenticated, display the signout link
    - Make sure to invoke the isAuthenticated method
    - `{isAuthenticated() && ( <render signout link> )}`


### REACT: PRIVATE AND ADMIN ROUTE WITH USER DASHBOARD
**1. Private route for authenticated users only**
- In src/user folder, create a file called UserDashboard.js
- In UserDashboard.js file:
  - Import react: `import React from 'react'`
  - Import Layout component: `import Layout from '../core/Layout'`
  - Write a Dashboard functional component
    - Render the Layout component
- In Menu.js file:
  - Create a Dashboard item link right after Home link
- This Dashboard route is different from other routes. Only a user who is authenticated will be redirected (redirect auth concept) to the Dashboard route
- To do this, we first need to create a private route component
- In src/auth folder, create a component/file called PrivateRoute.js
- In PrivateRoute.js file:
  - Import react and react component: `import React, {Component} from 'react'`
  - Import Route and Redirect from router-dom: `import { Route, Redirect } from 'react-router-dom'`
  - Import isAuthenticated function: `import {isAuthenticated} from './index'
  - The isAuthenticated function will check for the authenticated user. If we have the user, we get the user information from the local storage
  - Write a PrivateRoute functional component that
    - takes the react Component and the rest of the props as arguments
    - returns the Route
      - In this Route component, first grab the rest of the props
      - then check to see if the user is authenticated by calling the isAuthenticated method
      - if user is authenticated, return the Component with the rest of the props
      - otherwise, redirect them to signin page
    ```javascript
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: '/signin', state: { from: props.location } }}
            />
          )
        }
      />
    );
    ```
- In Routes.js file:
  - Import the PrivateRoute component: `import PrivateRoute from './auth/PrivateRoute'`
  - Import the Dashboard component: `import Dashboard from './user/UserDashboard'`
  - To use the private route and Dashboard component: 
  - `<PrivateRoute path='/dashboard' exact component={Dashboard} />`
- Test in the browser
  - Click on Dashboard, if user is not authenticated, it will redirect them to signin page
  - Once the user is signed-in, they should have access to Dashboard page

**2. User Dashboard page**
- Display user information and purchase history in user dashboard page
- In src/user/UserDashboard.js file:
  - Import isAuthenticated method: `import { isAuthenticated } from '../auth'`
  - Render user information which we can get from the local storage with isAuthenticated()
    - `const {user: {_id, name, email, role}} = isAuthenticated()`
    - Show user name, email, and role as a list
  - Render purchase history
    - Show each purchase as a list
- Check if a user is authenticated and redirect them to either a user dashboard or admin dashboard based on their role
- In src/user/Signin.js file:
  - Import isAuthenticated method: `import { isAuthenticated } from '../auth'`
  - Destructure the user from isAuthenticated(): `const {user} = isAuthenticated()`
  - In redirectUser method, check the condition if the user is authenticated and if they're admin user
    - redirect them to admin dashboard page if their user role value is 1
    - else redirect them to registered user dashboard page
    ```javascript
    const redirectUser = () => {
      if (redirectToReferrer) {
        // Check if the user is authenticated and if they're admin user
        if (user && user.role === 1) {
          // Redirect to admin dashboard page
          return <Redirect to='/admin/dashboard' />;
        } else {
          // Redirect to registered user dashboard page
          return <Redirect to='/user/dashboard' />
        }
      }
    };
    ```
- In Routes.js file:
  - Change the path for user dashboard
  - `<PrivateRoute path='/user/dashboard' exact component={Dashboard} />`
- In Menu.js file:
  - Change the path for user dashboard to `'/user/dashboard'`

**3. Add links on user dashboard and reorganize code**
- In src/user/UserDashboard.js file:
  - Write a userLinks method that renders links for My Cart and Update Profile
    - Use Link from react-router-dom to create links: `import { Link } from 'react-router-dom'`
    - Make the links as a list
    - Call this userLinks() method in Layout component
  - Write a userInfo method that renders user info
    - Just move the user info div that's already written into this method
    - Call this userInfo() method in Layout component
  - Write a purchaseHistory method that renders purchase history info
    - Just move the purchase history div that's already written into this method
    - Call this purchaseHistory() method in Layout component
  - In the Layout component description, make a customized greeting with the user's name
    - `description={`Hello ${name}!`}`

**4. Create Admin Dashboard page**
- In src/user folder, create a file called AdminDashboard.js
- In AdminDashboard.js file:
  - Start by copying the code from UserDashboard.js component
  - Name this functional component AdminDashboard
  - Write an adminLinks method that renders links for Create Category and Create Product
    - The link path to Create Category is `to='/create/category'`
    - The link path to Create Product is `to='/create/product'`
    - Call this adminLinks() method in Layout component
  - Write an adminInfo method that renders admin info
    - Code is identical to userInfo
    - Call this adminInfo() method in Layout component
 
**5. Create private route for admin user**
- In src/auth folder, create a component/file called AdminRoute.js
- In AdminRoute.js file:
  - The code is very similar to PrivateRoute component. Start by copying the code from PrivateRoute.js component
  - Name this functional component AdminRoute
  - Here, we want to check if the user is authenticated AND also the user role value is 1. If it is, the user is an admin user
    - `isAuthenticated() && isAuthenticated().user.role === 1 ? (...) : (...)`
- In Routes.js file:
  - Import AdminRoute component: `import AdminRoute from './auth/AdminRoute'`
  - Import AdminDashboard component: `import AdminDashboard from './user/AdminDashboard'`
  - To use the admin route with the AdminDashboard component
    - `<AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />`
- In Menu.js file:
  - Write a conditional that takes the user to user dashboard if they're a user
    - `{isAuthenticated() && isAuthenticated().user.role === 0 && (<Link to='/user/dashboard'> ...)`
  - Write a conditional that takes the user to admin dashboard if they're an admin user
    - `{isAuthenticated() && isAuthenticated().user.role === 1 && (<Link to='/admin/dashboard'> ...)`
- In src/user/Signin.js file:
  - Inside redirectUser method, write a condition that checks if the user is already signed in, redirect the user to home page
  ```javascript
  if (isAuthenticated()) {
    return <Redirect to='/' />;
  }
  ```


### REACT: CATEGORIES AND PRODUCTS
**1. AddCategory component**
- In src folder, create a folder called admin
- In admin folder, create a component/file called AddCategory.js
- In AddCategory.js file:
  - Import react and useState hook : `import React, {useState} from 'react'`
  - Import Link : `import { Link } from 'react-router-dom'`
  - Import Layout component : `import Layout from '../core/Layout'`
  - Import isAuthenticated method: `import { isAuthenticated } from '../auth'`
  - Write a AddCategory functional component creates a new category
    - Create state using useState hook
      ```javascript
      const [name, setName] = useState('')
      const [error, setError] = useState(false)
      const [success, setSuccess] = useState(false)
      ```
    - Destructure user and token from localStorage
      - `const {user, token} = isAuthenticated()`
    - Create a form that creates a category. Write a newCategoryForm function that renders the form
      - the form has a label, input field and submit button
      - handleChange method is called when the value in input field is changing: `onChange={handleChange}`
      - clickSubmit method is called when the button is clicked: `<form onSubmit={clickSubmit}>`
    - Write a handleChange method that updates the name state to the value coming from the input
      ```javascript
      const handleChange = (e) => {
        setError('');
        setName(e.target.value);
      };
      ```
    - Write a clickSubmit method that makes a request to api to create category
    - Render the Layout component and execute the newCategoryForm function in Layout component
  - In Routes.js file:
    - Import the AddCategory component: `import AddCategory from './admin/AddCategory'`
    - Use the component in AdminRoute private route
      - `<AdminRoute path='/create/category' exact component={AddCategory} />`

**2. AddCategory - handling success and error from api request**
- In src/admin folder, create a method/file called apiAdmin.js
- In apiAdmin.js file:
  - Import the api: `import { API } from '../config'`
  - Write a createCategory method that makes api request to backend to create a new category with the name we have in the state
    - In the backend we need to send/pass in the userId, token, and category
    - Use fetch() method to make the request to this api: `${API}/category/create/${userId}`
    - The method is a POST method
    - In the headers, we also need to send the authorization token: `Authorization: `Bearer ${token}``
    - In the body, we stringify the category: `body: JSON.stringify(category)`
    ```javascript
    export const createCategory = (userId, token, category) => {
      return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
      })
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    ```
- In AddCategory.js file:
  - Import the createCategory method: `import { createCategory } from './apiAdmin'`
  - Call the createCategory method inside the clickSubmit function
    - Pass in the user id, token, and name of category coming from state
    - This is an async operation. So what we'll get back is the data, which containers either the error or the data info
    - if it's an error, set the error state to true
    - if it's a success, get error state to empty and set success state to true
    ```javascript
    createCategory(user._id, token, { name }).then((data) => {
			if (data.error) {
				setError(true);
			} else {
				setError('');
				setSuccess(true);
			}
    });
    ```
  - Next, write a showSuccess method that displays to the user that they've successfully create a category
    ```javascript
    const showSuccess = () => {
      if (success) {
        return <h3 className='text-success'>{name} is create</h3>;
      }
    };
    ```
  - Write a showError method that displays to the user the error message
  - Invoke the showSuccess() and showError() methods just above the newCategoryForm() method inside the Layout component
  - Write a goBack method that takes user back to admin dashboard
    - Create the link using Link from react-router-dom
    - Invoke the goBack method inside the Layout component
    ```javascript
    const goBack = () => (
      <div className='mt-5'>
        <Link className='text-warning' to='/admin/dashboard'>
          Back to Dashboard
        </Link>
      </div>
    );
    ```

**3. Create a new product**
- Write a method that makes api request to backend to create a new product
- In src/admin/apiAdmin.js file:
  - Write a createProduct method that makes api request to backend to create new product with the form data given
    - This method is very similar to the createCategory method
    - In the backend we need to send/pass in the userId, token, and product data form
    - Use fetch() method to make the request to this api: `${API}/product/create/${userId}`
    - The method is a POST method
    - The body is the product data form
- In src/admin folder, create a component/file called AddProduct.js
- In AddProduct.js file:
  - Import: `import React, { useState, useEffect } from 'react'`
  - Import: `import { Link } from 'react-router-dom'`
  - Import: `import Layout from '../core/Layout'`
  - Import: `import { isAuthenticated } from '../auth'`
  - Import: `import { createProduct} from './apiAdmin'`
  - Write an AddProduct functional component that creates a new product
    - Create state using useState hook
      ```javascript
      const [values, setValues] = useState({ object properties })
      ```
    - Destructure all the values of the state
      - `const {name, description, price, quantity, etc} = values`
    - Destructure user and token from localStorage
      - `const {user, token} = isAuthenticated()`
    - Create a newPostForm method that renders the product form
      - Create an input field that lets user upload a photo
        ```javascript
        <h4>Post Photo</h4>
        <div className='form-group'>
          <label className='btn btn-secondary'>
            <input onChange={handleChange('photo')} type='file' name='photo' accept='image/*' />
          </label>
        </div>
        ```
      - Create input fields for name, description, price, category, shipping, quantity
      - Add a submit button to create product
      - Call handleChange() method to update the values state when the input field changes
      - Call clickSubmit() method when the form button is clicked to submit the form
      - Render the newPostForm method in Layout component: `{newPostForm()}`
    - Write a handleChange Higher Order Function that updates the values state with the value coming from the input field
      - This function takes in the name value (name is a property of input field) and set the value for that specific property of values state
      - Name is the property of values state, such as name, description, price, photo, etc
      ```javascript
      const handleChange = (name) => (e) => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
      };
      ```
    - Next, we want to send the formData to the api. Now, we want that formData to be available as soon as the component mounts. So we can make use of the useEffect() hook
      - Call the useEffect() method that takes a function as the first argument
      - In this function, set the formData property state to `new FormData()`
      ```javascript
      useEffect(() => {
        setValues({ ...values, formData: new FormData() });
      }, []);
      ```
      - The useEffect() runs when the component mounts and anytime the values state changes
      - useEffect() is a replacement to lifecyle method that is used in class component
      - So when handleChange() method runs, we update the state and populate the formData as well
      - Everything in the state will go into the formData. And we send the formData to the backend to create a new product
      - In handleChange method, call set() method on formData to set the name and value
        - `formData.set(name, value);`
    - Write a clickSubmit method to send the data to api to create a product
      - Prevent the browser default behavior
      - Empty the error state if there's any and set loading state to true
      - Call the createProduct method to send the data to backend and handle success and error of the request
        - Pass in the user id, token, and formData
        - This is an async operation. So what we'll get back is the data, which contains either the error or the data info
        - if it's an error, set the error state to data.error
        - if it's a success, empty the form fields
        ```javascript
        const clickSubmit = (e) => {
          e.preventDefault();
          setValues({ ...values, error: '', loading: true });
          createProduct(user._id, token, formData).then((data) => {
            if (data.error) {
              setValues({ ...values, error: data.error });
            } else {
              setValues({
                ...values,
                name: '',
                description: '',
                photo: '',
                price: '',
                quantity: '',
                loading: false,
                createdProduct: data.name
              });
            }
          });
        };
        ```
- In Routes.js file:
  - Import the AddProduct component: `import AddProduct from './admin/AddProduct'`
  - Use the component in AdminRoute private route
    - `<AdminRoute path='/create/product' exact component={AddProduct} />`

**4. Create product with categories**
- When creating a new product, populate the list of categeories for users to pick
- Write a method that gets the categories from backend
- In src/admin/apiAdmin.js file:
  - Write a getCategories method that gets the categories from backend
  - Use fetch() method to make the request to this api: `${API}/categories`
  - The method is a GET method
  - This is an async operation. We'll get back either a response or an error. Handle both using the .then() and .catch() methods
  ```javascript
  export const getCategories = () => {
    return fetch(`${API}/categories`, {
      method: 'GET'
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };
  ```
- In AddProduct.js file:
  - Import the getCategories method: `import { getCategories } from './apiAdmin'`
  - When the component mounts in useEffect(), we need to get the categories from backend
  - Write an init method that loads categories and sets form data
    - Call the getCategories method, which we'll get back either the data or the error
      - This is an async operation. Use .then() method to handle the data returned
      - if it's an error, set error state to data.error
      - if it's a success, set categories state to data and set formData state to new FormData(). This makes formData ready to use as well
    ```javascript
    const init = () => {
      getCategories().then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, categories: data, formData: new FormData() });
        }
      });
    };
    ```
  - In the useEffect() callback function, call the init() method and nothing else
  - Now that categories state has the list of categories from the backend, we need to display them
    - In the form category section, first check to make sure there is categories and then loop through the categories state using map() method to display the category name in the option tag
    - Note that categories state is an array
    ```javascript
    {categories &&
      categories.map((c, i) => (
        <option key={i} value={c._id}>
          {c.name}
        </option>
      ))}
    ```
  - Display a message to user letting them know whether they have successfully created a product or not
    - Write a showError method that displays to the user the error message
    - Write a showSuccess method that displays the product is created
  - Write a showLoading method that displays Loading...
  - Call these three methods in Layout component

**5. Show products on home page sorted by popular(sell) and arrival**
- To display the products on home page, we first need to write a function that fetches the products from api
- In src/core folder, create a file called apiCore.js
- In apiCore.js file:
  - Write a getProducts method that gets the products from backend
    - Pass in sortBy as an argument
    - Use fetch() method to make the request to this api which contains parameter queries: `${API}/products?sortBy={sortBy}&order=desc&limit=6`
    - The method is a GET method
    - This is an async operation. We'll get back either a response or an error. Handle both using the .then() and .catch() methods
    ```javascript
    export const getProducts = (sortBy) => {
      return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET'
      })
        .then((response) => {
          return response.json();
        })
        .catch((err) => console.log(err));
    };
    ```
- In src/core/Home.js file:
  - Import getProducts method: `import { getProducts } from './apiCore'`
  - Import useState and useEffect: `import { useState, useEffect } from 'react'`
  - Create state that saves the products by sell and products by arrival, and the error
    ```javascript
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)
    ```
  - Write a loadProductsBySell method that loads products by sell
    - Call the getProducts() method and pass in 'sold' as the argument. This 'sold' is a property of product model
      - This is an async operation. So we'll get back either the data or the error
      - If it's an error, set the error state to data.error
      - If it's a success, set productsBySell state to the data
      ```javascript
      const loadProductsBySell = () => {
        getProducts('sold').then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setProductsBySell(data);
          }
        });
      };
      ```
  - Write a loadProductsByArrival method that loads products by arrival
    - Call the getProducts() method and pass in 'createdAt' as the argument. This 'createdAt' is a property of product model
      - This is an async operation. So we'll get back either the data or the error
      - If it's an error, set the error state to data.error
      - If it's a success, set productsByArrival state to the data    
  - Next, we want to call these two methods when the component mounts
  - Use useEffect() method and pass in a callback function as the first arg and an empty array as 2nd arg
    - This useEffect() method runs when the component loads for the first time and whenever there's a change in the state
    - Inside the callback function, call the loadProductsBySell() and loadProductsByArrival() methods
    ```javascript
    useEffect(() => {
      loadProductsBySell();
      loadProductsByArrival();
    }, []);
    ```

**6. Show products in card**
- In src/core folder, create a component/file called Card.js
- In Card.js file:
  - Write a Card component that displays a product
    - takes product as argument
    - displays product name, description, price, a link button to view product, and an add to cart button
- In src/core/Home.js file:
  - Import the Card component: `import Card from './Card'`
  - In Layout component,
    - loop through productsBySell (contains all the products from backend) using map() method and render each product in the Card component
    - pass product as props in Card component
    - do the same thing for productsByArrival
    - note that both productsBySell and productsByArrival are arrays
    ```javascript
    <h2 className='mb-4'>Best Sellers</h2>
    <div className='row'>
      {productsBySell.map((product, i) => (
        <Card key={i} product={product} />
      ))}
    </div>
    ```

**7. Show product image**
- In src/core folder, create a component/file called ShowImage.js
- In ShowImage.js file:
  - Import react: `import React from 'react'`
  - Import Link: `import { API } from '../config'`
  - Write a ShowImage component that displays the product image
    - it takes item and url as arguments
    - it renders an img element
    - the image source is: `src={`${API}/${url}/photo/${item._id}`}`
    - note that the route to get the photo is: `router.get('/product/photo/:productId', photo)`
    - hence the item = product, url = product
    ```javascript
    const ShowImage = ({ item, url }) => (
      <div className='product-Image'>
        <img
          src={`${API}/${url}/photo/${item._id}`}
          alt={item.name}
          className='mb-3'
          style={{ maxHeight: '100%', maxWidth: '100%' }}
        />
      </div>
    );
    ```
- Card.js file:
  - Import the ShowImage component: `import ShowImage from './ShowImage'`
  - Use the ShowImage component inside the card body just above the product description
    - pass in the item argument: `item={product}`
    - pass in the url argument: `url='product'`
    - `<ShowImage item={product} url='product' />`

**8. Styling buttons and jumbotron**
- src folder, create a file called styles.css
  - Remove border radius
  - Style jumbotron - page title and description section
- In src/core/Layout.js file:
  - Import styles sheet: `import '../styles.css'`


### REACT: SHOP PAGE WITH SEARCH FILTER BY CATEGORY AND PRICE RANGE
**1. Shop Component/Page**
- In src/core folder, create a component/file called Shop.js
- In Shop.js file:
  - Import react, useState, useEffect: `import React, { useState, useEffect } from 'react'`
  - Import Layout component: `import Layout from './Layout'`
  - Write a Shop functional component
    - Render the Layout component with page title and description
    - Render a left sidebar and right side for content
- In Routes.js file:
  - Import the Shop component: `import Shop from './core/Shop'`
  - Add a shop route that has the Shop component. Have this route just below the home route
    - `<Route path='/shop' exact component={Shop} />`
- In Menu.js file:
  - Add a shop list item in the menu navigation just below the home item. This should be a link that takes you to the shop page
  ```javascript
  <li className='nav-item'>
    <Link className='nav-link' style={isActive(history, '/shop')} to='/shop'>
      Shop
    </Link>
  </li>
  ```

**2. Get categories in shop page**
- We need to write a function that gets categories from backend. We've already written this function for Admin
- In src/core/apiCore.js file:
  - Make a copy of the getCategories method in apiAdmin.js file to apiCore.js file
- In src/core/Shop.js file:
  - Import the getCategories method: `import { getCategories } from './apiCore'`
  - Create a state to hold those categories and an error state
    - `const [categories, setCategories] = useState([])`
    - `const [error, setError] = useState(false)`
  - Next, write an init method that loads the categories when the component mounts
    - Call the getCategories method. This is an async operation. We'll get back is either the data or the error. Use then() method on getCategories() to handle both
      - if error, set the error state to data.error
      - if success, set the categories state to data
      ```javascript
      const init = () => {
        getCategories().then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setCategories(data);
          }
        });
      };
      ```
  - Use the useEffect() method to load the categories
    - useEffect() takes a callback function as 1st arg, and an empty array as 2nd arg
    - In the callback function, call the init() method
    ```javascript
    useEffect(() => {
  		init();
    }, []);
    ```

**3. Show categories in shop sidebar**
- Create category checkbox in shop sidebar. We should create a Checkbox component so that when the checkbox is clicked, we can apply some logic to display the products
- In src/core folder, create a component/file called Checkbox.js
- In Checkbox.js file:
  - Import react, useState, and useEffect: `import React, { useState, useEffect } from 'react'`
  - Write a Checkbox functional component that
    - accepts categories as props from Shop component. Destructure categories as parameter
    - returns the list of categories that's coming from the Shop component. Remember that Shop component has categories state and it fetches list of categories from backend
      - to render the categories in a list, call .map() method on categories to loop through the array list
      - each list item has an input type of checkbox and a label of category name
    ```javascript
    const Checkbox = ({ categories }) => {
      return categories.map((c, i) => (
        <li className='list-unstyled'>
          <input type='checkbox' className='form-check-input' />
          <label className='form-check-label'>{c.name}</label>
        </li>
      ));
    };
    ```
- In Shop.js file:
  - Import the Checkbox component: `import Checkbox from './Checkbox'`
  - In the shop left sidebar, render the Checkbox component and pass in categories from state as props
    - since the categories list is rendered as a list item, we need to wrap the Checkbox component in an unordered list tag
    ```javascript
    <ul>
      <Checkbox categories={categories} />
    </ul>
    ```
    - add an h4 header that says "Filter by categories"

**4. Handle categories toggle in Checkbox component**
- When a user checks for one or more categories in the shop page, we want to use a method that gets all the categories id, put them in an array and send it to the backend so we can get all the products based on those categories
- In src/core/Checkbox.js file:
  - Create a state that saves the checked list
    - `const [checked, setChecked] = useState([])`
  - When the category checkbox input field changes, handleToggle() method is called that takes the category id 
    - `<input onChange={handleToggle(c._id)} type='checkbox' className='form-check-input' />`
  - Write a handleToggle Higher Order Function that
    - takes a category id as an argument
    - so first, it checks to see if this category (based on the category id) is already in the checked state. So checked is going to be an array
      - use .indexOf() method on the checked array to find the category with the category id
      - the .indexOf() method will return the first index at which a given element can be found in the array. If it's not found in the checked state, then it will return -1
      - `const currentCategoryId = checked.indexOf(c._id)`
    - next, return all the categories in the checked state
      - `const newCheckedCategoryId = [...checked]`
    - next, write a condition that if currently checked was not already in checked state (returned -1), then push the category to the checked state. Else if the category is unchecked, remove the category from the newCheckedCategoryId array
      - use push() method on newCheckedCategoryId to add the category: `newCheckedCategoryId.push(c)`
      - use splice() method on the newCheckedCategoryId to remove the category from the array: `newCheckedCategoryId.splice(currentCategoryId, 1)`
    - lastly, call setChecked method to update checked state with newCheckedCategoryId array
      - `setChecked(newCheckedCategoryId)`
    ```javascript
    // This method takes the category id as an argument
    const handleToggle = c => () => {
      // The indexOf() method will return the first index or -1
      const currentCategoryId = checked.indexOf(c._id)
      // An array that has all the categories from checked state
      const newCheckedCategoryId = [...checked]
      // If currently checked was not already in checked state, push the category to newCheckedCategoryId
      // Else if it's unchecked, remove from newCheckedCategoryId
      if (currentCategoryId === -1) {
        newCheckedCategoryId.push(c)
      } else {
        newCheckedCategoryId.splice(currentCategoryId, 1)
      }
      // Set checked state to newCheckedCategoryId
      setChecked(newCheckedCategoryId)
    }
    ```
  - In the checkbox input field, set the value based on the checked state for that category
    - if the category is not in checked state, then the checkbox is not checked
    - if the category is in checked state, then the checkbox is checked
    - `value={checked.indexOf(c._id === -1)}`

**5. Passing categories filter to parent Shop component**
- Checkbox is a child component of Shop component
- In Checkbox component, we're grabbing the filtered/checked category ids and now we want to send that list to the Shop component
- Because it's the Shop component that makes request to the backend to get the products based on the filters
- To send the categories id list, we need to write a method in Shop component and pass it down to Checkbox as props
- In Shop.js file:
  - Write a handleFilters method that handles the incoming filters from child components
    - This method expects 2 arguments: filters and filterBy
    - In this case, filters is the category ids and filterBy is either by price or by category
    ```javascript
    const handleFilters = (filters, filterBy) => {
      console.log('Shop', filters, filterBy);
    };
    ```
  - Pass the handleFilters method down to Checkbox component as props. Also pass down the 2 arguments in handleFilter
    - `<Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />`
- In Checkbox.js file:
  - In the Checkbox component, accept the handleFilters props and destructure the props name in the argument: `const Checkbox = ({categories, handleFilters}) => { ... }`
  - Next, in the handleToggle() method, call the handleFilters() method and pass in the newCheckedCategoryId as argument. This will send the checked category ids to the parent component

**6. Set filters with category**
- Store the filters in a state in Shop component
- The filters is an object that contains category and price array
- Once we populate the category and price arrays with the criterias we want, we will send this filters object to the backend 
- In Shop.js file:
  - Create a myFilters state that stores all the filters. myFilters is an object
    - In it, contains filters object property which has category array and price array
    ```javascript
    const [myFilters, setMyFilters] = useState({
      filters: { category: [], price: [] }
    });
    ```
  - In handleFilters() method
    - First, grab myFilters state (an object) and assign it to a variable: `const newFilters = {...myFilters}`
    - Next, we need to filter by category
      - in the filters object, we want to populate the category array with category ids
      - so we access the filters object by using the dot notation on newFilters and set the price or category, which is coming in as 'filterBy' argument
      - assign this value to filters. This will update the filters object
      - `newFilters.filters[filterBy] = filters`
    - Then call setMyFilters() and pass in newFilters to update myFilters state 
      - `setMyFilters(newFilters)`
    ```javascript
    const handleFilters = (filters, filterBy) => {
      // console.log('Shop', filters, filterBy);
      const newFilters = { ...myFilters };
      newFilters.filters[filterBy] = filters;
      setMyFilters(newFilters);
    };
    ```

**7. Create fixed price range list**
- Push the price array to the filters object
- But first we need to create a fixed price range array for users to select
- In src/core folder, create a file called fixedPrices.js
- In fixedPrices.js file:
  - Create a prices array which contains objects of price range
  - Don't forget to export the file
- In Shop.js file:
  - Import the prices array: `import { prices } from './fixedPrices'`

**8. Show radiobox price range in shop sidebar**
- Just like categories checkbox, create price range radiobox in shop sidebar. We should create a RadioBox component so that when the radiobox is clicked, we can apply some logic to display the products according to the price range
- In src/core folder, create a component/file called RadioBox.js
- In RadioBox.js file:
  - Import react, useState, useEffect, and Fragment: `import React, { useState, useEffect, Fragment } from 'react'`
  - Write a RadioBox functional component that
    - accepts prices as props from Shop component. Destructure prices as parameter
    - create a state that stores the value and initialize it to 0
      - `const [value, setValue] = useState(0)`
    - returns the list of prices that's coming from Shop component as props
      - to render the price range list, call .map() method on prices to loop through the array list
      - each item has an input type of radio and a label of price name, which is the price range
    ```javascript
    const RadioBox = ({ prices }) => {
      const [value, setValue] = useState(0);
      
      const handleChange = () => {
        //
      };

      return prices.map((p, i) => (
        <div key={i}>
          <input
            onChange={handleChange}
            type='radio'
            value={`${p._id}`}
            className='mr-2 ml-4'
          />
          <label className='form-check-label'>{p.name}</label>
        </div>
      ));
    };
    ```
- In Shop.js file:
  - Import the RadioBox component: `import RadioBox from './RadioBox'`
  - In the shop left sidebar, render the RadioBox component and pass in prices as props
    - add an h4 header that says "Filter by price range"
    ```javascript
    <h4>Filter by price range</h4>
    <div>
      <RadioBox
        prices={prices}
        handleFilters={(filters) => handleFilters(filters, 'price')}
      />
    </div>
    ```

**9. Filter by price range**
- HandleChange on RadioBox component
  - When a user clicks on a price range in the shop page, we want to use a method that sends this price range (event.target.value) to the parent component and also update the value state in the RadioBox component
- In Shop.js file:
  - Pass the handleFilters method down to RadioBox component as props. Also pass down the 2 arguments in handleFilter
    - `<RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />`
- In RadioBox.js file:
  - In the RadioBox component, accept handleFilters props from Shop component and destructure the props name in the argument: `const RadioBox = ({prices, handleFilters}) => { ... }`
  - Next, in the handleChange() method,
    - first, accept event as an argument
    - next, call the handleFilters() method and pass in the event.target.value as argument. This will send the event.target.value to the parent component
    - and lastly, update the value state by calling the setValue() method and pass in the event.target.value
  - Unlike 'filter by categories' where multiple categories can be selected, only on price range can be selected for 'filter by price range'
    - In the input field for price, add name property and set its value to price: `name={price}`. This ensures that only one price range is selected and only one item is added to the price array state
  - However, we currently are only grabbing the key out of the prices array(fixedprices.js). We want to get the 'array' value out of the key 
    - We can handle this in the handleFilters() method in the Shop component
    - Before doing that, first write a handlePrice() method that will extract the 'array' value out of the key
      - this method takes value as an argument, which is the value stored in filters
      - grab the prices array and assign it to a variable called data
      - create an empty array, call it array
      - next, loop through data and check if the key _id value matches the value from filters. If true, get the key 'array' value and set it to array variable
      - then return the array, i.e [0,9]
      ```javascript
      const handlePrice = (value) => {
        const data = prices;
        let array = [];

        for (let key in data) {
          if (data[key]._id === parseInt(value)) {
            array = data[key].array;
          }
        }
        return array;
      };
      `` 
    - In the handleFilters() method,
      - write a condition that checks if filterBy is set to "price"
      - if true, call the handlePrice() method that accepts filtes as argument
      - assign the returned value to a variable called priceValues
      - also set the newFilters to priceValues
      ```javascript
      if (filterBy === 'price') {
        let priceValues = handlePrice(filters);
        newFilters.filters[filterBy] = priceValues;
      }
      ```
- Now when click on a price range, the corresponding array value (i.e [9,19]) should populate in the price state. And when click on one or multiple categories, the category ids is populated in the category state
- And so the filters object, which lists the filter category and price range, is filled out, we are ready to send the filters object to the backend to fetch the products based on those filters

**10. Show products by filter on shop page**
- Now that we have arrays of category and price, we are ready to make api request to backend to fetch filtered products
- In Shop.js file:
  - Write a loadFilteredResults method that loads the filtered products
    - It accepts newFilters, which is coming from the filters object of myFilters state
    - Console log newFilters to see what's being passed in to this function 
    - Leave empty for now
  - In handleFilters() method, call the loadFilteredResults() method and pass in myFilters.filters
- In apiCore.js file:
  - Write a getFilteredProducts method to fetch filtered products
    - It accepts skip, limit, and filters as arguments. Set these to be an empty object as default value
    - Use fetch() method to make the request to this api: `${API}/products/by/search`
    - The method is a POST method
    - Create a variable called data and set it to the argument object: `const data = {skip, limit, filters}`
    - In the body, give the data in json string format: `body: JSON.stringify(data)`
    ```javascript
    export const getFilteredProducts = (skip, limit, filters = {}) => {
      const data = { skip, limit, filters };
      return fetch(`${API}/products/by/search`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    ```
- In Shop.js file:
  - Import the getFilteredProducts method: `import { getFilteredProducts } from './apiCore'`
  - Create state for skip, limit, and filteredResults and initialize them
    - `const [limit, setLimit] = useState(6);`
	  - `const [skip, setSkip] = useState(0);`
    - `const [filteredResults, setFilteredResults] = useState([]);`
  - In the loadFilteredProducts() method, 
    - call the getFilteredProducts() method and pass in skip, limit, and newFilters
      - This is an async operation. We'll get back either the data or the error
      - Use .then() method to handle the data returned
      - if it's an error, set error state to data.error
      - if it's a success, set filteredResults state to data
    ```javascript
    const loadFilteredResults = (newFilters) => {
      // console.log(newFilters)
      getFilteredProducts(skip, limit, newFilters).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setFilteredResults(data);
        }
      });
    };
    ```
  - Render `filteredResults` to see the products
    - `<div className='col-8'>{JSON.stringify(filteredResults)}</div>`
  - Next, we want to load the products on the shop page when the component mounts and first renders
    - In the useEffect() callback function, call the loadFilteredResults() method and pass in skip, limit, and myFilters.filters as arguments
    ```javascript
    useEffect(() => {
      init();
      loadFilteredResults(skip, limit, myFilters.filters);
    }, []);
    ```
  - After this, user can use the left sidebar to filter products by categories and/or price range

**11. Pass products to Card component**
- Pass list of products from filteredResults to Card component in shop page
- In Shop.js file:
  - Import Card component: `import Card from './Card'`
  - Loop through filteredResults array to get each product item using map() method and pass product as props to Card component
  ```javascript
  <h4 className='mb-4'>Products</h4>
  <div className='row'>
    {filteredResults.map((product, i) => (
      <Card key={i} product={product} />
    ))}
  </div>
  ```
  - In loadFilteredResults method, make sure to setFilteredResults to data.data
    - `setFilteredResults(data.data)`
- The product description can be very long, so we can set a fixed length of characters using substring() method on product description
- In Card.js file:
  - `<p>{product.description.substring(0, 100)}</p>`

**12. Load more button**
- Create a 'load more' button in shop page to load more products
- In Shop.js file:
  - Create a state for size 
    - `const [size, setSize] = useState(0);`
  - In the loadFilteredResults method, when we get back the data, we also need to setSize and setSkip
  ```javascript
  ...
  } else {
    setCategories(data);
    setSize(data.size);
    setSkip(0);
  }
  ```
  - Next, write a loadMore method that fetches more products from backend based on filters
    - It doesn't take any arguments
    - Create a toSkip variable that contains the values of skip plus limit states
    - In the getFilteredProducts method,
      - it now takes toSkip, limit, myFilters.filters as arguments
      - in setFilteredResults method, we want to pass in the filteredResults and data.data using the spread operator in AN ARRAY
      - this way we can still have the current data, and add new data to filteredResults state using setFilteredResults()
      - setSize() to data.size
      - setSkip() to toSkip
    ```javascript
    const loadMore = () => {
      let toSkip = skip + limit;
      getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setFilteredResults([...filteredResults, ...data.data]);
          setSize(data.size);
          setSkip(toSkip);
        }
      });
    };
    ```
  - Write a loadMoreButton method that renders the 'load more' button
    - Check to see if size is greater than 0 and size is greater or equal to the limit value
    - If true, render more products when 'load more' button is clicked
    - onClick property, call the loadMore method
    ```javascript
    const loadMoreButton = () => {
      return (
        size > 0 &&
        size >= limit && (
          <button onClick={loadMore} className='btn btn-warning mb-5'>
            Load more
          </button>
        )
      );
    };
    ```
  - Render the loadMoreButton() method right after the list of products. Add a horizontal line above it as well
    ```javascript
    <hr />
    {loadMoreButton()}
    ```


### REACT: PRODUCTS SEARCH IN HOME PAGE
**1. Search component**
- In src/core folder, create a new component/file called Search.js
- In Search.js file:
  - Import React, useState, useEffect: `import React, { useState, useEffect } from 'react'`
  - Create a functional Search component. Render an h2 "Seach bar" text for now
    ```javascript
    const Search = () => {
      return (
        <div>
          <h2>Search bar</h2>
        </div>
      );
    };
    ```
  - Export the component: `export default Search;`
- In Home.js file:
  - Import the Search component: `import Search from './Search'`
  - Render the Search component as the first item in Layout component
- In Search.js file:
  - Create a state for data. Note that data is an object
    - In it, contains categories, category, search, results, and searched object properties
    ```javascript
    const [data, setData] = useState({
      categories: [],
      category: '',
      search: '',
      results: [],
      searched: false
    });
    ```
  - First thing we need to do is get all the categories from the backend
    - Import getCategories method: `import { getCategories } from './apiCore'`
    - Write a loadCategories method that loads the categories when the component mounts
      - Call the getCategories method. This is an async operation. We'll get back is either the data or the error. Use then() method on getCategories() to handle both
        - if error, console log the data error
        - if success, spread in the current data object and update categories property with the fetched data
      ```javascript
      const loadCategories = () => {
        getCategories().then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            setData({...data, categories: data})
          }
        });
      };
      ```
    - Use the useEffect() method to load the categories
      - useEffect() takes a callback function as 1st arg and an empty array as 2nd arg
      - In the callback function, call the loadCategories() method
      ```javascript
      useEffect(() => {
        loadCategories();
      }, []);
      ```
  - Next, destructure all the data object properties so we can use them
    - `const { categories, category, search, results, searched } = data;`
  - Lets test to see if we have categories in the state. Render categeories in json stringify form
    - `<h2>Search bar {JSON.stringify(categories)}</h2>`

**2. Search form**
- Create a search bar form
- In Search.js file:
  - Write a searchForm method that renders the search bar form
    - the form element has 
      - a select category drop-down menu option
      - a search input field
      - a search button  
    - handleChange method is called when a category is selected from the drop-down menu: `onChange={handleChange('category')}`
    - handleChange method is called when the value in search input field is changing: `onChange={handleChange('search')}`
    - searchSubmit method is called when the search button is clicked: `<form onSubmit={searchSubmit}>`
    - finally, render the searchbar by calling the searchForm() method inside a div element in the Search component
      - `<div className='container mb-3'>{searchForm()}</div>`
    ```javascript
    const searchForm = () => (
      <form onSubmit={searchSubmit}>
        <span className='input-group-text'>
          <div className='input-group input-group-lg'>
            <div className='input-group-prepend'>
              <select className='btn mr-2' onChange={handleChange('category')}>
                <option value='All'>Pick Category</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type='search'
              className='form-control'
              onChange={handleChange('search')}
              placeholder='Search by name'
            />
          </div>

          <div className='btn input-group-append' style={{ border: 'none' }}>
            <button className='input-group-text'>Search</button>
          </div>
        </span>
      </form>
    );
    ```

**3. Implementing search**
- In Search.js file:
  - Write an HOF(Higher Order Function) handleChange method to update the data state with the event input values
    - it takes the argument name. This name could be 'category' or 'search'
    - 'category' and 'search' are properties of data object
    - call setData() to set the current data, set whatever the name may be to event.target.value, and lastly set searched property to false
    - for example, if name is 'search', then the value for search property is the value coming from the search input field that the user types in
    - if name is 'category', then the value for category property is the category id that the user selects
    ```javascript
    const handleChange = (name) => (event) => {
      setData({ ...data, [name]: event.target.value, searched: false });
    };
    ```
  - Write a searchSubmit method that executes the searchData() method to make a request to backend to fetch the products
    ```javascript
    const searchSubmit = (e) => {
      e.preventDefault();
      searchData();
    };
    ```
- We need to write a method that fetch the products from backend based on the 'category' and 'search' parameters
- In apiCore.js file:
  - Write a list method that gets the products from backend based on query parameters
    - It takes params as an argument. params are the 'category' id and the 'search' value the user types in the search bar
    - We need to use a query string library to help us turn the params into a usable query string in order to make the api request
      - Install query string library: `npm i query-string`
      - Import queryString in apiCore.js file: `import queryString from 'query-string'`
      - To use, call stringify() method on queryString and pass in params as argument
      - Assign this query string to a variable called query: `const query = queryString.stringify(params);`
    - Now, use fetch() method to make the request to this api which contains the queryString params: `${API}/products?${query}`
    - The method is a GET method
    - This is an async operation. We'll get back either a response or an error. Handle both using the .then() and .catch() methods
    ```javascript
    export const list = (params) => {
      const query = queryString.stringify(params);
      console.log('query', query);
      return fetch(`${API}/products/search?${query}`, {
        method: 'GET'
      })
        .then((response) => {
          return response.json();
        })
        .catch((err) => console.log(err));
    };
    ```
- In Search.js file:
  - Import the list method: `import { getCategories, list } from './apiCore'`
  - Write a searchData method that executes the list method to fetch products from backend based on query parameters
    - First check to see if the input value for search is provided. If true, execute the list() method
    - In list method,
      - it takes search and category as arguments
      - this is an async operation. We get back either a response or an error
      - if error, console log the error
      - if success, call setData() to update the data state. Set the current data, update results property to the response we get back, and update searched property to true
    ```javascript
    const searchData = () => {
      // console.log(search, category);
      if (search) {
        list({ search: search || undefined, category: category }).then(
          (response) => {
            if (response.error) {
              console.log(response.error);
            } else {
              setData({ ...data, results: response, searched: true });
            }
          }
        );
      }
    };
    ```

**3. Backend implementation of search**
- Pass list of products from results to Card component in home page
- In Search.js file:
  - Import Card component: `import Card from './Card'`
  - Write a searchedProducts method that displays list of products in Card component
    - it takes results as argument. Results contains list of products based on search query. Make results as an empty array by default
    - loop through the results array to get each product item using map() method and pass product as props to Card component
    ```javascript
    const searchedProducts = (results = []) => (
      <div className='row'>
        {results.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    );
    ```
  - Render the list of products by calling the searchedProducts() method inside a fluid container div element and pass in results as argument
    - `<div className='container-fluid mb-3'>{searchedProducts(results)}</div>`
- We need to implement backend for search:
  - In routes/products.js file, create a route that lists products based on search query params
  - In controllers/product.js file, write a listSearch method that finds products based on search query properties: search and category

**4. Search message to users**
- In Search.js file:
  - In searchedProducts method, we display the products in Card component, but we also want to display a message to users
    - Just above the products list, render the message by calling the searchMessage() method and pass in searched and results as the two arguments
  - Write a searchMessage method
    - it takes searched and results as two arguments
    - write a condition to check if searched is true AND results.length array is greater than 0
      - if true, return the message with that number of products from results found
    - write a condition to check if searched is true AND results.length array is less than 1
      - if true, return the message that no product is found
    ```javascript
    const searchMessage = (searched, results) => {
      if (searched && results.length == 1) {
        return `Found ${results.length} product`;
      }
      if (searched && results.length > 0) {
        return `Found ${results.length} products`;
      }
      if (searched && results.length < 1) {
        return `No products found`;
      }
    };
    ```


### REACT: PRODUCT PAGE WITH RELATED PRODUCTS
**1. Single product component**
- When a user clicks on "View Product" button, it'll take them to a single product page to view the detail of that product
- In src/core folder, create a component/file called Product.js
- In Product.js file:
  - Import React, useState, and useEffect: `import React, { useState, useEffect } from 'react'`
  - Import Layout component: `import Layout from './Layout'`
  - Write a functional Product component
    - Render the content in the Layout component
- In src/Routes.js file:
  - Import the Product component: `import Product from './core/Product'`
  - Add a product route that has the Product component
    - The path contains the product id
    - `<Route path='/product/:productId' exact component={Product} />`
- Next, we need create a link in the Card component that directs users to the Product page when they click the "View Product" button
- In Card.js file:
  - Make the path of the Link component go to the Product page
    - `<Link to='/product/${product._id}'>`
  - Now when the "View Product" button is clicked, it should direct user to the single Product page
  - Note that the URL of the Product page has the product id
- Next step is to take the product id (from the route parameter which is the URL) to make an api request to the backend to get this particular product
- So first we want to grab the product id from the URL and make it available as soon as the component mounts and first time it renders. We do this using useEffect() hook
- In Product.js file:
  - Create states for product and for error. Initialize both states
    - `const [product, setProduct] = useState({})`
    - `const [error, setError] = useState(false)`
  - Use useEffect() method to get the product id from the URL and execute the loadSingleProduct() method with that product id
    - This method takes a callback function as 1st arg and an empty array as 2nd arg
    - Inside the callback function, first get the product id from the URL and save it to a variable called productId
    - Then call the loadSingleProduct() method and pass in the productId as argument
    - In the Product component don't forget to accept 'props' as argument
    ```javascript
    useEffect(() => {
      const productId = props.match.params.productId;
      loadSingleProduct(productId);
    }, []);
    ```
  - Next, write a loadSingleProduct method that loads the product from backend when the component mounts
    - It takes productId as argument
    - Leave the function body empty for now
- In src/core/apiCore.js file:
  - Write a read method that fetches a product based on a given product id from backend
    - It takes productId as an argument
    - Use fetch() method to make the request to this api: `${API}/product/${productId}`
    - The method is a GET method
    - This is an async operation. We'll get back either a response or an error. Handle both using the .then() and .catch() methods
    ```javascript
    export const read = (productId) => {
      return fetch(`${API}/product/${productId}`, {
        method: 'GET'
      })
        .then((response) => {
          return response.json();
        })
        .catch((err) => console.log(err));
    };
    ```
- Back in Product.js file:
  - Import the read method: `import { read } from './apiCore'`
  - In the loadSingleProduct method,
    - execute the read() method and pass in the productId as argument
    - this is an async operation which we'll get back either the data or the error. Use .then() method to handle the data returned
    - if error, set error state to data.error
    - if success, set product state to data
    - 
    ```javascript
    const loadSingleProduct = (productId) => {
      read(productId).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProduct(data);
        }
      });
    };
    ```

**2. Reuse Card component for single product**
- In Product.js file:
  - Show the page title & description as the product name & description
  - In Layout component,
    - set title property to product name: `title={product && product.name}`
    - set description property to shortened product description: `description={product && product.description && product.description.substring(0, 100)}`
    - check to make sure we have the product first before rendering the product title and description
  - Render the Card component inside the Layout component
    - first check to make sure we have the product and product description before rendering the Card
    - pass in product as props in Card component: `<Card product={product} />`
  ```javascript
  <Layout
    title={product && product.name}
    description={
      product && product.description && product.description.substring(0, 100)
    }
    className='container-fluid'
  >
    <div className='row'>
      {product && product.description && <Card product={product} />}
    </div>
  </Layout>
  ```
- Next we need to adjust the grid layout for Card component so it can be used in multiple places
  - In Card.js file:
    - Remove the div element with classnames: `<div className='col-4 mb-3'>`
    - Now the Card doesn't have any column width structure
  - In Home.js file:
    - Add a div element with classnames around the Card component: `<div key={i} className='col-4 mb-3'>`
    - Move the key from Card to the div element around it
    - Do this for Best Sellers and New Arrivals sections
  - In Shop.js file:
    - Repeat the same process from Home.js
- We don't want to show the "View Product" button in the single product page
- In Product.js file:
  - In the Card component, pass in another props called showViewProductButton and set it to false
- In Card.js file:
  - In the Card component, pass in showViewProudctButton as 2nd arg and set the default value to true: `const Card = ({ product, showViewProudctButton = true }) => {...}`
  - Let's extract the "View Product" button and the link into a separate function so we can show or hide this button when we want
  - Write a showViewButton method that renders the "View Product" button and link
    - it accepts showViewProductButton as argument
    - NOTE THAT THIS BUTTON AND LINK ONLY RENDERS IF `showViewProductButton` IS TRUE. AND BY DEFAULT, IT IS SET TO TRUE IN CARD COMPONENT
    ```javascript
    const showViewButton = (showViewProductButton) => {
      return (
        showViewProductButton && (
          <Link to={`/product/${product._id}`}>
            <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
              View Product
            </button>
          </Link>
        )
      );
    };
    ```
  - Call the showViewButton() method and pass in showViewProductButton as argument to render the "View Product" button: `{showViewButton(showViewProductButton)}`

**3. Product detail on single product page**
- In Card.js file:
  - Start by adding more custom styling to the product description and price
  - Add/show Category name
  - Add/show when the product was added
    - Use Moment library to generate the date format
    - Install this library in the 'react-frontend' directory: `npm i moment`
    - Import moment: `import moment from 'moment'`
    - To use: `Added on {moment(product.createdAt).fromNow()}`
  - Let's extract the "Add to cart" button into a separate function
  - Write a showAddToCart method that renders the "Add to cart" button
    ```javascript
  	const showAddToCart = () => {
      return (
        <button className='btn btn-outline-warning mt-2 mb-2'>Add to cart</button>
      );
    };
    ```
  - Call the showAddToCart() to render the button: `{showAddToCart()}`
  - Add/show the product stock. Write a function for this: `{showStock(product.quantity)}`
  - Write a showStock method that shows either the product is in stock or product is out of stock
    - this method takes quantity as argument
    - write a condition that checks if quantity is greater than 0, then display the text "In Stock". Else display text "Out of Stock"
    ```javascript
    const showStock = (quantity) => {
      return quantity > 0 ? (
        <span className='badge badge-primary pill'>In Stock</span>
      ) : (
        <span className='badge badge-primary badge-pill'>Out of Stock</span>
      );
    };
    ```
  - Lastly, add css style to product price, category name, and date added

**4. Show related products on single product page**
- We need to write a method that makes an api request to fetch related products from backend
- In apiCore.js file:
  - Write a listRelated method that fetches related products based on a given product id from backend
    - It takes productId as an argument
    - Use fetch() method to make the request to this api: `${API}/products/related/${productId}`
    - The method is a GET method
    - This is an async operation. We'll get back either a response or an error. Handle both using the .then() and .catch() methods
    ```javascript
    export const listRelated = (productId) => {
      return fetch(`${API}/products/related/${productId}`, {
        method: 'GET'
      })
        .then((response) => {
          return response.json();
        })
        .catch((err) => console.log(err));
    };
    ```
  - The way listRelated() method works is after the first product loads, it'll try to find related products based on the same category name. So if a product has React as its category, it will try to find products with React category as well
- In Product.js file:
  - Import the listRelated method: `import { listRelated } from './apiCore'`
  - Create a state for related product and initialize it with an empty array
    - `const [relatedProduct, setRelatedProduct] = useState([]);`
  - In loadSingleProduct method, we first fetch a product with the product id and save that product in product state. After this we want to fetch related products with the product id
  - In loadSingleProduct method,
    - right after calling setProduct(), call the listRelated() method
    - it takes data._id as argument
    - this is an async operation which we'll get back either the data or the error. Use .then() method to handle the data returned
    - if error, set error state to data.error
    - if success, set relatedProduct state to data
    ```javascript
    listRelated(data._id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setRelatedProduct(data);
      }
    });
    ```
  - Next, we want to display the related products in a 4-column grid next to the main product. The main product section is in an 8-column grid
    - Loop through the relatedProduct state using map() method to get each product item and display it in a Card component
    - Pass the product as props in the Card component
    ```javascript
    <div className='col-4'>
      <h4>Related Products</h4>
      {relatedProduct.map((p, i) => (
        <div className='mb-3'>
          <Card key={i} product={p} />
        </div>
      ))}
    </div>
    ```
  - The problem we have on single product page is when the user clicks on "View Product" button on Related Products section, it doesn't take them to the detail product page. It only updates the URL with the product id, but not the page content. To solve this problem, use useEffect() to update/render the page content whenever the URL query parameter changes
    - In useEffect() hook, pass in props array as 2nd argument
    ```javascript
    useEffect(() => {
      const productId = props.match.params.productId;
      loadSingleProduct(productId);
    }, [props]);
    ``

### REACT: CART CRUD WITH LOCALSTORAGE
**1. Implement 'Add to cart' functionality**
- When the user clicks "Add to cart" button, we want to save the product in the localStorage and display the "Cart" item in the navigation bar 
- In src/core folder, create a file called cartHelpers.js
- In cartHelpers.js file:
  - Write an addItem helper method that adds a product to localStorage
    - This method receives item and next as arguments
    - Create a cart variable and assign it to an empty array: `let cart = []`
    - Check to see if there's a window object (not undefined)
    - If there is a window object, check to see if we can get an item with the name 'cart' from the localStorage using the .getItem() method
    - If there is cart, then we want to populate the item to the cart variable. But first convert it from json string format to object format using JSON.parse()
    - This method receives 'item' as an argument. So we want to add this item to cart variable using the .push() method. When an item is added to cart, we also want to set count to 1
    ```javascript
    export const addItem = (item, next) => {
      let cart = [];

      if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
          cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
          ...item,
          count: 1
        });
      }
    };
    ```
    - The problem we now have is that when the user clicks on the product again, it will add the same product, the same instance, twice to the cart array. If the product is the same, we want to update the product's quantity, not duplicating the product.
    - For that, we need to run a function using the Array.from() method to create a new array and use `new Set()` method to remove duplicates (based on product id) in the array
      ```javascript
      // REMOVE DUPLICATES
      // - build an Array from new Set and turn it back into array using Array.from
      // - so that later we can re-map it
      // - new Set will only allow unique values in it
      // - so pass the ids of each object/product
      // - if the loop tries to add the same value again, it'll get ignored
      // - ...with the array of ids we got when first map() was used
      // - run map() on it again and return the actual product from the cart
      cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
        return cart.find((p) => p._id === id);
      });
      ```
    - After all this is done, we can set the cart back in localStorage using the .setItem() method
      - pass in the name 'cart' as 1st arg. This is the item name stored in the localStorage if we ever want to retrieve the item later
      - the 2nd arg is the cart array. But first we need to convert the array object to json string format using JSON.stringify() method
      - `localStorage.setItem('cart', JSON.stringify(cart));`
    - Last thing, we need to execute the next() function
    ```javascript
    export const addItem = (item, next) => {
      let cart = [];

      if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
          cart = JSON.parse(localStorage.getItem('cart'));
        }
        
        cart.push({
          ...item,
          count: 1
        });

        cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
          return cart.find((p) => p._id === id);
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
      }
    };
    ```
- In Card.js file:
  - Import the addItem method: `import {addItem} from './cartHelpers'`
  - Import Redirect component from react-router-dom: `import { Link, Redirect } from 'react-router-dom'`
  - Create a state for redirect and initialize it to false
    - `const [redirect, setRedirect] = useState(false)`
  - In the showAddToCart method, add an onClick event so that it will execute the addToCart method when the "Add to cart" button is clicked: `onClick={addToCart}`
  - Write an addToCart method that executes the addItem method, which adds the product to localStorage
    - This method doesn't take any arguments
    - Call the addItem() method
    - The addItem() method takes 2 arguments: the product and a callback function
    - So when we add the product to the localStorage, we want to set redirect state to true
    - In the callback function, use setRedirect() and pass in true
    ```javascript
    const addToCart = () => {
      addItem(product, () => {
        setRedirect(true);
      });
    };
    ```
  - If redirect state is true, we want to write a function that redirects user to the cart page
  - Write a shouldRedirect method that redirects to cart page
    - It takes redirect as argument
    - Write a condition that checks to see if redirect is true. If it is, the method returns with a Redirect component from react-router-dom and its path to the cart page
    ```javascript
    const shouldRedirect = (redirect) => {
      if (redirect) {
        return <Redirect to='/cart' />;
      }
    };
    ```
  - Call the shouldRedirect() method to render just above the ShowImage component
    - It takes redirect as an argument. SO THIS METHOD RENDERS ONLY IF THE REDIRECT STATE IS TRUE
    - In this case, when the "Add to cart" button is clicked, the addItem method is executed to add the product to localStorage and set the redirect state to true. Since redirect state is true, the shouldRedirect method runs and redirect to the cart page

**2. Show cart items total in menu**
- Add the cart link in the navigation and show the number of items in the cart
- In cartHelpers.js file:
  - Write an itemTotal method that returns the total items in the cart, the length of cart array
    - This method doesn't take any arguments
    - First, check to see if there's a window object (not undefined)
    - If there is a window object, check to see if we can get item from the name 'cart' in localStorage using the .getItem() method
    - If there is cart, then we want to return the total items, the length, of the cart. But first convert it from json string format to object format using JSON.parse()
    - If there is no item in the cart, we want to return 0 by default
- In core/Menu.js file:
  - Import the itemTotal method: `import { itemTotal } from './cartHelpers'`
  - Render a Cart nav link right after the Shop link
    - Use Link component from react-router-dom to create the link and point the path to cart page
  - Right next to the "Cart" text, execute the itemTotal() method and give it styling in style.css file
  ```javascript
  <li className='nav-item'>
    <Link className='nav-link' style={isActive(history, '/cart')} to='/cart'>
        Cart <sup><small className="cart-badge">{itemTotal()}</small></sup>
    </Link>
  </li>
  ```

**3. Show products in Cart page**
- Get all the product items from cart in localStorage and populate them in Cart page
- In cartHelpers.js file:
  - Write a getCart method that gets items from 'cart' in localStorage
    - This method doesn't take any arguments
    - First, check to see if there's a window object (not undefined)
    - If there is a window object, check to see if we can get item from the name 'cart' in localStorage using the .getItem() method
    - If there is cart, then we want to return with the item. But first convert it from json string format to object format using JSON.parse()
    - If there is no item in the cart, we want to return an empty array by default
    ```javascript
    export const getCart = () => {
      if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
          return JSON.parse(localStorage.getItem('cart'));
        }
      }
      return [];
    };
    ```
- Next, create the Cart page
- In src/core folder, create a component/file called Cart.js
- In Cart.js file:
  - Import react, useState, useEffect: `import React, { useState, useEffect } from 'react'`
  - Import Link component from react-router-dom: `import { Link } from 'react-router-dom'`
  - Import Layout component : `import Layout from './Layout'`
  - Import getCart method: `import { getCart } from './cartHelpers'`
  - Immport Card component: `import Card from './Card'`
  - Write a Cart functional component that renders cart items from the localStorage
    - Create a state for items and initialize it to an empty array
      - `const [items, setItems] = useState([])`
    - When the component mounts and first renders, we want to get cart items in localStorage by calling getCart() method and set it to items state. Use useEffect() hook to do this
      - useEffect() method takes a callback function as 1st arg, and an empty array as 2nd arg
      - In the callback function, call setItems() method and pass in the getCart() method to set items state with items coming from the localStorage
      ```javascript
      useEffect(() => {
        setItems(getCart());
      }, []);
      ```
  - Next, we want to display the list of items if there are items in shopping cart or display a message saying cart is empty if the items state has no items in it
  - Write a showItems method that displays how many items is in the cart and renders the list of items onto the Cart page
    - The method takes items as argument
    - Loop over items using .map() method and render each product in a Card component
    - Pass product as props in the Card component
    ```javascript
    const showItems = (items) => {
      return (
        <div>
          <h2>Your cart has {`${items.length}`} items</h2>
          <hr />
          {items.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      );
    };
    ```
  - Write a noItemsMessage method that displays cart is empty and include a link to Shop page
    ```javascript
    const noItemsMessage = () => (
      <h2>
        Your cart is empty. <br /> <Link to='/shop'>Continue shopping</Link>
      </h2>
    );
    ```
  - Write a condition that checks if items state is greater than 0. If it is, call the showItems() method and pass in items to render the products. If it isn't, call the noItemsMessage() method to render the message
    ```javascript
    <div className='col-6'>
      {items.length > 0 ? showItems(items) : noItemsMessage()}
    </div>
    ```
- In Routes.js file:
  - Import the Cart component: `import Cart from './core/Cart'`
  - Add a cart route that has the Cart component. Now we can visit the Cart page
    - `<Route path='/cart' exact component={Cart} />`

**4. Conditionally show/hide 'Add to cart' button**
- In the Cart page, we want to hide the 'Add to cart' button
- In Cart.js file:
  - Pass showAddToCartButton as props to Card component. Set its value to false by default
    - `<Card key={i} product={product} showAddToCartButton={false} />`
  - Since we set showAddToCartButton to false in Cart component, this means the 'Add to cart' button won't render in Cart page
- In Card.js file:
  - In the Card component, accept showAddToCartButton as 3rd arg and set its value to true by default
  - This means wherever the Card component is instantiated, the 'Add to cart' button will render by default
  - In the showAddToCart method,
    - pass in showAddToCartButton as an argument
    - then write a condition that checks if showAddToCartButton is set to true. If it is, only then render the 'Add to cart' button
    ```javascript
    const showAddToCart = (showAddToCartButton) => {
      return (
        showAddToCartButton && (
          <button
            onClick={addToCart}
            className='btn btn-outline-warning mt-2 mb-2'
          >
            Add to cart
          </button>
        )
      );
    };
    ```
  - Lastly, in the render section of Card component, pass showAddToCartButton to the showAddToCart() method as an argument: `{showAddToCart(showAddToCartButton)}`





# LIBRARIES USED
- React router dom: `npm i react-router-dom`
- Environment variable: `npm i dotenv`
- Query params: `npm i query-string`
- Date and time stamp: `npm in moment`


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
