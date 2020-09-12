import { API } from '../config';

// Send the data to backend to create a new category
export const createCategory = (userId, token, category) => {
	return fetch(`${API}/category/create/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(category)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

// Send the data to backend to create a new product
// The product we're sending is the form data
export const createProduct = (userId, token, product) => {
	return fetch(`${API}/product/create/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: product
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
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

// Get orders from backend
export const listOrders = (userId, token) => {
	return fetch(`${API}/order/list/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
