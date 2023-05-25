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

    //<img src="https://wetebucket.s3.us-west-2.amazonaws.com/<%= variant.image_path %>" alt="">


  upload: async function (req, res) {
    sails.log("Upload image for variant...")
    // Define the parameters of the upload as an object
    // In this example only the path, wehre to upload the image, is set
    let params = {
      //dirname: require('path').resolve(sails.config.appPath, 'assets/images/meals/')
      adapter: require('skipper-s3'),
      key: 'AKIAXCTWFCIPLLVPH4NK',
      secret: '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',
      bucket: 'wetebucket',
      region: 'us-west-2'
    };

    let callback = async function (err, uploadedFiles) {
      if (err) {
        return res.serverError(err);
      } else {
        sails.log("Uploaded!")
      }
      let fname = require('path').basename(uploadedFiles[0].fd);
      await ArticleVariant.updateOne({ id: req.params.id }).set({ image_path:fname });
    };

      // This funvtion is called, once all files are uploaded
      // err indicates if the upload process triggered an error and has been aborted 
      // uploaded files contains an array of the files which have been uploaded, in our case only one.
      await req.file('variantImage').upload(params, callback);
      return res.redirect('/admin/variant/' + req.params.id + '/edit');
    }
};


