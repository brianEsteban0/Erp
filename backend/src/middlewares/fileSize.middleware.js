const fileSizeError = (err, req, res, next) => { 
    if (err) {
        return res.status(400).json({
            message: 'El tamaño del archivo es muy grande',
        });
    }else{
        next();
    }
};

module.exports = fileSizeError;