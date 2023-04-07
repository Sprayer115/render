/**
 * Category.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'category',
  attributes: {
    createdAt: true,
    updatedAt: true,
    id: {type: 'int', required: true},
    name: {type: 'varchar', length: 20},
    ordernumber: {type: 'int'},

  },

};

