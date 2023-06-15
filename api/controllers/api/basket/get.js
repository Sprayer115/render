module.exports = {


  friendlyName: 'Get',


  description: 'Get basket.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    console.log("Get Basket.....", this.req.session)
    let result = {
      "basket": this.req.session.basket,
      "address": this.req.session.address,
    }
    return result;
  }
};
