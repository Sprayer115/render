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
        let params = req.allParams();
        let fname = uploadedFiles[0].fd;
        params.image_path = fname
        await ArticleVariant.updateOne({
          id: req.params.id
        }).set(params);
        res.redirect('/admin/article/' + params.article + "/show");
  },
  
  new: async function(req, res) {
    sails.log.debug("show create for new variant....")
    let article = req.params.id;
    res.view('pages/admin/variant/new', {article: article});
  },

  upload: function  (req, res) {
    if(req.method === 'GET')
     return res.json({'status':'GET not allowed'});      
    
    sails.log.debug('We have entered the uploading process ');
    
    req.file('variantImage').upload({
      dirname:'../../assets/images/',
      saveAs: req.params.id +"Upload.png"}, async function(err,files){
      sails.log.debug('file is :: ', +files);
      if (err) {
        sails.log(err);
        return res.json({status: 500, error: err});  
      }       
      sails.log(files);
      //await Sleep(3000);
      //TODO: make function take longer for storage time
      res.redirect('/admin/variant/' + req.params.id + "/edit");
     });
   }
};


