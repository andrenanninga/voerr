import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import dateFormat from 'dateformat-light';
import { Link } from 'react-router';
import { Form } from 'formsy-react';

import LoginStore from 'flux/stores/LoginStore';

import DishesStore from 'flux/stores/DishesStore';
import DishesActions from 'flux/actions/DishesActions';

import OrderStore from 'flux/stores/OrderStore';
import OrderActions from 'flux/actions/OrderActions';

import 'assets/style/account';

@connectToStores
export default class AccountPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			needsOrders: true
		};
	}

	static getStores(props) {
		return [LoginStore, OrderStore];
	}

	static getPropsFromStores(props) {
		return {
			login: LoginStore.getState(),
			orders: OrderStore.getState()
		};
	}

	componentDidUpdate() {
		let user = this.props.login.user;
		console.log('update');

		if(user && this.state.needsOrders) {
			OrderActions.requestUserOrders(user.id);
			this.setState({ needsOrders: false });
		}
		// console.log('')
		// if(this.props.login) {
		// 	console.log(this.props.login.user);
		// }
	}

	render() {
		let user = this.props.login.user;

		let orders;

		if(!user) {
			return <div></div>;
		}

		let account = (
			<div className="account">
				<div className="avatar">
					<div className="image aspect_1-1 avatar" style={{ backgroundImage: 'url(/static/images/' + user.avatar + ')' }}></div>
				</div>
				<div className="name">
					<h2>{user.name}</h2>
					<p>{user.email}</p>
				</div>
			</div>
		);

		if(this.props.orders.orders) {
			orders = this.props.orders.orders.map(order => {
				let orderTime = dateFormat(order.date_created, 'd mmmm yyyy').toLowerCase();
				let startTime = dateFormat(order.start_time, 'd mmmm yyyy "om" hh:MM').toLowerCase();
				let price = (order.total_amount / 100).toFixed(2).replace('.', ',');

				return (
					<div className="order" key={order.id}> 
						<h3>{order.dish_name}</h3>
						<p>
							{orderTime} &euro;{price}
						</p>
						<p>
							aan tafel om <strong>{startTime}</strong>
						</p>
					</div>
				);
				console.log(order);
			});
		}

		let dishes = (
			<div className="dishes">
				<Link className="button" to="/nieuw-gerecht">Nieuw gerecht toevoegen</Link>
			</div>
		);

		console.log(this);
		return (
			<div className="accountPage">
				{account}
				<hr/>
				{orders}
				<hr/>
				{dishes}
			</div>
		);

		return <div></div>;

		return (
			<div className="account">

				<div>
					<table>

					</table>
				</div>

				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Maaltijd</th>
							<th>Kok</th>
							<th>Datum</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>23</td>
							<td>Hutspot</td>
							<td>Gordon Ramsey</td>
							<td>12 januari 2016</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}