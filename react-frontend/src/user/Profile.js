import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

const Profile = (props) => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: false,
		success: false
	});

	const { name, email, password, error, success } = values;
	const { token } = isAuthenticated();

  // Get user info from backend and set it to values state
	const init = (userId) => {
		console.log(userId);
		read(userId, token).then((data) => {
			if (data.error) {
				setValues({ ...values, error: true });
			} else {
				setValues({
					...values,
					name: data.name,
					email: data.email
				});
			}
		});
	};

	useEffect(() => {
		init(props.match.params.userId);
	}, []);

	// Update the values state with values from the event
	// handleChange is a HOF that returns another function
	// The value we pass in for name is either name, email, or password
	// On handleChange, we want to update the values state
	// The value for [name] is dynamically generated depending on where it's coming from
	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

  // Send user data to backend to update user info
	const clickSubmit = (e) => {
		e.preventDefault();
		update(props.match.params.userId, token, { name, email, password }).then(
			(data) => {
				if (data.error) {
					console.log(data.error);
        } else {
          // If success, update user info in localStorage and set success state to true
					updateUser(data, () => {
						setValues({
							...values,
							name: data.name,
							email: data.email,
							success: true
						});
					});
				}
			}
		);
	};

	const redirectUser = (success) => {
		if (success) {
			return <Redirect to='/cart' />;
		}
	};

  // Create a form so user can update their profile
	const profileUpdate = (name, email, password) => (
		<form>
			<div className='form-group'>
				<label className='text-muted'>Name</label>
				<input
					type='text'
					onChange={handleChange('name')}
					value={name}
					className='form-control'
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Email</label>
				<input
					type='text'
					onChange={handleChange('email')}
					value={email}
					className='form-control'
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Password</label>
				<input
					type='text'
					onChange={handleChange('password')}
					value={password}
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
			title='Profile'
			description='Update your profile'
			className='container-fluid'
		>
			<h2 className='mb-4'>Profile update</h2>
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
		</Layout>
	);
};

export default Profile;
