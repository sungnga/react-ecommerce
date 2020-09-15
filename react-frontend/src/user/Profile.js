import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

const Profile = (props) => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: false,
		success: false
	});

	const { name, email, password, error, success } = values;
	const { token } = isAuthenticated();

	const init = (userId) => {
		console.log(userId);
		read(userId, token).then((data) => {
			if (data.error) {
				setValues({ ...values, error: true });
			} else {
				setValues({
					...values,
					name: data.name,
					email: data.email,
					success: true
				});
			}
		});
	};

	useEffect(() => {
		init(props.match.params.userId);
	}, []);

	return (
		<Layout
			title='Profile'
			description='Update your profile'
			className='container-fluid'
		>
			<h2 className='mb-4'>Profile update</h2>
			{JSON.stringify(values)}
		</Layout>
	);
};

export default Profile;
