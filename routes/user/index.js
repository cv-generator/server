const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const authenticate = require('../../middlewares/authenticate')
const Multer = require('multer');
const gcsMiddlewares = require('../../middlewares/google-cloud-storage')
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
});

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/verify', authenticate)
router.post(
    '/upload',
    multer.single('image'),
    gcsMiddlewares.sendUploadToGCS,
    (req, res, next) => {
        if (req.file && req.file.gcsUrl) {
            return res.send(req.file.gcsUrl);
        }

        return res.status(500).send('Unable to upload');
    },
);

module.exports = router