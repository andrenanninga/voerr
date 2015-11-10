import React from 'react';
import { Form } from 'formsy-react';

import Upload from 'react/components/Upload';
import connectToStores from 'alt/utils/connectToStores';

import CategoriesStore from 'flux/stores/CategoriesStore';
import CategoriesActions from 'flux/actions/CategoriesActions';
import AllergiesStore from 'flux/stores/AllergiesStore';
import AllergiesActions from 'flux/actions/AllergiesActions';

import Input from 'react/components/form/Input';
import TextArea from 'react/components/form/TextArea';

import 'assets/style/newDish';

@connectToStores
export default class NewDishPage extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			canSubmit: false
		};
	}

	static getStores(props) {
		return [AllergiesStore, CategoriesStore];
	}

	static getPropsFromStores(props) {
		return {
			allergies: AllergiesStore.getState(),
			categories: CategoriesStore.getState()
		}
	}

	componentWillMount() {
		CategoriesActions.requestCategories();
		AllergiesActions.requestAllergies();
	}

	submit(data) {
		console.log(this);
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

		let categories = this.props.categories.categories.map(category => {
			return <div key={category.id} className="category">
				<label>{category.name}</label>
				{category.categories.map(cat => {
					return (
						<label key={cat.id} className="minimal">
							<input type="checkbox"/>
							{cat.name}
						</label>
					);
				})}
			</div>
		});

		let allergies = this.props.allergies.allergies.map(allergy => {
			return <div key={allergy.id} className="allergy">
				<label className="minimal">
					<input type="checkbox"/>
					{allergy.name}
				</label>
			</div>
		});

		return (
			<div className="newDish">
				<h2>Nieuw gerecht</h2>
				
				<Form onSubmit={this.submit.bind(this)} onValid={this.enableSubmit.bind(this)} onInvalid={this.disableSubmit.bind(this)}>
					<Input name="name" label="Naam" type="text" required
								 validations={{ maxLength: 127 }} validationErrors={{ maxLength: 'Maximaal 127 tekens.' }} />
					<TextArea name="description" label="Beschrijving" required/>

					<label>Foto's</label>
					<Upload ref="uploads"/>
					<Input type="hidden" name="images" required validation={{ minLength: 1 }} validationErrors={{ minLength: 'Minimaal 1 foto'}} />

					<hr/>

					<label>Categorieen</label>
					<div className="categories">
						{categories}
					</div>
					
					<label>Allergenen</label>
					<div className="allergies">
						{allergies}
					</div>
					
					<hr/>

					<button>Opslaan</button>
				</Form>
			</div>
		);
	}
}