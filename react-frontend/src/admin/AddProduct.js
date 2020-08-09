import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createProduct } from './apiAdmin';

const AddProduct = () => {
	const [values, setValues] = useState({
		name: '',
		description: '',
		price: '',
		categories: [],
		category: '',
		shipping: '',
		quantity: '',
		photo: '',
		loading: false,
		error: '',
		createdProduct: '',
		redirectToProfile: false,
		formData: ''
	});

	// Destructure all the values of the state
	const {
		name,
		description,
		price,
		categories,
		category,
		shipping,
		quantity,
		photo,
		loading,
		error,
		createdProduct,
		redirectToProfile,
		formData
	} = values;

	// Destructure user and token from localStorage
	const { user, token } = isAuthenticated();

	// This is a Higher Order Function
	const handleChange = (name) => (e) => {
		const value = name === 'photo' ? e.target.files[0] : e.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();
	};

	const newPostForm = () => (
		<form onSubmit={clickSubmit} className='mb-3'>
			<h4>Post Photo</h4>
			<div className='form-group'>
				<label className='btn btn-secondary'>
					<input
						onChange={handleChange('photo')}
						type='file'
						name='photo'
						accept='image/*'
					/>
				</label>
			</div>

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
				<label className='text-muted'>Description</label>
				<textarea
					onChange={handleChange('description')}
					className='form-control'
					value={description}
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Price</label>
				<input
					onChange={handleChange('price')}
					type='number'
					className='form-control'
					value={price}
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Category</label>
				<select onChange={handleChange('category')} className='form-control'>
					<option value='5f2f754efb1f61e9aa465ca0'>Python</option>
				</select>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Shipping</label>
				<select onChange={handleChange('shipping')} className='form-control'>
					<option value='0'>No</option>
					<option value='1'>Yes</option>
				</select>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Quantity</label>
				<input
					onChange={handleChange('quantity')}
					type='number'
					className='form-control'
					value={quantity}
				/>
			</div>

			<button className='btn btn-outline-primary'>Create Product</button>
		</form>
	);

	return (
		<Layout
			title='Add a new product'
			description={`Hello ${user.name}, ready to add a new product?`}
		>
			<div className='row'>
				<div className='col-md-8 offset-md-2'>{newPostForm()}</div>
			</div>
		</Layout>
	);
};

export default AddProduct;
