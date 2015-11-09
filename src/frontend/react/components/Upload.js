import React from 'react';
import Dropzone from 'react-dropzone';
import { contains } from 'lodash';
import connectToStores from 'alt/utils/connectToStores';

import UploadStore from 'flux/stores/UploadStore';
import UploadActions from 'flux/actions/UploadActions';

import 'assets/style/dishDetail';

@connectToStores
export default class Upload extends React.Component {
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

		console.log(images);

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
	}

	onUpload() {
		this.props.uploads.forEach((upload) => {
			let data = {
				name: upload.name,
				dish_id: 1
			};

			UploadActions.postImage(data, upload);
		});
	}

	render() {
		let images = this.props.uploads.map((image) => {
			return (
					<div key={image.name} onClick={this.onRemoveImage.bind(this)}>
						<img data-name={image.name} src={image.preview} width="200"/>
					</div>
				);
		});

		return (
			<div className="images">
				<Dropzone onDrop={this.onDrop.bind(this)}>
					<div>Sleep hier u foto's, of klik hier om deze te uploaden.</div>
				</Dropzone>
				<div>
					{images}
				</div>
				<button onClick={this.onUpload.bind(this)}>uploaden</button>
			</div>
		);
	}
}