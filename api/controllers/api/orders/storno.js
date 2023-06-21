
module.exports = {


    friendlyName: 'removes articles from order',
  
  
    description: 'Get details of an order',
  
  
    inputs: {
        articles: {
            description: 'array of ids',
            type: 'string',
            required: true
          },
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs) {
        try {
            sails.log.debug("storno for articles...");
            sails.log.debug(inputs.articles);

            let articles = JSON.parse(inputs.articles);
            let firstArticle = await OrderArticle.findOne({id: articles[0]}).populate('order');
            let order = firstArticle.order;
            sails.log.debug("before for");
            for (article in articles) {
              sails.log.debug(articles[article], "article");
              await OrderArticle.destroy({id: articles[article]})
            }
            let updatedOrder = await Order.findOne({id: order.id}).populate('articles');
            if(updatedOrder.articles.length < 1) {
              await Order.destroy({id: updatedOrder.id});
            }
            return true;
        } catch (error) {
            sails.log.debug(error);
            return this.res.serverError();
        }
    }
  };
  