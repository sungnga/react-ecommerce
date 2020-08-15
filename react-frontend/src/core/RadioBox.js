import React, { useState, useEffect, Fragment } from 'react';

const RadioBox = ({ prices }) => {
  const [value, setValue] = useState(0);
  
  const handleChange = () => {
    //
  };

	return prices.map((p, i) => (
		<div key={i}>
			<input
				onChange={handleChange}
				type='radio'
				value={`${p._id}`}
				className='mr-2 ml-4'
			/>
			<label className='form-check-label'>{p.name}</label>
		</div>
	));
};

export default RadioBox;
