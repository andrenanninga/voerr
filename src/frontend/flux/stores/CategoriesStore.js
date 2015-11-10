import alt from 'flux/alt';
import { createStore, bind } from 'alt/utils/decorators';
import { values } from 'lodash';

import CategoriesActions from 'flux/actions/CategoriesActions';

@createStore(alt)
export default class CategoriesStore {
	constructor() {
		this.categories = [];
	}

	@bind(CategoriesActions.receiveCategories)
	updateCategories(categories) {
		let nestedCategories = {};

		categories.forEach(category => {
			if(category.parent_id === null) {
				nestedCategories[category.id] = category;
				nestedCategories[category.id].categories = [];
			}
			else {
				nestedCategories[category.parent_id].categories.push(category);
			}
		});

		this.categories = values(nestedCategories);
	}
}