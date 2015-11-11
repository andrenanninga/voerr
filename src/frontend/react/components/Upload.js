import React from 'react';
import Dropzone from 'react-dropzone';
import { contains } from 'lodash';
import connectToStores from 'alt/utils/connectToStores';

import UploadStore from 'flux/stores/UploadStore';
import UploadActions from 'flux/actions/UploadActions';

import 'assets/style/upload';

@connectToStores
export default class Upload extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			startUpload: false
		};
	}

	static getStores(props) {
		return [UploadStore];
	}

	static getPropsFromStores(props) {
		return UploadStore.getState();
	}

	onDrop(files) {
		// remove all files that are not images
		let images = files.filter((file) => {
			return contains(['image/png', 'image/jpg', 'image/jpeg', 'image/gif'], file.type);
		});

		images.forEach((image) => {
			UploadActions.addUpload(image);
		});
	}

	onRemoveImage(e) {
		let name = e.target.dataset.name;

		// remove the image based on its name
		let image = this.props.uploads.filter((image) => {
			return image.name === name;
		});

		UploadActions.removeUpload(image[0]);

		e.stopPropagation();
	}
	
	render() {
		let message;
		let images = this.props.uploads.map((image) => {
			let style = {
				backgroundImage: 'url(' + image.preview + ')'
			};

			return (
					<div key={image.name} data-name={image.name} onClick={this.onRemoveImage.bind(this)} style={style}>
					</div>
				);
		});

		if(this.props.uploads.length === 0){
			message = <span>Klik hier, of sleep u foto's om deze te uploaden</span>;
		}

		return (
			<div className="upload">
				<Dropzone className="dropzone" onDrop={this.onDrop.bind(this)}>
					{message}
					{images}
				</Dropzone>
			</div>
		);
	}
}