module.exports = {


  friendlyName: 'Store address in session',


  description: '',


  inputs: {
    id: {
      description: 'The id of the address to store in session',
      type: 'string',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs) {
    cconsole.log("searching for address id")
    let address = await Address.findOne({ id: inputs.id })

    this.req.session.address = address;
    return;
  }


};
