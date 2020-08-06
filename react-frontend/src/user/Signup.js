import React, { useState } from 'react';
import Layout from '../core/Layout';
import { API } from '../config';

const Signup = () => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		success: false
	});

	const { name, email, password } = values;

	// handleChange is a HOF that returns another function
	// The value we pass in for name is either name, email, or password
	// On handleChange, we want to set the value state
	// The value for [name] is dynamically generated depending on where it's coming from
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	// Send the data to backend to create a new user
	// Note: user is an object received from clickSubmit() method
	const signup = (user) => {
		// console.log(name, email, password);
		fetch(`${API}/signup`, {
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

	const clickSubmit = (event) => {
		// Prevent default behavior of reload of the browser when the button is clicked
		event.preventDefault();
		// The data we send is an object
		signup({ name, email, password });
	};

	const signUpForm = () => (
		<form>
			<div className='form-group'>
				<label className='text-muted'>Name</label>
				<input
					onChange={handleChange('name')}
					type='text'
					className='form-control'
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Email</label>
				<input
					onChange={handleChange('email')}
					type='email'
					className='form-control'
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Password</label>
				<input
					onChange={handleChange('password')}
					type='password'
					className='form-control'
				/>
			</div>

			<button onClick={clickSubmit} className='btn btn-primary'>
				Submit
			</button>
		</form>
	);

	return (
		<Layout
			title='Signup'
			description='Signup to Node React E-commerce App'
			className='container col-md-8 offset-md-2'
		>
			{signUpForm()}
			{JSON.stringify(values)}
		</Layout>
	);
};

export default Signup;
