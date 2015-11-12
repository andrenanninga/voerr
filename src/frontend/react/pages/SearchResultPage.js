import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { filter, values, reduce, times } from 'lodash';
import { Link } from 'react-router';

import SearchStore from 'flux/stores/SearchStore';
import SearchActions from 'flux/actions/SearchActions';

import Dish from 'react/components/Dish';	

import 'assets/style/searchResults';
import 'assets/style/_allergies';
import 'assets/style/_hearts';

@connectToStores
export default class SearchResultPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			location: props.params.location,
			term: props.params.term
		}

		if(props.params.term === '-') {
			this.state.term = '';
		}
	}

	static getStores(props) {
		return [SearchStore];
	}

	static getPropsFromStores(props) {
		return SearchStore.getState();
	}

	componentWillMount() {
		SearchActions.requestSearch(
			this.state.term,
			this.state.location
		);
	}

	render() {
		let allergiesMap = {
			1: 'wheat', 2: 'shellfish', 3: 'egg', 4: 'fish', 
			6: 'peanut', 7: 'soy', 8: 'milk', 9: 'nuts'
		};

		let dishes = this.props.dishes.map(dish => {
			let url = '/s/' + this.props.params.location + '/' + this.props.params.term + '/' + dish.id;
			let hearts = [];
			let allergies;

			if(dish.allergies.length) {
				allergies = dish.allergies.map(allergy => {
					if(allergiesMap[allergy.id]) {
						return <span title={allergy.name} key={allergy.id} className={'allergy ' + allergiesMap[allergy.id]}></span>;
					}
					return false;
				});

				allergies = filter(allergies);
			}

			let average = 0;
			if(dish.reviews) {
				average = reduce(dish.reviews, ((n, r) => { return n + r.rating; }), 0) / dish.reviews.length;
			}

			console.log(dish);

			times(5, (n) => {
				if(n < average) {
					hearts.push(<div className="heart full"></div>);
				}
				else {
					hearts.push(<div className="heart"></div>);
				}
			});

			return (
				<div className="dish" key={dish.id}>
					<Link to={url}>
						<div className="image aspect_16-10" style={{ backgroundImage: 'url(/static/images/' + dish.photos[0] + ')' }}></div>
						<div className="image avatar aspect_1-1" style={{ backgroundImage: 'url(/static/images/' + dish.cook.avatar + ')' }}></div>
						<div className="rating">
							{hearts}
						</div>
						<h2>{dish.name}</h2>
					</Link>
				</div>
			);
		});

		if(dishes.length === 0) {
			dishes = <span>Geen resultaten gevonden</span>;
		}

		return <div className="searchResults">{dishes}</div>
	}
}