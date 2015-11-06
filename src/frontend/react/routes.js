import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'react/App';
import SearchPage from 'react/pages/SearchPage';
import SearchResultPage from 'react/pages/SearchResultPage';
import SearchItemPage from 'react/pages/SearchItemPage';

export default (
	<Route name="home" path="/" component={App}>
		<IndexRoute name="search" component={SearchPage} />
		<Route name="results" path="s/:location/:term" components={SearchResultPage} />
		<Route name="dish" path="s/:location/:term/:id" components={SearchItemPage} />
	</Route>
);