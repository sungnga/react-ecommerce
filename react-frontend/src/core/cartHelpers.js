// JSON.parse() to convert json to object
// JSON.stringify() to convert object to json

// Add item to localStorage
export const addItem = (item, next) => {
	let cart = [];

	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}

		cart.push({
			...item,
			count: 1
		});

		// REMOVE DUPLICATES
		// - build an Array from new Set and turn it back into array using Array.from
		// - so that later we can re-map it
		// - new Set will only allow unique values in it
		// - so pass the ids of each object/product
		// - if the loop tries to add the same value again, it'll get ignored
		// - ...with the array of ids we got when first map() was used
		// - run map() on it again and return the actual product from the cart
		cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
			return cart.find((p) => p._id === id);
		});

		localStorage.setItem('cart', JSON.stringify(cart));
		next();
	}
};

// Get total items from cart, cart length, in localStorage
export const itemTotal = () => {
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			return JSON.parse(localStorage.getItem('cart')).length;
		}
	}
	return 0;
};

// Get product items from cart in localStorage
export const getCart = () => {
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			return JSON.parse(localStorage.getItem('cart'));
		}
	}
	return [];
};

// Update item count based on given product id and count
export const updateItem = (productId, count) => {
	let cart = [];

	// Get items from cart in localStorage and put them in cart array
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}

		// Update item count if the item id matches with the incoming productId
		// Update item count with the incoming count
		cart.map((product, i) => {
			if (product._id === productId) {
				cart[i].count = count;
			}
		});

		// Set cart items back in localStorage
		localStorage.setItem('cart', JSON.stringify(cart));
	}
};

// Remove item count based on given product id and count
export const removeItem = (productId) => {
	let cart = [];

	// Get items from cart in localStorage and put them in cart array
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}

		// If id matches, remove item from cart using splice() method
		cart.map((product, i) => {
			if (product._id === productId) {
				// 1st arg is the index of where to splice
				// 2nd arg is how many to take out
				cart.splice(i, 1);
			}
		});

		// Set cart items back in localStorage
		localStorage.setItem('cart', JSON.stringify(cart));
	}
	return cart;
};

// Remove items from cart in localStorage
// next is a callback function
export const emptyCart = (next) => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('cart');
		next();
	}
};
