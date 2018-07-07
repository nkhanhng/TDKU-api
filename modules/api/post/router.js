const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

const postController = require('./controller')

router.post('/', upload.single("image"), (req, res, next) => {
    req.body.imageFile = req.file

    postController
        .createPost(req.body)
        .then(results => res.send(results))
        .catch(err => console.log(err))
})

router.get('/', (req, res) => {
    postController
        .getAllPosts()
        .then(data => res.send(data))
        .catch(err => console.log(err))
})

router.get('/:postId', (req, res) => {
    postController
        .getPost(req.params.postId)
        .then(post => res.send(post))
        .catch(err => console.log)
})

router.get('/:postId/data', (req, res) => {
    postController
        .getImageData(req.params.postId)
        .then(data => {
            res.contentType(data.contentType)
            console.log(data)
            res.send(data.image)
        })
})

router.delete('/:postId', (req, res) => {
    postController
        .deletePost(req.params.postId)
        .then(data => res.send(data))
        .catch(err => console.log(err))
})

router.patch('/:postId', (req, res) => {
    postController
        .updatePost(req.params.id, req.body)
        .then(data => {
            console.log(data)
            res.send(data)})
        .catch(err => console.log(err))
})


module.exports = router