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
  - Render this form in the Layout component
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



# LIBRARIES USED
- React router dom: `npm i react-router-dom`


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
