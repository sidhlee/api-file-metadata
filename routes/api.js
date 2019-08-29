const router = require('express').Router();
const multer = require('multer'); //https://www.npmjs.com/package/multer
const storage = multer.memoryStorage(); //for testing on glitch. use multer.diskStorage otherwise
const upload = multer({ storage: storage }); // create multer middleware. [option]dest or storage: where to store the files

router.post('/fileanalyse', upload.single('upfile'), (req, res) => { // req.body will contain the text fields, if any
    res.json({ 
        'name': req.file.originalname,
        'type': req.file.mimetype,
        'size': req.file.size,
        'encoding': req.file.encoding,      
    });
});

module.exports = router;