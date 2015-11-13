import React from 'react';
import { transitionTo } from 'react-router';
import geolocator from 'geolocator';
import classNames from 'classnames';
import slug from 'http-slug';	

import 'assets/style/search';

import splashVideo from 'assets/videos/steak.mp4';
import splashImage from 'assets/images/steak.jpg';

// geolocator needs to a global variable for the locateIp fallback method
window.geolocator = geolocator;

export default class SearchPage extends React.Component {
	constructor() {
		super();

		this.state = {
			inputLocation: false,
			location: null,
			formErrors: {
				food: false,
				location: false
			}
		};
	}

	onGeoSuccess(location) {
		this.setState({ location: location.address.region });
	}

	onGeoError(error) {
	}

	onChooseLocation(e) {
		e.preventDefault();
		this.setState({ inputLocation: true });
	}

	onSubmit(e) {
		e.preventDefault();

		let food = this.refs.food.value.trim().toLowerCase();
		let location = this.state.inputLocation ? this.refs.location.value.trim().toLowerCase() : this.state.location.toLowerCase();

		if(!location) {
			this.setState({ formErrors: { location: true }});
		}
		else {
			this.setState({ formErrors: { food: false, location: false }});
		}

		if(food.length === 0) {
			food = '-';
		}
		else {
			food = slug(food);
		}

		this.props.history.pushState({}, '', '/s/' + slug(location) + '/' + food + '/');
	}

	componentWillMount() {
		let options = { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 };
		geolocator.locate(
			this.onGeoSuccess.bind(this), 
			this.onGeoError.bind(this), 
			true, options, false
		);
	}

	render() {
		let location;
		let onChooseLocation = this.onChooseLocation.bind(this);
		let foodClass = classNames({ error: this.state.formErrors.food });
		let locationClass = classNames({ error: this.state.formErrors.location });

		if(this.state.location) {
			location = (
				<span className="location">
					in regio <span className="highlight">{this.state.location}</span>, of kies een <a href="#" onClick={onChooseLocation}>andere locatie</a>
				</span>
			);
		}
		else {
			location = (
				<span className="location">kies een <a href="#" onClick={onChooseLocation}>locatie</a></span>
			);
		}

		if(this.state.inputLocation) {
			location = (
				<input ref="location" name="location" type="text" placeholder="regio" className={locationClass}/>
			);
		}

		return (
			<div className="search">
				<div className="video">
					<video poster="splashImage" autoPlay="autoplay" loop="loop" width="480" height="320">
						<source src={splashVideo} type="video/mp4"/>
					</video>
				</div>
				<form onSubmit={this.onSubmit.bind(this)}>
					<div className="block">
						<h2>waar heb je zin in?</h2>
						<input ref="food" name="food" type="text" placeholder="bijv. rijst, hutspot of barbeque" className={foodClass} />
						<div className="options">
							{location}
							<button type="submit" className="button button-primary">zoeken</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}