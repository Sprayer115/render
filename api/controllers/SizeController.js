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
        sails.log.debug("create size");
        let params = req.allParams();
        article = params.article;
        sails.log.debug(article);
        await ArticleVariantSize.create(params);
        res.redirect('/admin/article/' + article + "/show")
      },
    
      edit: async function (req, res) {
        let size = await ArticleVariantSize.findOne({
          id: req.params.id
        });
        res.view('pages/admin/size/edit', {
          size: size
        })
      },
      destroy: async function (req, res) {
        let size = await ArticleVariantSize.findOne({
          id: req.params.id
        }).populate('variant');
        await ArticleVariantSize.destroy({
            id: req.params.id
        });
        res.redirect('/admin/article/' + size.variant.article + "/show")
      },
      update: async function (req, res) {
        let params = req.allParams();
        await ArticleVariantSize.updateOne({
          id: req.params.id
        }).set(params);

        let size = await ArticleVariantSize.findOne({
          id: req.params.id
        }).populate('variant');
        res.redirect('/admin/article/' + size.variant.article + "/show")
      },
      new: async function(req, res) {
        let article = req.params.id;
        let variant = req.params.variant;
        res.view('pages/admin/size/new', {article: article, variant: variant});
      }
};




