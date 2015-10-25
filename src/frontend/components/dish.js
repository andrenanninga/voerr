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
			centerMode: true,
			centerPadding: '60px',
			lazyLoad: true
		};

		let n = Array.apply(null, {length: 50}).map(Number.call, Number);
		n = _.shuffle(n);
		n = n.slice(0, Math.random() * 4 + 2);

		let images = _.map(n, (i) => {
			let size = 500 + i;
			let src = 'http://unsplash.it/' + size + '/?random';
			return <div><img src={src} width="500" height="500" key={size} /></div>;
		});

		return (
			<div className="dish">
				<Slider {...sliderSettings}>
					{images}
				</Slider>
				<h2>{this.props.name}</h2>
				<p>{this.props.description}</p>
			</div>
		);
	}
}

export default Dish;