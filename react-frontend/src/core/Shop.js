import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import { prices } from './fixedPrices';
import RadioBox from './RadioBox';

const Shop = () => {
	const [myFilters, setMyFilters] = useState({
		filters: { category: [], price: [] }
	});
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(false);
	const [limit, setLimit] = useState(6);
	const [skip, setSkip] = useState(0);
	const [filteredResults, setFilteredResults] = useState(0);

	// Load categories and set form data
	const init = () => {
		getCategories().then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setCategories(data);
			}
		});
	};

	const loadFilteredResults = (newFilters) => {
		// console.log(newFilters)
		getFilteredProducts(skip, limit, newFilters).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setFilteredResults(data.data);
			}
		});
	};

	useEffect(() => {
		init();
		loadFilteredResults(skip, limit, myFilters.filters);
	}, []);

	// filterBy means catetory or price
	const handleFilters = (filters, filterBy) => {
		const newFilters = { ...myFilters };
		newFilters.filters[filterBy] = filters;

		if (filterBy === 'price') {
			let priceValues = handlePrice(filters);
			newFilters.filters[filterBy] = priceValues;
		}

		loadFilteredResults(myFilters.filters);

		setMyFilters(newFilters);
	};

	const handlePrice = (value) => {
		const data = prices;
		let array = [];

		for (let key in data) {
			// If the value of data id matches with the value, get the value of data array and set it to array
			if (data[key]._id === parseInt(value)) {
				array = data[key].array;
			}
		}
		return array;
	};

	return (
		<Layout
			title='Shop Page'
			description='Search and find books of your choice'
			className='container-fluid'
		>
			{JSON.stringify(myFilters)}
			<div className='row'>
				<div className='col-4'>
					<h4>Filter by categories</h4>
					<ul>
						<Checkbox
							categories={categories}
							handleFilters={(filters) => handleFilters(filters, 'category')}
						/>
					</ul>

					<h4>Filter by price range</h4>
					<div>
						<RadioBox
							prices={prices}
							handleFilters={(filters) => handleFilters(filters, 'price')}
						/>
					</div>
				</div>

				<div className='col-8'>
					<h4 className='mb-4'>Products</h4>
					<div className='row'>
						{filteredResults.map((product, i) => (
							<Card key={i} product={product} />
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Shop;
