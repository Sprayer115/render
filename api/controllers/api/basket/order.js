module.exports = {


  friendlyName: 'Order',


  description: 'Order basket.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
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
    }).fetch();
    console.log("Entity: "+ order)
    console.log("Entity Id: "+ order.id)

    for(aritlce in basket) {
      /*size = await ArticleVariantSize.find(article.id);
      if(size == null){
        console.log("article id does not exist");
        return false;
      } Article validation disabled until shop got restructured to sizes*/ 
      orderArticle.create({
        amount: 1,
        article: article.id,
        order: order.id
      }).then();
      console.log(orderArticle)
    };
  }
};
