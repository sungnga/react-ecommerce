import { API } from '../config';

// Get user from backend based on userId and token
export const read = (userId, token) => {
	return fetch(`${API}/user/${userId}`, {
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

// Update user info in backend
export const update = (userId, token, user) => {
	return fetch(`${API}/user/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		// Send the user data
		body: JSON.stringify(user)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// Update user info in localStorage
// user arg is the user data coming from Profile component
export const updateUser = (user, next) => {
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('jwt')) {
			let auth = JSON.parse(localStorage.getItem('jwt'));
			// Update the user info
			auth.user = user;
			// Set the user info (auth) back in the localStorage in the key 'jwt'
			localStorage.setItem('jwt', JSON.stringify(auth));
			next();
		}
	}
};

// Get purchase history for a user from backend
export const getPurchaseHistory = (userId, token) => {
	return fetch(`${API}/orders/by/user/${userId}`, {
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
