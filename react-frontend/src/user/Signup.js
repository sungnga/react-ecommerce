import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';

const Signup = () => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		success: false
	});

	const { name, email, password, error, success } = values;

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
		setValues({ ...values, error: false });
		// The data we send is an object
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

	const signUpForm = () => (
		<form>
			<div className='form-group'>
				<label className='text-muted'>Name</label>
				<input
					onChange={handleChange('name')}
					type='text'
					className='form-control'
					value={name}
				/>
			</div>

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

	const showSuccess = () => (
		<div
			className='alert alert-info'
			style={{ display: success ? '' : 'none' }}
		>
			New account is created. Please <Link to='/signin'>Signin</Link>
		</div>
	);

	return (
		<Layout
			title='Signup'
			description='Signup to Node React E-commerce App'
			className='container col-md-8 offset-md-2'
		>
			{showError()}
			{showSuccess()}
			{signUpForm()}
		</Layout>
	);
};

export default Signup;
