/*
    api/upload
*/
const exfileUpload = require('express-fileupload');
const { Router } = require('express');

const { validateJWT } = require('../middlewares/validate-jwt');
const { uploadFile, loadFile } = require('../controllers/upload');

router = Router();

router.use( exfileUpload() );

router.put('/:entitytype/:id', validateJWT, uploadFile );

router.get('/:entitytype/:pic', loadFile );


module.exports = router;