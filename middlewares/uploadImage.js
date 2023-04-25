const multer = require('multer');


module.exports = (
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './images/upload/imagemProduto')
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      },
    }),
    fileFilter: (req, file, cb) => {
      const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find((formatoAceito) => formatoAceito == file.mimetype);
      if (extensaoImg) {
        return cb(null, true)
      }
      else {
        return cb(null, false);
      }
    }
  })
)