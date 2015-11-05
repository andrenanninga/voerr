import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import App from 'components/app';
import Search from 'components/search';
import SearchResults from 'components/searchResults';
import DishContainer from 'components/dishContainer';

render((
  <Router history={createBrowserHistory()}>
		<Route path="/" component={App}>
			<IndexRoute component={Search} />
			<Route path="s/:location/:term" component={SearchResults} />
			<Route path="dishes" component={DishContainer} />
		</Route>
	</Router>
), document.getElementById('content'));
