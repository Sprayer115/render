module.exports = {


    friendlyName: 'Get details of an order',
  
  
    description: 'Get details of an order',
  
  
    inputs: {
        id: {
            description: 'The id of an order',
            type: 'string',
            required: true
          },
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs) {
        try {
            sails.log.debug("loading order...");
            var options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      
            let order = await Order.findOne({
              where: { id:  inputs.id }
            }).populate('articles');
      
              price = 0;
              for(article in order.articles) {
                let size = await ArticleVariantSize.findOne({ id: order.articles[article].article }).populate('variant');
                let a = await Article.findOne({id: size.variant.article});
                sails.log.debug(article);
                order.articles[article].image_path = size.variant.image_path;
                order.articles[article].color = size.variant.name;
                order.articles[article].name = a.name;
                order.articles[article].description = a.description;
                order.articles[article].price = a.price;
                order.articles[article].size = size.name;
                price += a.price;
              }
              order.price = price;
              address = await Address.findOne({id: order.address_id});
              order.address = address;
              var date = new Date(order.createdAt);
              order.createdAt = date.toLocaleString('de-DE', options);
            return order;
        } catch (error) {
            sails.log.debug(error);
            return this.res.serverError();
        }
    }
  };
  