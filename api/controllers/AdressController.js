/**
 * AdressController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
//TODO : @Simon
const Sails = require("sails/lib/app/Sails");


module.exports = {

  create: async function (req, res) {
    let params = req.allParams();
    await Article.createEach([params]);
    res.redirect('/admin/article')
  },

  find: async function (req, res) {
    let articles = await Article.find();
    res.view('/pages/admin/article/index', {
      articles: articles
    })
  },

  findOne: async function (req, res) {
    let article = await Article.findOne({
      id: req.params.id
    }).populate('articleVariant').populate('articleVariant.articleVariantSize');
    res.view('/pages/admin/article/index', {
      article: article
    })
  },
  edit: async function (req, res) {
    let article = await Article.findOne({
      id: req.params.id
    }).populate('articleVariant').populate('articleVariant.articleVariantSize');
    res.view('/pages/admin/article/edit', {
      article: article
    })
  },
  destroy: async function (req, res) {
    let articles = await Article.destroy({
      id: req.params.id
    });
    res.redirect('/admin/article')
  },
  update: async function (req, res) {
    let params = req.allParams();
    await Article.updateOne({
      id: req.params.id
    }).set(params);
    res.redirect('/admin/article')
  },

  search: async function (req, res) {
    // possible filters : price and custom
    let params = req.allParams();
    let shirts = await article.find({
        where: { price : {'<=' : params.filter['price']}},
        or: [
            { name : {contains: params.search}},
            { description : {contains: params.search}}
        ]
     })
    res.view('/pages/shirt/index', {shirts : shirts});
  }
};




