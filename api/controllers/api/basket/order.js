module.exports = {


  friendlyName: 'Order',


  description: 'Order basket.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, res) {
    try {
      

      console.log("Order Basket.....")
      let basket =  this.req.session.basket
      let address =  this.req.session.address
      if(basket.length < 1) {
        console.log("basket empty");
        return false;
      }
      let order = await Order.create({
        payed: false,
        address_id: address.id,
        user: this.req.me.id
      }).fetch();
      console.log("Entity: "+ order)
      console.log("Entity Id: "+ order.id)

      for(article in basket) {
        /*size = await ArticleVariantSize.find(article.id);
        if(size == null){
          console.log("article id does not exist");
          return false;
        } Article validation disabled until shop got restructured to sizes*/ 
        article = basket[article];
        a = OrderArticle.create({
          amount: 1,
          article: article.id,
          order: order.id
        }).then(
          
        );
        s = await ArticleVariantSize.findOne({id: article.id});
        await ArticleVariantSize.updateOne({id: article.id}).set({stock: s.stock-1});
        console.log(a)
      };
      this.req.session.basket = [];
      return true;
    } catch (error) {
        console.log(error);
        return error;
    }
  }
};
