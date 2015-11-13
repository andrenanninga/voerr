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
			needRelations: true
		};
	}

	static getStores(props) {
		return [LoginStore, OrderStore, DishesStore];
	}

	static getPropsFromStores(props) {
		return {
			login: LoginStore.getState(),
			orders: OrderStore.getState(),
			dishes: DishesStore.getState()
		};
	}

	render() {
		let orders, dishes;
		let user = this.props.login.user;

		if(!user) {
			return <div></div>;
		}

		if(user && this.state.needRelations) {
			OrderActions.requestUserOrders(user.id);

			if(user.cook) {
				DishesActions.requestUserDishes(user.cook.id);
			}

			this.setState({ needRelations: false });
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
						<td>&euro;{price}</td>
						<td>{orderTime}</td>
						<td>{startTime}</td>
						<td>{address}</td>
					</tr>
				);
			});
		}

		console.log(this.props.dishes.dishes);

		if(this.props.dishes.dishes) {
			dishes = this.props.dishes.dishes.map(dish => {
				let meals = dish.meals.map(meal => {
					let price = (meal.price / 100).toFixed(2).replace('.', ',');
					let date = dateFormat(new Date(meal.available_from), 'dd-mmm-yyyy');
					let availableFrom = dateFormat(new Date(meal.available_from), 'HH:MM');
					let availableUntil = dateFormat(new Date(meal.available_until), 'HH:MM');

					return (
						<tr key={meal.id} className="meal">
							<td>{meal.id}</td>
							<td>&euro;{price}</td>
							<td>{date}</td>
							<td>{availableFrom}</td>
							<td>{availableUntil}</td>
							<td>{meal.portions_claimed}/{meal.portions}</td>
						</tr>
					);
				});

				return (
					<div className="dish" key={dish.id}>
						<div className="photo">
							<div className="image aspect_16-10" style={{ backgroundImage: 'url(/static/images/' + dish.photos[0] + ')' }}></div>
						</div>
						<div className="details">
							<h2><Link to={'/gerecht/' + dish.id }>{dish.name}</Link></h2>
							<table className="meals">
								<thead>
									<tr>
										<td>#</td>
										<td>Prijs</td>
										<td>Datum</td>
										<td>Van</td>
										<td>Tot</td>
										<td>Porties besteld</td>
									</tr>
								</thead>
								<tbody>
									{meals}
								</tbody>
							</table>
						</div>
					</div>
				);
			});
		}

		return (
			<div className="accountPage">
				{account}
				<hr/>
				<div className="orders">
					<h4>Maaltijden</h4>
					<table>
						<thead>
							<tr>
								<td>#</td>
								<td>Gerecht</td>
								<td>Kok</td>
								<td>Prijs</td>
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
					<h4>Mijn gerechten</h4>
					<Link className="button" to="/nieuw-gerecht">Nieuw gerecht toevoegen</Link>
					{dishes}
				</div>
			</div>
		);
	}
}