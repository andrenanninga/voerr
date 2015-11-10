import alt from 'flux/alt';
import { createStore, bind } from 'alt/utils/decorators';

import UploadActions from 'flux/actions/UploadActions';

@createStore(alt)
export default class DishesStore {
	constructor() {
		this.uploads = [];
	}

	// @bind(UploadActions.beginUpload)
	// beginUpload(uploads) {

	// }

	@bind(UploadActions.addUpload)
	addUpload(upload) {
		this.uploads.push(upload);
	}

	@bind(UploadActions.updateUpload)
	updateUpload(updatedUpload) {
		this.uploads = this.uploads.map(upload => {
			if(upload.name === updatedUpload) {
				return updatedUpload;
			}

			return upload;
		});
	}

	@bind(UploadActions.removeUpload)
	removeUpload(upload) {
		let index = this.uploads.indexOf(upload);

		if(index !== -1) {
			this.uploads.splice(index, 1);
		}
	}
}