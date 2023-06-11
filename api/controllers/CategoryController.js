/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Sails = require("sails/lib/app/Sails");

module.exports = {

  new: async function (req, res) {
    sails.log.debug("Create new category....")
    res.view('pages/admin/category/new', { "message": "", "name": "", "ordernumber": "" })
  },


  create: async function (req, res) {
    sails.log.debug("Create new category....")
    Category.create(req.allParams()).then(() => {
      res.redirect('/admin/category');
    }).catch(
      (err) => {
        sails.log.debug("Error: " + err.message)
        res.view('pages/admin/category/new', { "message": err.message, "name": req.body.name, "ordernumber": req.body.ordernumber })
      }
    );
  },

  find: async function (req, res) {
    sails.log.debug("List category....")
    categories = await Category.find();
    res.view('pages/admin/category/index', { categories });
  },

  destroyOne: async function (req, res) {
    sails.log.debug("Destroy category....")
    await Category.destroyOne({ id: req.params.id });
    res.redirect('/admin/category');
  },

 
};

