import React, { useState } from 'react';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
	product,
	showViewProductButton = true,
	showAddToCartButton = true,
	cartUpdate = false,
	showRemoveProductButton = false,
	setRun = f => f,  //default value of function
	run = undefined   // default value of undefined
}) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);

	// Note that the "View Product" button and link only renders if showViewProductButton is true
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

	const addToCart = () => {
		addItem(product, () => {
			setRedirect(true);
		});
	};

	// Note that this method executes only if the redirect state is true
	// Redirect component comes from react-router-dom
	const shouldRedirect = (redirect) => {
		if (redirect) {
			return <Redirect to='/cart' />;
		}
	};

	// Note that the "Add to cart" button only renders if showAddToCartButton is true
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

	// Note that the "Remove Product" button only renders if showRemoveProductButton is true
	const showRemoveButton = (showRemoveProductButton) => {
		return (
			showRemoveProductButton && (
				<button
					onClick={() => {
						removeItem(product._id)
						setRun(!run);  // run useEffect() in parent Cart component
					}}
					className='btn btn-outline-danger mt-2 mb-2'
				>
					Remove Product
				</button>
			)
		);
	};

	const showStock = (quantity) => {
		return quantity > 0 ? (
			<span className='badge badge-primary pill'>In Stock</span>
		) : (
			<span className='badge badge-primary badge-pill'>Out of Stock</span>
		);
	};

	const handleChange = (productId) => (event) => {
		setRun(!run);  // run useEffect() in parent Cart component
		setCount(event.target.value < 1 ? 1 : event.target.value);
		if (event.target.value >= 1) {
			updateItem(productId, event.target.value);
		}
	};

	const showCartUpdateOptions = (cartUpdate) => {
		return (
			cartUpdate && (
				<div className='input-group mb-3'>
					<div className='input-group-prepend'>
						<span className='input-group-text'>Adjust Quantity</span>
					</div>

					<input
						type='number'
						className='form-control'
						value={count}
						onChange={handleChange(product._id)}
					/>
				</div>
			)
		);
	};

	return (
		<div className='card'>
			<div className='card-header name'>{product.name}</div>
			<div className='card-body'>
				{shouldRedirect(redirect)}
				<ShowImage item={product} url='product' />
				<p className='lead mt-2'>{product.description.substring(0, 100)}</p>
				<p className='black-10'>${product.price}</p>
				<p className='black-9'>
					Category: {product.category && product.category.name}
				</p>
				<p className='black-8'>
					Added on {moment(product.createdAt).fromNow()}
				</p>
				{showStock(product.quantity)}
				<br />
				{showViewButton(showViewProductButton)}
				{showAddToCart(showAddToCartButton)}
				{showRemoveButton(showRemoveProductButton)}
				{showCartUpdateOptions(cartUpdate)}
			</div>
		</div>
	);
};

export default Card;
