import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	// Destructure user and token from localStorage
	const { user, token } = isAuthenticated();

	const handleChange = (e) => {
		setError('');
		setName(e.target.value);
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setError('');
		setSuccess(false);
		// Make request to api to create category
		// 3rd arg is the name of the category coming from state
		createCategory(user._id, token, { name }).then((data) => {
			if (data.error) {
				setError(true);
			} else {
				setError('');
				setSuccess(true);
			}
		});
	};

	const newCategoryForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='form-group'>
				<label className='text-muted'>Name</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange}
					value={name}
					autoFocus
					required
				/>
			</div>
			<button className='btn btn-outline-primary'>Create Category</button>
		</form>
	);

	const showSuccess = () => {
		if (success) {
			return <h3 className='text-success'>{name} is created</h3>;
		}
	};

	const showError = () => {
		if (error) {
			return (
				<h3 className='text-danger'>
					{name} already exists. Please use another name.
				</h3>
			);
		}
	};

	const goBack = () => (
		<div className='mt-5'>
			<Link className='text-warning' to='/admin/dashboard'>
				Back to Dashboard
			</Link>
		</div>
	);

	return (
		<Layout
			title='Add a new category'
			description={`Hello ${user.name}, ready to add a new category?`}
		>
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					{showSuccess()}
					{showError()}
					{newCategoryForm()}
					{goBack()}
				</div>
			</div>
		</Layout>
	);
};

export default AddCategory;
