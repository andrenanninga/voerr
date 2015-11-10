import React from 'react';
import { Form } from 'formsy-react';

import Upload from 'react/components/Upload';
import Input from 'react/components/form/Input';
import TextArea from 'react/components/form/TextArea';

export default class NewDishPage extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			canSubmit: false
		};
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

					<button>Opslaan</button>
				</Form>
			</div>
		);
	}
}