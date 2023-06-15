module.exports = {


    friendlyName: 'Index',
  
  
    description: 'Index addresses.',
  
  
    inputs: {
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs) {
      // 15.06
      sails.log.debug("addresses requested");
      addresses = await Address.find({
        where: { user:  this.req.me.id}
      });
      return addresses;
    }
  };
  