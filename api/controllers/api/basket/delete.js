module.exports = {


    friendlyName: 'remove item from shopping basket',
  
  
    description: 'remove item from basket.',
  
  
    inputs: {
      index: {
        description: 'Index of article in basket',
        type: 'string',
        required: true
      },
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs) {
      console.log("Remove Element from basket......")
      if (!this.req.session.basket) {
        console.log("basket empty...")
      } 
      if(this.req.session.basket[inputs.index] != null) {
        this.req.session.basket.splice(inputs.index, 1);
      }
      // All done.
      return;
  
    }
  
  
  };
  