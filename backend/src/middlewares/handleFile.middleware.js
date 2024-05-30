const multer = require('multer');
"use strict";

// Create a storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const route = './src/uploads';   
        cb(null, route);
    },
    filename: function (req, file, cb) {
        let fecha = new Date();
        fecha = fecha.getFullYear() + (fecha.getMonth() + 1) + fecha.getDate() + '-' + fecha.getHours() + fecha.getMinutes() + fecha.getSeconds() + fecha.getMilliseconds();
        user = req.params.user + "#" + req.params.publicacionNombre;
        const nameFile = user + "@" + fecha + "_" + file.originalname;
        cb(null, nameFile);
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 20 },
});

module.exports = upload;