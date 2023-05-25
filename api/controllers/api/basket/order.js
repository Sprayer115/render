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

    let order = await Order.create({
      payed: false,
      address_id: address.id,
    }).fetch();
    console.log("Entity: "+ order)
    console.log("Entity Id: "+ order.id)

    basket.forEach(article =>  {
      orderArticle.create({
        amount: 1,
        article: article.id,
        order: order.id
      }).then();
      console.log(orderArticle)
    });
  }
};
