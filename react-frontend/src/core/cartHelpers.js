// JSON.parse() to convert json to object
// JSON.stringify() to convert object to json

// Add item to local storage
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
