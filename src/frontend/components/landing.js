import React from 'react';
import geolocator from 'geolocator';
import 'style/landing';

// geolocator needs to a global variable for the locateIp fallback method
window.geolocator = geolocator;
console.log(window);

export default class Landing extends React.Component {
	constructor() {
		super();

		this.state = {
			inputLocation: false,
			location: null
		};
	}

	onGeoSuccess(location) {
		this.setState({ location: location.address.region });
	}

	onGeoError(error) {
	}

	onChooseLocation() {
		this.setState({ inputLocation: true });
		return false;
	}

	onSubmit(e) {
		e.preventDefault();

		let food = this.refs.food.value.trim();
		let location = this.state.inputLocation ? this.refs.location.value.trim() : this.state.location;

		console.log(food, location);
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
				<input ref="location" name="location" type="text" placeholder="regio"/>
			);
		}

		return (
			<div className="landing">
				<form onSubmit={this.onSubmit.bind(this)}>
					<h2>Waar heb je zin in?</h2>
					<input ref="food" name="food" type="text" placeholder="bijv. rijst, hutspot of barbeque" />
					<div className="options">
						{location}
						<button type="submit" className="button button-primary">zoeken</button>
					</div>
				</form>
			</div>
		);
	}
}