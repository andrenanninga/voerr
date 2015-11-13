import React from 'react';
import { Form } from 'formsy-react';
import axios from 'axios';
import config from 'config';

import Upload from 'react/components/Upload';
import connectToStores from 'alt/utils/connectToStores';

import CategoriesStore from 'flux/stores/CategoriesStore';
import CategoriesActions from 'flux/actions/CategoriesActions';

import AllergiesStore from 'flux/stores/AllergiesStore';
import AllergiesActions from 'flux/actions/AllergiesActions';

import UploadStore from 'flux/stores/UploadStore';
import UploadActions from 'flux/actions/UploadActions';

import Input from 'react/components/form/Input';
import TextArea from 'react/components/form/TextArea';

import { difference, every, filter } from 'lodash';

import 'assets/style/newDish';

@connectToStores
export default class NewDishPage extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			canSubmit: false,
			isSubmitting: false
		};
	}

	static getStores(props) {
		return [AllergiesStore, CategoriesStore, UploadStore];
	}

	static getPropsFromStores(props) {
		return {
			allergies: AllergiesStore.getState(),
			categories: CategoriesStore.getState(),
			uploads: UploadStore.getState()
		}
	}

	componentWillMount() {
		CategoriesActions.requestCategories();
		AllergiesActions.requestAllergies();
	}

	componentWillReceiveProps() {
		if(this.state.isSubmitting) {
			let uploads = this.props.uploads.uploads.map((file) => {
				return !!file.doc;
			});

			if(every(uploads)) {
				this.props.history.pushState({}, '', '/gerecht/' + this.state.id);
			}
		}
	}

	submit(data) {
		data.allergies = data.allergies || '';
		data.categories = data.categories || '';

		let url = [config.apiEndpoint, 'dishes'].join('/');
		let payload = {
			name: data.name,
			description: data.description
		};

		if(data.allergies) {
			payload.allergies = data.allergies.split(',');
		}

		if(data.categories) {
			payload.categories = data.categories.split(',');
		}

		this.setState({ isSubmitting: true });
		this.disableSubmit();
		axios.post(url, payload)
			.then(res => {
				let id = res.data.id;
				this.setState({ id: id });
				this.props.uploads.uploads.forEach((file) => {
					UploadActions.postImage({ name: file.name, dish_id: id }, file);
				});
			})
			.catch(e => {
				console.error(e);
			});
	}

	enableSubmit() {
		this.setState({ canSubmit: true });
	}

	disableSubmit() {
		this.setState({ canSubmit: false });
	}

	changeCategories(e) {
		let categories = this.refs.categories.getValue();
		categories = (categories === undefined) ? [] : categories.split(',');

		if(e.target.checked) {
			categories.push(e.target.dataset.id);
		}
		else {
			categories = difference(categories, [e.target.dataset.id]);
		}

		categories = filter(categories);
		this.refs.categories.setValue(categories.join(','));
	}

	changeAllergies(e) {
		let allergies = this.refs.allergies.getValue();
		allergies = (allergies === undefined) ? [] : allergies.split(',');

		if(e.target.checked) {
			allergies.push(e.target.dataset.id);
		}
		else {
			allergies = difference(allergies, [e.target.dataset.id]);
		}

		allergies = filter(allergies);
		this.refs.allergies.setValue(allergies.join(','));
	}

	enableSubmit() {
		this.setState({ canSubmit: true });
	}

	disableSubmit() {
		this.setState({ canSubmit: false });
	}

	render() {
		let error;

		if(this.props.error) {
			error = <span className="error">{this.props.error}</span>
		}

		let submitText = this.state.isSubmitting ? 'bezig met opslaan ...' : 'opslaan';

		let categories = this.props.categories.categories.map(category => {
			return <div key={category.id} className="category">
				<label>{category.name}</label>
				{category.categories.map(cat => {
					return (
						<label key={cat.id} className="minimal">
							<input data-id={cat.id} type="checkbox" onChange={this.changeCategories.bind(this)}/>
							{cat.name}
						</label>
					);
				})}
			</div>
		});

		let allergies = this.props.allergies.allergies.map(allergy => {
			return <div key={allergy.id} className="allergy">
				<label className="minimal">
					<input data-id={allergy.id} type="checkbox" onChange={this.changeAllergies.bind(this)}/>
					{allergy.name}
				</label>
			</div>
		});

		return (
			<div className="newDish">
				<h2>Nieuw gerecht</h2>
				
				<Form onSubmit={this.submit.bind(this)} onValid={this.enableSubmit.bind(this)} onInvalid={this.disableSubmit.bind(this)}>
				<Input name="name" label="Naam" type="text" required
								 validations={{ maxLength: 127, minLength: 10 }} validationErrors={{ 
								 	maxLength: 'Maximaal 127 tekens', 
								 	minLength: 'Minimaal 10 tekens' 
								 }} />
					<TextArea name="description" label="Beschrijving" required/>

					<h5>Foto's</h5>
					<Upload ref="uploads"/>

					<hr/>

					<h5>Categorieen</h5>
					<Input ref="categories" type="hidden" name="categories"/>
					<div className="categories">
						{categories}
					</div>
					
					<h5>Allergenen</h5>
					<Input ref="allergies" type="hidden" name="allergies"/>
					<div className="allergies">
						{allergies}
					</div>
					
					<hr/>

					<button type="submit" disabled={!this.state.canSubmit}>{submitText}</button>
				</Form>
			</div>
		);
	}
}