import { API } from '../config';

// Send the data to backend to create a new user
// Note: user is an object received from clickSubmit() method
export const signup = (user) => {
	return fetch(`${API}/signup`, {
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

export const signin = (user) => {
	return fetch(`${API}/signin`, {
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

export const authenticate = (data, cb) => {
	// Check if we have the window object, because local storage is a property of the browser window object
	// If we do, we want to access the local storage
	if (typeof window !== 'undefined') {
		// Use setItem() method to save to local storage
		// 1st arg is the key
		// 2nd arg is the item you want to save
		// Make sure the data is saved as JSON data, use JSON stringify() method
		localStorage.setItem('jwt', JSON.stringify(data));
		// This callback function will execute after the data is saved to local storage
		cb();
	}
};
