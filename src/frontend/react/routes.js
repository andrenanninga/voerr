import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'react/App';
import Login from 'react/components/Login';
import SearchPage from 'react/pages/SearchPage';
import SearchResultPage from 'react/pages/SearchResultPage';
import SearchItemPage from 'react/pages/SearchItemPage';
import Upload from 'react/components/Upload';

export default (
	<Route name="home" path="/" component={App}>
		<IndexRoute name="search" component={SearchPage} />
		<Route name="login" path="/login" components={Login}/>
		<Route name="results" path="s/:location/:term" components={SearchResultPage} />
		<Route name="dish" path="s/:location/:term/:id" components={SearchItemPage} />
		<Route path="upload" components={Upload}/>
	</Route>
);