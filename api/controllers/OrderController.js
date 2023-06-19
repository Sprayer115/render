/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
//TODO : @Simon
const Sails = require("sails/lib/app/Sails");


module.exports = {

  find: async function (req, res) {
    try {
      var options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };

      let orders = await Order.find({
        where: { user:  req.me.id }
      }).populate('articles');

      for(order in orders) {
        price = 0;
        for(article in orders[order].articles) {
          /*orderArticle = orders[order].articles[article];
          sizeArticle = await ArticleVariantSize.findOne({id: orderArticle.article}).populate('variant');
          sails.log.debug(sizeArticle);
          article = await Article.findOne({id: sizeArticle.variant.article });
          sails.log.debug(article, "article"); */
          art = await Article.findOne({id: orders[order].articles[article].article})
          price += art.price;
        }
        orders[order].price = price;
        var date = new Date(orders[order].createdAt);
        orders[order].createdAt = date.toLocaleString('de-DE', options);
      }
      sails.log.debug(orders, "orders");
      res.view('pages/account/orders', {
        orders: orders
      })
    } catch (error) {
      sails.log.debug(error);
      return res.serverError();
    }
    
  },

  findOne: async function (req, res) {
    let article = await Article.findOne({
      id: req.params.id
    }).populate('articleVariant').populate('articleVariant.articleVariantSize');
    res.view('pages/admin/article/index', {
      article: article
    })
  },
  edit: async function (req, res) {
    let article = await Article.findOne({
      id: req.params.id
    }).populate('articleVariant').populate('articleVariant.articleVariantSize');
    res.view('pages/admin/article/edit', {
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
    res.view('pages/shirt/index', {shirts : shirts});
  }
};




