import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [statusValues, setStatusValues] = useState([]);

	const { user, token } = isAuthenticated();

	const loadOrders = () => {
		listOrders(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOrders(data);
			}
		});
	};

	const loadStatusValues = () => {
		getStatusValues(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setStatusValues(data);
			}
		});
	};

	useEffect(() => {
		loadOrders();
		loadStatusValues();
	}, []);

	const showOrdersLength = () => {
		if (orders.length > 0) {
			return (
				<h1 className='text-danger display-4'>Total orders: {orders.length}</h1>
			);
		} else {
			return <h1 className='text-danger display-4'>No orders</h1>;
		}
	};

	const showInput = (key, value) => (
		<div className='input-group mb-2 mr-sm-2'>
			<div className='input-group-prepend'>
				<div className='input-group-text'>{key}</div>
			</div>
			<input type='text' value={value} className='form-control' readOnly />
		</div>
	);

	const handleStatusChange = (e, orderId) => {
		// console.log('update order status');
		updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
			if (data.error) {
				console.log('Status update failed');
			} else {
				loadOrders();
			}
		});
	};

	const showStatus = (o) => (
		<div className='form-group'>
			<h3 className='mark mb-4'>Status: {o.status}</h3>
			<select
				onChange={(e) => handleStatusChange(e, o._id)}
				className='form-control'
			>
				<option>Update Status</option>
				{statusValues.map((status, index) => (
					<option key={index} value={status}>
						{status}
					</option>
				))}
			</select>
		</div>
	);

	return (
		<Layout
			title='Orders'
			description={`Hello ${user.name}, you can manage all the orders here`}
		>
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					{showOrdersLength()}
					{orders.map((o, oIndex) => (
						<div
							key={oIndex}
							className='mt-5'
							style={{ borderBottom: '2px solid grey' }}
						>
							<h4 className='mb-4'>
								<span>Order ID: {o._id}</span>
							</h4>

							<ul className='list-group mb-2'>
								<li className='list-group-item'>
									Transaction ID: {o.transaction_id}
								</li>
								<li className='list-group-item'>{showStatus(o)}</li>
								<li className='list-group-item'>Amount: ${o.amount}</li>
								<li className='list-group-item'>Order by: {o.user.name}</li>
								<li className='list-group-item'>
									Ordered on: {moment(o.createdAt).fromNow()}
								</li>
								<li className='list-group-item'>
									Delivery Address: {o.address}
								</li>
							</ul>

							<h4 className='mt-4 mb-4 font-italic'>
								Total products in the order: {o.products.length}
							</h4>

							{o.products.map((p, pIndex) => (
								<div
									key={pIndex}
									className='mb-4'
									style={{ padding: '20px', border: '1px solid grey' }}
								>
									{showInput('Product name', p.name)}
									{showInput('Product price', p.price)}
									{showInput('Product total', p.count)}
									{showInput('Product Id', p._id)}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Orders;
