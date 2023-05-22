/**
 * AddressController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
//TODO : @Simon
const Sails = require("sails/lib/app/Sails");


module.exports = {

  create: async function (req, res) {
    sails.log.debug("create new address....")
    let params = req.allParams();
    params.user = req.me.id;
    if(params.user == null) {
      return res.redirect('/login');
    }
    await Address.create(params);
    res.redirect('/account/address')
  },

  find: async function (req, res) {
    sails.log.debug("get all addresses from user....")
    let addresses = await Address.find({
      where : {user: req.me.id}
    });
    res.view ('pages/account/address', { addresses: addresses } );
  },

  edit: async function (req, res) {
    sails.log.debug("show edit for address....")
    let address = await Address.findOne({
      id: req.params.id
    });
    if(address.user != req.me.id) {
      return res.unauthorized();
    }
    res.view('pages/account/address-edit', {
      address: address
    })
  },
  destroy: async function (req, res) {
    sails.log.debug("delete address....")
    let address = await Address.findOne({
      id: req.params.id
    });
    if(address.user != req.me.id) {
      return res.unauthorized();
    }
    await Address.destroy({
      id: req.params.id
    });
    res.redirect('/account/address')
  },
  update: async function (req, res) {
    sails.log.debug("update address....")
    let params = req.allParams();
    let address = await Address.findOne({
      id: req.params.id
    });
    if(address.user != req.me.id) {
      return res.unauthorized();
    }
    await Address.updateOne({
      id: req.params.id
    }).set(params);
    res.redirect('/account/address')
  }
};




