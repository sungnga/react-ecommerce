import { API } from '../config';
import queryString from 'query-string';

// Get products from backend
export const getProducts = (sortBy) => {
	return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
		method: 'GET'
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// Get categories from backend
export const getCategories = () => {
	return fetch(`${API}/categories`, {
		method: 'GET'
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// Fetch products based on filters
export const getFilteredProducts = (skip, limit, filters = {}) => {
	const data = { skip, limit, filters };
	return fetch(`${API}/products/by/search`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

// Get products from backend based on search query parameters
// params are the category id and the value the user types in the search bar
export const list = (params) => {
	const query = queryString.stringify(params);
	console.log('query', query);
	return fetch(`${API}/products/search?${query}`, {
		method: 'GET'
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// Get a product based on product id
export const read = (productId) => {
	return fetch(`${API}/product/${productId}`, {
		method: 'GET'
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// Get related products from backend
export const listRelated = (productId) => {
	return fetch(`${API}/products/related/${productId}`, {
		method: 'GET'
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// Get Braintree clientToken from backend. For authenticated users only
export const getBraintreeClientToken = (userId, token) => {
	return fetch(`${API}/braintree/getToken/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// Process payment in backend
// paymentData contains the payment method and total amount
export const processPayment = (userId, token, paymentData) => {
	return fetch(`${API}/braintree/payment/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		// Send the payment data
		body: JSON.stringify(paymentData)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// Create order in backend
export const createOrder = (userId, token, createOrderData) => {
	return fetch(`${API}/order/create/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		// Send the order data
		body: JSON.stringify({ order: createOrderData })
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
