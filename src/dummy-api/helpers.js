'use strict';

var _ = require('lodash');
var faker = require('faker');

// map faker functions to object
faker.locale = 'nl';
var fakers = _.map(faker, function(obj, group) {
    if(_.contains(['locale', 'locales', 'localeFallback', 'definitions', 'helpers'], group)) {
        return false;
    }

    return _.map(obj, function(func, name) {
        return [group + '_' + name, function(input) {
            var options = undefined;

            if(input && input.hash && !_.isEmpty(input.hash)) {
                options = input.hash;
            }

            return faker[group][name].call(faker, options);
        }];
    });
});

fakers = _.zipObject(_.filter(_.flatten(fakers)));

var allergies = _.shuffle([
    { id: 1, name: 'Glutenbevattende granen', description: 'tarwe, rogge, gerst, haver, spelt, khorasantarwe/ kamut' },
    { id: 2, name: 'Schaaldieren', description: '' },
    { id: 3, name: 'Eieren', description: '' },
    { id: 4, name: 'Vis', description: '' },
    { id: 5, name: 'Eieren', description: '' },
    { id: 6, name: 'Pinda', description: '' },
    { id: 7, name: 'Soja', description: '' },
    { id: 8, name: 'Melk', description: 'inclusief lactose' },
    { id: 9, name: 'Noten', description: 'amandelen, hazelnoten, walnoten, cashewnoten, pecannoten, paranoten, pistachenoten en macadamianoten' },
    { id: 10, name: 'Selderij', description: '' },
    { id: 11, name: 'Mosterd', description: '' },
    { id: 12, name: 'Sesamzaad', description: '' },
    { id: 13, name: 'Zwaveldioxide en Sulfiet', description: 'Bij concentraties van meer dan 10 mg SO2 per kilo of liter' },
    { id: 14, name: 'Lupine', description: '' },
    { id: 15, name: 'Weekdieren', description: '' },
]);

var allergy = {
    allergy_name: function(options) {
        var id = (options.data.index + options.data.count % allergies.length);
        return allergies[id - 1].name;
    },
    allergy_description: function(options) {
        var id = (options.data.index + options.data.count % allergies.length);
        return allergies[id - 1].description;
    },
}

var categories = {
    'Menugang': ['Hoofdgerecht', 'Voorgerecht', 'Nagerecht', 'Borrelhapje', 'Tussendoortje', 'Bijgerecht', 'Lunch', 'Brunch', 'Ontbijt', 'Drankje met alcohol', ],
    'Soort gerecht': ['Pasta', 'Salade ', 'Rijst ', 'Soep ', 'Brood/sandwiches ', 'Gebak ', 'Quiche ', 'Stamppot ', 'Saus/dressing ', 'Couscous ', ],
    'Recepten met': ['Vlees', 'Vis', 'Gevogelte', 'Schaal-/schelpdieren', 'Vleesvervanger', ],
    'Speciale wensen': ['Vegetarisch', 'Lactosevrij', 'Zonder vlees/vis', 'Glutenvrij', 'Zonder vlees', 'Veganistisch', 'Gezond', ],
    'Seizoen': ['Winter', 'Lente', 'Zomer', 'Herfst', ],
    'Keuken': ['Amerikaans', 'Argentijns', 'Aziatisch', 'Caribisch', 'Chinees', 'Engels', 'Frans', 'Hollands', 'Indiaas', 'Indonesisch', ]
};

var category = {
    category_menucourse: function() { return _.sample(categories['Menugang']); },
    category_typedish: function() { return _.sample(categories['Soort gerecht']); },
    category_recipewith: function() { return _.sample(categories['Recepten met']); },
    category_specialdemands: function() { return _.sample(categories['Speciale wensen']); },
    category_season: function() { return _.sample(categories['Seizoen']); },
    category_kitchen: function() { return _.sample(categories['Keuken']); },
}

var helpers = _.extend({}, fakers, allergy, category);

module.exports = helpers;