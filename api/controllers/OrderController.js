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
      
      
      let orders = await Order.find({
        where: { user:  req.me.id }
      }).populate('articles');
      sails.log.debug(orders);

      for(order in orders) {
        sails.log.debug(order);
        price = 0;
        for(article in orders[order].articles) {
          /*orderArticle = orders[order].articles[article];
          sizeArticle = await ArticleVariantSize.findOne({id: orderArticle.article}).populate('variant');
          sails.log.debug(sizeArticle);
          article = await Article.findOne({id: sizeArticle.variant.article });
          sails.log.debug(article, "article"); */
          price += orders[order].articles[article].price;
        }
        sails.log.debug(price);
        orders[order].price = 0;
        sails.log.debug(orders[order]);
      }


    } catch (error) {
      sails.log.debug(error);
      return res.serverError();
    }
    sails.log.debug(orders, "orders");
    res.view('pages/account/orders', {
      orders: orders
    })
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




