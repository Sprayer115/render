module.exports = {


    friendlyName: 'Index',
  
  
    description: 'Index category.',
  
  
    inputs: {
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs) {
  
      return categories = await Category.find().populate('articles');
  
      
  
    }
  
  
  };
  