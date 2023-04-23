/**
 * VariantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 * 
 */
//TODO : @Simon
const Sails = require("sails/lib/app/Sails");


module.exports = {

  create: async function (req, res) {
    let params = req.allParams();
    await ArticleVariant.create(params);
    res.redirect('/admin/article/' . params.article)
  },

  findForOne: async function (req, res) {
    let variants = await ArticleVariant.find({ article: req.params.id });
    res.view('pages/admin/variant/index', {
      variants: variants
    })
  },

  findOne: async function (req, res) {
    let variant= await ArticleVariant.findOne({
      id: req.params.id
    });
    res.view('pages/admin/variant/show', {
      variant: variant
    })
  },
  edit: async function (req, res) {
    let variant = await ArticleVariant.findOne({
      id: req.params.id
    });
    res.view('pages/admin/variant/edit', {
      variant: variant
    })
  },
  destroy: async function (req, res) {
    let variant = await ArticleVariant.findOne({
      id: req.params.id
    });
    await ArticleVariant.destroy({
        id: req.params.id
    });
    res.redirect('/admin/article/' . variant.article)
  },
  update: async function (req, res) {
    let params = req.allParams();
    await ArticleVariant.updateOne({
      id: req.params.id
    }).set(params);
    res.redirect('/admin/article/' . params.article)
  },
  
  new: async function(req, res) {
    sails.log.debug("show create for new variant....")
    let article = req.params.id;
    res.view('pages/admin/variant/new', {article: article});
  }
};


