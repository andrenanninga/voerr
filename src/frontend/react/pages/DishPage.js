import React from 'react';
import connectToStores from 'alt/utils/connectToStores';

import DishesStore from 'flux/stores/DishesStore';
import DishesActions from 'flux/actions/DishesActions';

import 'assets/style/dishDetail';

@connectToStores
export default class DishPage extends React.Component {
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
		console.log(dish);

		if(!dish) {
			return <div></div>;
		}

		return <div className="dishDetail">
			<h2>{dish.name}</h2>
			<div className="image aspect_16-10" style={{ backgroundImage: 'url(/static/images/' + dish.photos[0] + ')' }}></div>
			<div className="details">
				<div className="order">
					<button className="button-primary">Bestellen</button>
				</div>
				<p>
					{dish.description}
				</p>
				<div className="cook">
					<div className="image aspect_4-3" style={{ backgroundImage: 'url(/static/images/' + dish.cook.avatar + ')' }}></div>
					<h3>{dish.cook.name}</h3>
				</div>

			</div>
		</div>;		
	}
}