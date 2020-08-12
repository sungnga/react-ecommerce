import React, { useState, useEffect } from 'react';

const Checkbox = ({ categories, handleFilters }) => {
	const [checked, setChecked] = useState([]);

	// This method takes the category id as an argument
	const handleToggle = (c) => () => {
		// This will check if the category is already in the state
		// The indexOf() method will return the first index or -1
		const currentCategoryId = checked.indexOf(c);
		// This will give all the categories in the state as an array
		const newCheckedCategoryId = [...checked];
		// If currently checked was not already in checked state, push to checked state
		// Else, pull or remove
		if (currentCategoryId === -1) {
			newCheckedCategoryId.push(c);
		} else {
			newCheckedCategoryId.splice(currentCategoryId, 1);
		}
		// console.log(newCheckedCategoryId);
		setChecked(newCheckedCategoryId);
		handleFilters(newCheckedCategoryId);
	};

	return categories.map((c, i) => (
		<li key={i} className='list-unstyled'>
			<input
				onChange={handleToggle(c._id)}
				type='checkbox'
				value={checked.indexOf(c._id === -1)}
				className='form-check-input'
			/>
			<label className='form-check-label'>{c.name}</label>
		</li>
	));
};

export default Checkbox;
