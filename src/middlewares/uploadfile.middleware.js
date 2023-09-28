import multer from 'multer';


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1]
    if (extension === 'pdf'){
        cb(null, 'public/files/documents')
    }
    else if (extension === 'jpg' || extension === 'jpeg' || extension === 'webp' ){
        cb(null, 'public/files/products')
    }
    else if (extension === 'png'){
        cb(null, 'public/files/profiles')
    }
    else{
        cb(null, 'public/files/documents')
    }
    
  },
  filename: function (req, file, cb) {

    cb(null, 'archivo' + '-' + new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14) + '.'+ file.mimetype.split('/')[1])
  }
})

export const uploadFile = multer({ storage: storage })