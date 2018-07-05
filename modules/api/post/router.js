const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

const postController = require('./controller')

router.post('/', upload.single("image"), (req, res) => {
    req.body.userId = req.session.userInfo.id
    req.body.imageFile = req.file

    postController
        .createPost(req.body)
        .then(results => res.send(results))
        .catch(err => console.err(err))
})

router.get('/', (req, res) => {
    res.send("hello")
})

module.exports = router