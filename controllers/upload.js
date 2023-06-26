const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateFile } = require('../helpers/update-file');



const uploadFile = async (req, res = response) => {

    const { entitytype, id } = req.params;
    
    //validate types
    const validTypes = ['users', 'doctors', 'hospitals'];
    if(!validTypes.includes(entitytype)){
        res.status(400).json({
            ok: false,
            msg:"bad request, type selected is not supported"
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg:"No files were uploaded."
        });
    }

    //process the img

    const file = req.files.img;

    const trimmedName = file.name.split('.');
    const extension = trimmedName[ trimmedName.length - 1 ];

    //validate extension for allowing certain types of files.
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if(!validExtensions.includes(extension)){
        res.status(400).json({
            ok: false,
            msg:"file type is not allowed"
        });
    }

    //generate the file name
    const fileName = `${ uuidv4() }.${extension}`;

    //path for saving file
    const path = `./uploads/${entitytype}/${fileName}`;

    //move the file
    file.mv(path, async (err) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: "Error when moving image"
            });
        }

        //Update Database
        await updateFile(entitytype, id, fileName )

        res.json({
            ok: true,
            msg: "File uploaded", 
            fileName
        });

    });

 
}


module.exports = {
    uploadFile
}