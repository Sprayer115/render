/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

   //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /signup':             { action: 'entrance/view-signup' },
  'GET /login':              { action: 'entrance/view-login' },

  'GET /account':            { action: 'account/view-account-overview' },
  'GET /account/password':   { action: 'account/view-edit-password' },
  'GET /account/profile':    { action: 'account/view-edit-profile' },
  'GET /account/address':  'AddressController.find',
  'POST /account/address':  'AddressController.create',
  'GET /account/address/:id':  'AddressController.edit',
  'POST /account/address/:id':  'AddressController.update',
  //'GET /account/address/:id/destroy':  'AddressController.destroy',
  'GET /account/address/new':  {view: 'pages/account/address-new'},

  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  'GET /logout':                         { action: 'account/logout' },
  'POST  /login':                        { action: 'entrance/login' },
  'POST  /signup':                       { action: 'entrance/signup' },
  'POST  /signup':                       { action: 'entrance/signup' },
  'POST  /updateProfile':                { action: 'account/update-profile' },
  'POST  /updatePassword':               { action: 'account/update-password' },
  'POST  /signup':                       { action: 'entrance/signup' },



  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/home' },
  'GET /admin/article/new': { view: 'pages/admin/article/new' },//C
  'GET /homeShortSleeve': { view: 'pages/shortSleeve/homeShortSleeve'},
  //'GET /homeShortSleeve': { controller: 'ArticleController', action: 'article'},


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
  
  'POST /article/search': 'ArticleController.search', 
  'POST /admin/article': 'ArticleController.create', 
  'GET /admin/article': 'ArticleController.find',
  'GET /admin/article/:id/show': 'ArticleController.findOne', //R
  'GET /admin/article/:id/destroy': 'ArticleController.destroy',//D
  'GET /admin/article/:id/edit': 'ArticleController.edit',//U
  'POST /admin/article/:id/update': 'ArticleController.update',
  'GET /admin/article/:id/GetFileName': 'ArticleController.getFileName',

  'GET /admin/variant/:id/new/': 'VariantController.new',
  'POST /admin/variant': 'VariantController.create',
  'GET /admin/variant/:id/destroy': 'VariantController.destroy',
  'GET /admin/variant/:id/edit': 'VariantController.edit',
  'POST /admin/variant/:id/update': 'VariantController.update',
  'POST /admin/variant/:id/upload': 'VariantController.upload',

  'GET /admin/size/:id/:variant/new': 'SizeController.new',
  'POST /admin/size': 'SizeController.create',
  'GET /admin/size/:id/destroy': 'SizeController.destroy',
  'GET /admin/size/:id/edit': 'SizeController.edit',
  'POST /admin/size/:id/update': 'SizeController.update',

  'GET /admin/category/new': { controller: 'CategoryController', action:'new' },
  'POST /admin/category': { controller: 'CategoryController', action:'create' },
  'GET /admin/category/:id/destroy': { controller: 'CategoryController', action: 'destroyOne' },
  'GET /admin/category': { controller: 'CategoryController', action: 'find' },

  'GET /api/category': { action: 'api/category/index'},

  'GET /vArticleShopping': {  action: 'view-article-shopping' },

  'GET /api/basket': {  action:'api/basket/get' },
  'POST /api/basket': {  action:'api/basket/add' },

  'GET /api/category': {  action:'api/category/index' },


  'POST /api/address': {  action:'api/basket/post-address' },
  'GET /api/order': {  action:'api/basket/order' },
  
};
