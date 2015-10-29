import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleMap } from 'react-google-maps';
import DishContainer from 'components/dishContainer';
import 'style/test';


class Test extends React.Component {
	render() {
		return (
			<div className="test">
				<div className="header">
					<div className="menu">
						<h1>voerr</h1>
						<a href="/">login</a>
					</div>
					<div className="search">
						<input className="search-input" type="text" />
						<input className="search-button" type="submit" />
					</div>
				</div>
				<div className="content">
					<div className="map">
						<GoogleMap 
							containerProps={{
								style: {
									position: 'absolute',
									top: '0',
									right: '0',
									bottom: '0',
									left: '0',
								} 
							}} 
							ref="map"
							defaultZoom={8}
				  		defaultCenter={{lat: -34.397, lng: 150.644}}>
				  	</GoogleMap>
					</div>

					<div className="dishes">
						<h1>dishes</h1>
					</div>
				</div>
			</div>
		);
	}
}

export default Test;