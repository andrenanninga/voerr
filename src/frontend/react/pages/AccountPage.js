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

		let credit = (user.credit / 100).toFixed(2).replace('.', ',');

		let account = (
			<div className="account">
				<div className="avatar">
					<div className="image aspect_1-1 avatar" style={{ backgroundImage: 'url(/static/images/' + user.avatar + ')' }}></div>
				</div>
				<div className="name">
					<h2>{user.name}</h2>
					<p>{user.email}</p>
				</div>
				<div className="credit">
					<h4>&euro;{credit} credit</h4>
					<button disabled>credits toevoegen</button>
				</div>
			</div>
		);

		if(this.props.orders.orders) {
			orders = this.props.orders.orders.map(order => {
				let orderTime = dateFormat(order.date_created, 'd mmmm yyyy').toLowerCase();
				let startTime = dateFormat(order.start_time, 'd mmmm yyyy "om" hh:MM').toLowerCase();
				let price = (order.total_amount / 100).toFixed(2).replace('.', ',');
				let url = '/gerecht/' + order.id;
				let dinnerTime, address;

				if(new Date(order.start_time) < Date.now()) {
					startTime = <span className="muted">{startTime}</span>;
				}
				else {
					address = <a target="_blank" href={'http://maps.google.com/?q=' + order.cook_address}>{order.cook_address}</a>;
				}

				return (
					<tr key={order.id}>
						<td>{order.id}</td>
						<td><Link to={'/gerecht/' + order.id}>{order.dish_name}</Link></td>
						<td><Link to="#">{order.cook_name}</Link></td>
						<td>{orderTime}</td>
						<td>{startTime}</td>
						<td>{address}</td>
					</tr>
				);
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
				<div className="orders">
					<h4>Bestellingen</h4>
					<table>
						<thead>
							<tr>
								<td>#</td>
								<td>Gerecht</td>
								<td>Kok</td>
								<td>Besteldatum</td>
								<td>Aanvang</td>
								<td>adres</td>
							</tr>
						</thead>
						<tbody>
							{orders}
						</tbody>
					</table>
				</div>
				<div className="dishes">
					<h4>Gerechten</h4>
				</div>
			</div>
		);
	}
}