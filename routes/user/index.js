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
router.use(authenticate)
router.post(
    '/upload',
    multer.single('file'),
    gcsMiddlewares.sendUploadToGCS, userController.upload
    );
router.post('/verify', authenticate)


module.exports = router