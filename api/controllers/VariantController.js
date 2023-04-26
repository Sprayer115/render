/**
 * VariantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 * 
 */
//TODO : @Simon
const Sails = require("sails/lib/app/Sails");


module.exports = {

  create: async function (req, res) {
    sails.log.debug("creating variant");
    /*req.file('image').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, 'assets/images')
    }, async function whenDone(err, uploadedFiles, req, res) {
        let params = req.allParams();
        let fname = require('path').basename(uploadedFiles[0].fd);
        params.image_path = fname
        await ArticleVariant.create(params);
        res.redirect('/admin/article/' + params.article + "/show")
    }); */
    let params = req.allParams();
    params.image_path = "";
    await ArticleVariant.create(params);
    res.redirect('/admin/article/' + params.article + "/show")
  },




  edit: async function (req, res) {
    let variant = await ArticleVariant.findOne({
      id: req.params.id
    });
    res.view('pages/admin/variant/edit', {
      variant: variant
    })
  },
  destroy: async function (req, res) {
    let variant = await ArticleVariant.findOne({
      id: req.params.id
    });
    await ArticleVariant.destroy({
        id: req.params.id
    });
    res.redirect('/admin/article/' + variant.article + "/show")
  },



  update: async function (req, res) {
    sails.log.debug("updating variant");
    req.file('image').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000,
    }, async function whenDone(err, uploadedFiles) {
        if (err) {
          return res.serverError(err);
        }
    
        // If no files were uploaded, respond with an error.
        if (uploadedFiles.length === 0){
          return res.badRequest('No file was uploaded');
        }
        let params = req.allParams();
        let fname = uploadedFiles[0].fd;
        params.image_path = fname
        await ArticleVariant.updateOne({
          id: req.params.id
        }).set(params);
        res.redirect('/admin/article/' + params.article + "/show")
    });
    
  },
  
  new: async function(req, res) {
    sails.log.debug("show create for new variant....")
    let article = req.params.id;
    res.view('pages/admin/variant/new', {article: article});
  }
};


