module.exports = {


  friendlyName: 'Get',


  description: 'Get basket.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    console.log("Get Basket.....")
    let result = {
      "basket": this.req.session.basket,
    }
    return result;
  }
};
