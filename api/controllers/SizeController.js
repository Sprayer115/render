/**
 * SizeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//TODO : @Simon
const Sails = require("sails/lib/app/Sails");


module.exports = {

    create: async function (req, res) {
        let params = req.allParams();
        await ArticleVariantSize.create(params);
        res.redirect('/admin/variant/' . params.articleVariant)
      },
    
      findForOne: async function (req, res) {
        let sizes = await ArticleVariantSize.find({ articleVariant: req.params.id });
        res.view('/pages/admin/size/index', {
          sizes: sizes
        })
      },
    
      findOne: async function (req, res) {
        let size = await ArticleVariantSize.findOne({
          id: req.params.id
        });
        res.view('/pages/admin/size/show', {
          size: size
        })
      },
      edit: async function (req, res) {
        let size = await ArticleVariantSize.findOne({
          id: req.params.id
        });
        res.view('/pages/admin/size/edit', {
          size: size
        })
      },
      destroy: async function (req, res) {
        let size = await ArticleVariantSize.findOne({
          id: req.params.id
        });
        await ArticleVariantSize.destroy({
            id: req.params.id
        });
        res.redirect('/admin/article/' . size.articleVariant)
      },
      update: async function (req, res) {
        let params = req.allParams();
        await ArticleVariantSize.updateOne({
          id: req.params.id
        }).set(params);
        res.redirect('/admin/article/' . params.articleVariant)
      },
      new: async function(req, res) {
        let article = req.params.id;
        res.view('pages/admin/size/new', {article: article});
      }
};




