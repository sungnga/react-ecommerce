import React from 'react';
import { API } from '../config';

// Note: the route to get the photo is: router.get('/product/photo/:productId', photo)
// Hence the item = product, url = product
const ShowImage = ({ item, url }) => (
	<div className='product-Image'>
		<img
			src={`${API}/${url}/photo/${item._id}`}
			alt={item.name}
			className='mb-3'
			style={{ maxHeight: '100%', maxWidth: '100%' }}
		/>
	</div>
);

export default ShowImage;
