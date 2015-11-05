import React from 'react';

import 'assets/style/dish';

export default class Dish extends React.Component {
	render() {
		let n = 500 + Math.round(Math.random() * 20); 
		let src = 'http://unsplash.it/' + n + '/' + (n - 200) + '?random';
		let rating;

		if(this.props.reviews.length) {
			rating = this.props.reviews.reduce((prev, current) => {
				return prev + current.rating;
			}, 0) / this.props.reviews.length;
		}

		return <div className="dish">
			<img src={src} height="300"/>
			<h2>{this.props.name}</h2>
			<p>
				{this.props.description}
			</p>
		</div>;
	}
}