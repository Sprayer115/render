module.exports = {


    friendlyName: 'Gets all orders from user',
  
  
    description: 'Gets all orders from user',
  
  
    inputs: {
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs) {
        try {
            sails.log.debug("loading order...");
            var options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      
            let orders = await Order.find({
              where: { user:  this.req.me.id }
            }).populate('articles');
      
            for(order in orders) {
              price = 0;
              for(article in orders[order].articles) {
                sails.log.debug(orders[order].articles[article])
                let size = await ArticleVariantSize.findOne({ id: orders[order].articles[article].article }).populate('variant');
                sails.log.debug(size)
                let a = await Article.findOne({id: size.variant.article});
                size.image_path = size.variant.image_path;
                size.color = size.variant.name;
                size.name = a.name;
                size.description = a.description;
                size.price = a.price;
                price += size.price;
                orders[order].articles[article] = size;
              }
              orders[order].price = price;
              var date = new Date(orders[order].createdAt);
              orders[order].createdAt = date.toLocaleString('de-DE', options);
            }
            sails.log.debug(orders, "orders");
            return orders;
        } catch (error) {
            sails.log.error(error);
            return error;
        }
    }
  };
  