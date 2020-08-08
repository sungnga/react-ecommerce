import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth';

const Signin = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
		redirectToReferrer: false
	});

	const { email, password, error, loading, redirectToReferrer } = values;
	const { user } = isAuthenticated();

	// handleChange is a HOF that returns another function
	// The value we pass in for name is either name, email, or password
	// On handleChange, we want to set the value state
	// The value for [name] is dynamically generated depending on where it's coming from
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const clickSubmit = (event) => {
		// Prevent default behavior of reload of the browser when the button is clicked
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		// The data we send is an object
		signin({ email, password }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				// If successfully signin, save user data to local storage
				// 1st arg is the data coming back
				// 2nd arg is a callback that sets the redirectToReferrer to true. This will enable redirect
				authenticate(data, () => {
					setValues({
						...values,
						redirectToReferrer: true
					});
				});
			}
		});
	};

	const signInForm = () => (
		<form>
			<div className='form-group'>
				<label className='text-muted'>Email</label>
				<input
					onChange={handleChange('email')}
					type='email'
					className='form-control'
					value={email}
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Password</label>
				<input
					onChange={handleChange('password')}
					type='password'
					className='form-control'
					value={password}
				/>
			</div>

			<button onClick={clickSubmit} className='btn btn-primary'>
				Submit
			</button>
		</form>
	);

	const showError = () => (
		<div
			className='alert alert-danger'
			style={{ display: error ? '' : 'none' }}
		>
			{error}
		</div>
	);

	const showLoading = () =>
		loading && (
			<div className='alert alert-info'>
				<h2>Loading...</h2>
			</div>
		);

	const redirectUser = () => {
		if (redirectToReferrer) {
			// Check if the user is authenticated and if they're admin user
			if (user && user.role === 1) {
				// Redirect to admin dashboard page
				return <Redirect to='/admin/dashboard' />;
			} else {
				// Redirect to registered user dashboard page
				return <Redirect to='/user/dashboard' />;
			}
		}
		// If user is already signed in, redirect to home page
		if (isAuthenticated()) {
			return <Redirect to='/' />;
		}
	};

	return (
		<Layout
			title='Signin'
			description='Signin to Node React E-commerce App'
			className='container col-md-8 offset-md-2'
		>
			{showError()}
			{showLoading()}
			{signInForm()}
			{redirectUser()}
		</Layout>
	);
};

export default Signin;
