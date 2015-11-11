import React from 'react';
import { Link } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';
import { filter } from 'lodash';

import Markdown from 'react-remarkable';

import DishesStore from 'flux/stores/DishesStore';
import DishesActions from 'flux/actions/DishesActions';

import 'assets/style/dishDetail';
import 'assets/style/_allergies';

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
		let allergies;

		if(!dish) {
			return <div></div>;
		}

		let allergiesMap = {
			1: 'wheat',
			2: 'shellfish',
			3: 'egg',
			4: 'fish',
			6: 'peanut',
			7: 'soy',
			8: 'milk',
			9: 'nuts'
		}

		if(dish.allergies.length) {
			allergies = dish.allergies.map(allergy => {
				if(allergiesMap[allergy.id]) {
					return <div key={allergy.id} className={'allergy ' + allergiesMap[allergy.id]}></div>;
				}
				return false;
			});

			allergies = filter(allergies);
		}

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
					<div className="allergies">
						{allergies}
					</div>
				</div>
			</div>

			<hr/>

			<Markdown>
				{dish.description}
			</Markdown>

			{/*			
			<div className="availability">
				tussen <b>18:00</b> en <b>21:00</b>
			</div>

			<div className="details">
				<div className="order">
					<button className="button-primary">Bestellen</button>
				</div>
				<p>
					{dish.description}
				</p>
				<h5>Allergie&euml;n</h5>
				{allergies}
				<div className="cook">
					<div className="image aspect_4-3" style={{ backgroundImage: 'url(/static/images/' + dish.cook.avatar + ')' }}></div>
					<h3>{dish.cook.name}</h3>
				</div>
			</div>
				*/}
		</div>;		
	}
}