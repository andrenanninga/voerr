import React from 'react';
import DishContainer from 'components/dishContainer';
import 'style/main';

import heroImage from 'images/hero-2.jpg';

class Main extends React.Component {
	render() {
console.log(heroImage);
		return (
			<div>
				<section className="hero">
					<div className="container">
						<h1>voerr</h1>
						<div className="row">
					    <div className="nine columns">
					      <input className="u-full-width" type="text" placeholder="zoeken.." />
					    </div>
					    <div className="three columns">
	  						<input className="button-primary" type="submit" value="Zoeken" />
					    </div>
						</div>
					</div>
				</section>
				<section>
					<DishContainer />
				</section>
			</div>
		);
	}
}

export default Main;