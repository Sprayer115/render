/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': 'is-logged-in',

  // Bypass the `is-logged-in` policy for:
  'entrance/*': true,
  'account/logout': true,
  'api/category/index': true,
  'api/basket/get': true,
  //'view-article-shopping': true,


  ArticleController: {
    '*': 'is-super-admin',
  },
  AddressController: {
    '*': 'is-logged-in',
  },

  CategoryController: {
    '*': 'is-super-admin',
  },

  VariantController: {
    '*': 'is-super-admin',
  },
  SizeController: {
    '*': 'is-super-admin',
  }
};
