module.exports = {


    friendlyName: 'Index',
  
  
    description: 'Index category.',
  
  
    inputs: {
      filter: {
        description: 'The id of an category',
        type: 'string',
        required: false
      }
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs) {
      // 11.06
      sails.log.debug("category requested");
      if(inputs.filter > -1){
        categories = await Category.find({filter: { like: inputs.filter}});
      }
      else {
        categories = await Category.find();
      }

      /*var bar = new Promise((resolve, reject) => {
        categories.forEach(async category => {
          articles = await Article.find({
            where: { filter: { contains: category.filter } }
          });
          sails.log.debug(articles);
          category.articles = articles;
        });
        resolve();
      }); */

      for(category in categories) {
        variants = [];
        category = categories[category];
        articles = await Article.find({
          where: { filter: { like: category.filter } }
        }).populate('articleVariants');
        for( article in articles) {
          for( articleVariant in articles[article].articleVariants) {
            variant = await ArticleVariant.findOne({id: articles[article].articleVariants[articleVariant].id}).populate('variantSizes')
            variant.price = articles[article].price;
            variant.name = articles[article].name;
            variant.description = articles[article].description;
            variants.push(variant);
          }
        }
        category.articles = variants;
      }

      sails.log.debug(categories);
      return categories;
    }
  };
  