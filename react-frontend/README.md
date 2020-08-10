# STEPS TO BUILDING THE FRONTEND OF THIS ECOMMERCE APP WITH REACT

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
  - Write a AddProfuct functional component creates a new product
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
  - To display the products in home page, render the productsBySell and productsByArrival states in Layout component





# LIBRARIES USED
- React router dom: `npm i react-router-dom`
- Environment variable: `npm i dotenv`


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
