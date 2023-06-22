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
    let size = await ArticleVariantSize.findOne({ id: inputs.id }).populate('variant');
    let article = await Article.findOne({id: size.variant.article});
    sails.log.debug(article);
    size.image_path = size.variant.image_path;
    size.size = size.name;
    size.color = size.variant.name;
    size.name = article.name;
    size.description = article.description;
    size.price = article.price;
    if (!this.req.session.basket) {
      console.log("Create new basket...")
      this.req.session.basket = [];
    } 
    this.req.session.basket.push(size);
    // All done.
    return;

  }


};
