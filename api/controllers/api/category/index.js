module.exports = {


    friendlyName: 'Index',
  
  
    description: 'Index category.',
  
  
    inputs: {
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs) {
      // 11.06
      sails.log.debug("category requested");
      categories = await Category.find();

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
        category = categories[category];
        articles = await Article.find({
          where: { filter: { contains: category.filter } }
        }).populate(['articleVariants']);
        category.articles = articles;
      }

      sails.log.debug(categories);
      return categories;
    }
  };
  