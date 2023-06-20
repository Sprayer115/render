module.exports = {


  friendlyName: 'Add item to shopping basket',


  description: 'Add item to basket.',


  inputs: {
    id: {
      description: 'The id of the article to add',
      type: 'string',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs) {
    console.log("Add Element to basket......")
    let article = await Article.findOne({ id: inputs.id }).populate('variant');
    if (!this.req.session.basket) {
      console.log("Create new basket...")
      this.req.session.basket = [];
    } 
    this.req.session.basket.push(article);
    // All done.
    return;

  }


};
