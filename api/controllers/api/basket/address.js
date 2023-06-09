module.exports = {


  friendlyName: 'Store address in session',


  description: '',


  inputs: {
    address: {
      description: 'The id of the address to store in session',
      type: 'string',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs) {
    sails.log.debug("searching for address id")
    address = await Address.findOne(inputs.address);
    this.req.session.address = address;
    return true;
  }
};
