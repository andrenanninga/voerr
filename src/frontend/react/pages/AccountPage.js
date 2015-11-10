import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { Form } from 'formsy-react';

import LoginStore from 'flux/stores/LoginStore';

import Input from 'react/components/form/Input';

// @connectToStores
export default class AccountPage extends React.Component {
	constructor(props) {
		super(props);
	}

	// static getStores(props) {
	// 	return [RegisterAccountStore, LoginStore];
	// }

	// static getPropsFromStores(props) {
	// 	return RegisterAccountStore.getState();
	// }

	render() {
		return (
			<div className="account">
				<h2>Account</h2>

				<div>
					<table>

					</table>
				</div>

				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Maaltijd</th>
							<th>Kok</th>
							<th>Datum</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>23</td>
							<td>Hutspot</td>
							<td>Gordon Ramsey</td>
							<td>12 januari 2016</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}