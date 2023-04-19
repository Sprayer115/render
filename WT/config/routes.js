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
  'GET /admin/article/new': { view: 'pages/admin/article/new' },
  'POST /admin/article': {controller: 'ArticleController', action: 'create'},
  'GET /admin/article': 'ArticleController.find',
  'GET /admin/article/show/:id': 'ArticleController.find',
  'GET /admin/article/:id/delete': 'ArticleController.destroy',
  'GET /admin/article/:id/edit': 'ArticleController.edit',
  'POST /admin/article/:id/update': 'ArticleController.update'


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
