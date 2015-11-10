import alt from 'flux/alt';
import axios from 'axios';
import config from 'config';
import { createActions } from 'alt/utils/decorators';
import { extend } from 'lodash';

@createActions(alt)
export default class UploadActions {
	constructor() {
		this.generateActions(
			'addUpload',
			'updateUpload',
			'removeUpload'
		);

		this.fileReader = new FileReader();
		this.fileReader.onloadend
	}

	postImage(data, file) {
		let url = [config.apiEndpoint, 'photos'].join('/');
		let reader = new FileReader();

		reader.onloadend = (e) => {
			let base64 = e.target.result.split(',')[1];
			let payload = extend(data, { base64: base64 })

			axios.post(url, payload)
				.then((res) => {
					file.doc = res.data;
					this.actions.updateUpload(file);
				})
				.catch((err) => {
					console.error(err);
				})
		};

		reader.readAsDataURL(file);
	}
}