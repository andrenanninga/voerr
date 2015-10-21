import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import DishesStore from 'stores/dishStore';

class Dish extends React.Component {
	render() {
		console.log(this.props);

		return (
			<div className="dish">
				<h2>{this.props.name}</h2>
				<p>{this.props.description}</p>
			</div>
		);
	}
}

export default Dish;