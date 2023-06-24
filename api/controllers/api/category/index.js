module.exports = {


    friendlyName: 'Index',
  
  
    description: 'Index category.',
  
  
    inputs: {
      categories: {
        description: 'The id of an category',
        type: 'json',
        required: false
      }
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs) {
      // 11.06
      sails.log.debug(inputs.categories);
      sails.log.debug("category requested");
      if(inputs.categories.length > 0){
        sails.log.debug(inputs.categories.toString(), "like")
        categories = await Category.find({filter: { like: '%' + inputs.categories + '%' }});
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
      sails.log.debug(categories);
      for(category in categories) {
        variants = [];
        category = categories[category];
        sails.log.debug(category.filter);
        articles = await Article.find({ filter: { like: '%' + category.filter + '%'}}).populate('articleVariants');
        sails.log.debug(articles);
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
  