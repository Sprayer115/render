module.exports = {


    friendlyName: 'Index',
  
  
    description: 'Index addresses.',
  
  
    inputs: {
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (req, inputs) {
      // 15.06
      sails.log.debug(req.me);
      sails.log.debug("addresses requested");
      addresses = await address.find({
        where: { user:  req.me.id}
      });
      return addresses;
    }
  };
  