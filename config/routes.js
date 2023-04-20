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

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {view: 'pages/home' },
  //'GET /shirts': {api: 'controllers/shirt/crud@test'},


  'GET /admin/article/new': { view: 'pages/admin/article/new' },//C
  'POST /admin/article': 'ArticleController.create', 
  'GET /admin/article': 'ArticleController.find',
  'GET /admin/article/show/:id': 'ArticleController.findOne', //R
  'GET /admin/article/:id/delete': 'ArticleController.destroy',//D
  'GET /admin/article/:id/edit': 'ArticleController.edit',//U
  'POST /admin/article/:id/update': 'ArticleController.update',

  'GET /admin/variant/:id/new/': 'VariantController.new',
  'POST /admin/variant': 'VariantController.create',
  'GET /admin/variant/:id': 'VariantController.findForOne',
  'GET /admin/variant/show/:id': 'VariantController.findOne',
  'GET /admin/variant/:id/delete': 'VariantController.destroy',
  'GET /admin/variant/:id/edit': 'VariantController.edit',
  'POST /admin/variant/:id/update': 'VariantController.update',

  'GET /admin/size/:id/new': 'SizeController.new',
  'POST /admin/size': 'SizeController.create',
  'GET /admin/size/:id': 'SizeController.findForOne',
  'GET /admin/size/show/:id': 'SizeController.findOne',
  'GET /admin/size/:id/delete': 'SizeController.destroy',
  'GET /admin/size/:id/edit': 'SizeController.edit',
  'POST /admin/size/:id/update': 'SizeController.update'


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


};
