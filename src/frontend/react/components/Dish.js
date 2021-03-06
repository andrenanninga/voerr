import React from 'react';
import { Link } from 'react-router';

import 'assets/style/dish';

export default class Dish extends React.Component {
	render() {
		let n = 500 + Math.round(Math.random() * 20); 
		let url = this.props.url || '/gerecht/' + this.props.id;
		let rating;

		if(this.props.reviews && this.props.reviews.length) {
			rating = this.props.reviews.reduce((prev, current) => {
				return prev + current.rating;
			}, 0) / this.props.reviews.length;
		}

		return (
			<div className="dish">
				<Link to={url}>dish
					<div className="image aspect_16-10" style={{ backgroundImage: 'url(/static/images/' + this.props.photos[0] + ')' }}></div>
					<h2>{this.props.name}</h2>
				</Link>
			</div>
		);
	}
}