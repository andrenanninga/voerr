import React from 'react';
import { Link } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';
import { filter, values, reduce, times } from 'lodash';
import dateFormat from 'dateformat-light';

import Markdown from 'react-remarkable';

import DishesStore from 'flux/stores/DishesStore';
import DishesActions from 'flux/actions/DishesActions';

import 'assets/style/dishDetail';
import 'assets/style/_allergies';
import 'assets/style/_hearts';

@connectToStores
export default class SearchItemPage extends React.Component {
	static getStores(props) {
		return [DishesStore];
	}

	static getPropsFromStores(props) {
		return DishesStore.getState();
	}

	componentWillMount() {
		DishesActions.requestDish(this.props.params.id);
	}

	render() {
		let dish = this.props.dishes[0];
		let url = '/s/' + this.props.params.location + '/' + this.props.params.term;
		let hearts = [];
		let allergies, categories;

		if(!dish) {
			return <div></div>;
		}

		let allergiesMap = {
			1: 'wheat', 2: 'shellfish', 3: 'egg', 4: 'fish', 
			6: 'peanut', 7: 'soy', 8: 'milk', 9: 'nuts'
		};

		if(dish.allergies.length) {
			allergies = dish.allergies.map(allergy => {
				if(allergiesMap[allergy.id]) {
					return <div key={allergy.id} className={'allergy ' + allergiesMap[allergy.id]}></div>;
				}
				return false;
			});

			allergies = filter(allergies);
		}

		if(dish.categories.length) {
			let cats = {};

			dish.categories.forEach((cat) => {
				if(!cats[cat.parent.id]) {
					cats[cat.parent.id] = {
						name: cat.parent.name,
						cats: []
					};
				}

				cats[cat.parent.id].cats.push({ id: cat.id, name: cat.name });
			});

			categories = values(cats).map((cat) => {
				return (
					<ul key={cat.id} className="category">
						<li key={"__" + cat.id}><strong>{cat.name}</strong></li>
						{cat.cats.map(c => {
							return <li key={c.id}>{c.name}</li>
						})}
					</ul>
				);
			});
		}

		let average = 0;
		if(dish.reviews.length) {
			average = reduce(dish.reviews, ((n, r) => { return n + r.rating; }), 0) / dish.reviews.length;
		}

		times(5, (n) => {
			if(n < average) {
				hearts.push(<div className="heart full"></div>);
			}
			else {
				hearts.push(<div className="heart"></div>);
			}
		});

		let price = dish.meal.price.toFixed(2).replace('.', ',');
		let availableFrom = dateFormat(new Date(dish.meal.available_from), 'HH:MM');
		let availableUntil = dateFormat(new Date(dish.meal.available_until), 'HH:MM');

		return <div className="dishDetail">
			<Link className="button" to={url}>&lt; Terug naar overzicht</Link>
			<div className="image aspect_16-10" style={{ backgroundImage: 'url(/static/images/' + dish.photos[0] + ')' }}></div>

			<div className="general">
				<div className="cook">
					<div className="image aspect_1-1 avatar" style={{ backgroundImage: 'url(/static/images/' + dish.cook.avatar + ')' }}></div>
					<span>{dish.cook.name}</span>
				</div>
				<div className="dish">
					<h2>{dish.name}</h2>
					<div className="rating">
						{hearts}
						<a href="#">({dish.reviews.length})</a>
					</div>
					<div className="allergies">
						{allergies}
					</div>
				</div>
				<div className="meal">
					<h4>&euro;{price} per maaltijd</h4>
					<p>Vanavond tussen <strong>{availableFrom}</strong> en <strong>{availableUntil}</strong></p>
					<button className="button-primary">Reservering maken</button>
				</div>
			</div>

			<hr/>

			<div className="details">
				<div className="description">
					<Markdown>
						{dish.description}
					</Markdown>
				</div>

				<div className="categories">
					{categories}
				</div>
			</div>
		</div>;		
	}
}