import _ from 'lodash';
import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import DishesStore from 'stores/dishStore';
import Slider from 'react-slick';
import 'style/dish';

class Dish extends React.Component {
	render() {

		let sliderSettings = {
			infinite: true,
			speed: 500,
			autoplay: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
			centerMode: true,
			lazyLoad: true
		};

		let n = Array.apply(null, {length: 50}).map(Number.call, Number);
		n = _.shuffle(n);
		n = n.slice(0, Math.random() * 4 + 2);

		let images = _.map(n, (i) => {
			let size = 600 + i;
			let src = 'http://unsplash.it/' + size + '/?random';
			return <div><img src={src} key={size} /></div>;
		});


		return (
			<div className="dish">
				<h2>{this.props.name}</h2>
				<Slider {...sliderSettings}>
					{images}
				</Slider>
				<div className="cook">
					<img src='http://unsplash.it/40?random' width="30" height="30" /> <h3>{this.props.cook.name}</h3>
				</div>
				<p>{this.props.description} {this.props.description} {this.props.description}</p>
			</div>
		);
	}
}

export default Dish;