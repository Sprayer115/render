/**
 * AddressController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
//TODO : @Simon
const Sails = require("sails/lib/app/Sails");


module.exports = {

  create: async function (req, res) {
    sails.log.debug("create new address....")
    let params = req.allParams();
    params.user = req.me.id;
    await Address.create(params);
    res.redirect('/account/addresses')
  },

  find: async function (req, res) {
    sails.log.debug("get all addresses from user....")
    let addresses = await Address.find({
      where : {user: req.me.id}
    });
    res.view ('pages/account/addresses', { addresses: addresses } );
  },

  findOne: async function (req, res) {
    sails.log.debug("search specific article....")
    let article = await Article.findOne({
      id: req.params.id
    }).populate('articleVariants');
    // cross joining not supported by framework
    for (let [index, variant] of article.articleVariants.entries()) {
      let sizes = await ArticleVariantSize.find({variant: variant.id});
      article.articleVariants[index].variantSizes = sizes;
    }
    res.view('pages/admin/article/show', {
      article: article
    })
  },
  edit: async function (req, res) {
    sails.log.debug("show edit for article....")
    let article = await Article.findOne({
      id: req.params.id
    });
    res.view('pages/admin/article/edit', {
      article: article
    })
  },
  destroy: async function (req, res) {
    sails.log.debug("delete article....")
    let article = await Article.destroy({
      id: req.params.id
    });
    res.redirect('/admin/article')
  },
  update: async function (req, res) {
    sails.log.debug("update article....")
    let params = req.allParams();
    await Article.updateOne({
      id: req.params.id
    }).set(params);
    res.redirect('/admin/article')
  }
};




