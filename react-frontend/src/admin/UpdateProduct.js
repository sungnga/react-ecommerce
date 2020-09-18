import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getProduct, getCategories, updateProduct } from './apiAdmin';
import { Redirect } from 'react-router-dom';

const UpdateProduct = (props) => {
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
	const [categories, setCategories] = useState([]);

	// Destructure all the values of the state
	const {
		name,
		description,
		price,
		// categories,
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

	const init = (productId) => {
		getProduct(productId).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				// populate the state
				setValues({
					...values,
					name: data.name,
					description: data.description,
					price: data.price,
					category: data.category._id,
					shipping: data.shipping,
					quantity: data.quantity,
					formData: new FormData()
				});
				// load categories
				initCategories();
			}
		});
	};

	// Load categories and set form data
	const initCategories = () => {
		getCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setCategories(data);
			}
		});
	};

	useEffect(() => {
		init(props.match.params.productId);
	}, []);

	// This is a Higher Order Function
	const handleChange = (name) => (e) => {
		const value = name === 'photo' ? e.target.files[0] : e.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, error: '', loading: true });

		updateProduct(props.match.params.productId, user._id, token, formData).then(
			(data) => {
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
						error: false,
						redirectToProfile: true,
						createdProduct: data.name
					});
				}
			}
		);
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
					<option>Please select</option>
					{categories &&
						categories.map((c, i) => (
							<option key={i} value={c._id}>
								{c.name}
							</option>
						))}
				</select>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Shipping</label>
				<select onChange={handleChange('shipping')} className='form-control'>
					<option>Please select</option>
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

			<button className='btn btn-outline-primary'>Update Product</button>
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
			style={{ display: createdProduct ? '' : 'none' }}
		>
			<h2>{`${createdProduct}`} is updated!</h2>
		</div>
	);

	const showLoading = () =>
		loading && (
			<div className='alert alert-success'>
				<h2>Loading...</h2>
			</div>
		);

	const redirectUser = () => {
		if (redirectToProfile) {
			if (!error) {
				return <Redirect to='/' />;
			}
		}
	};

	return (
		<Layout
			title='Add a new product'
			description={`Hello ${user.name}, ready to add a new product?`}
		>
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					{showLoading()}
					{showError()}
					{showSuccess()}
					{newPostForm()}
					{redirectUser()}
				</div>
			</div>
		</Layout>
	);
};

export default UpdateProduct;
