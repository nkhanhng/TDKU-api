const postModel = require("./model");
const fs = require("fs");

const createPost = ({title, description, userid, imageFile}) => 
    new Promise((resolve, reject) => {
        postModel
            .create({
                image: fs.readFileSync(imageFile.path),
                contentType: imageFile.mimetype,
                title: title,
                description: description,
                createBy: userid
            })
            .then(data => resolve({id: data._id}))
            .catch(err => reject(err))
    })

const getAllPosts = () => 
    new Promise((resolve, reject) => {
        postModel
            .find({active: true})
            .select("_id title image description")
            .exec()
            .then(data => {
                resolve(data.map(img =>
                    Object.assign({}, img._doc, {
                        imageUrl: `/api/posts/${img._id}/data`
                    })
                ))
            })
            .catch(err => reject(err))
    })

const getPost = (id) =>
    new Promise((resolve, reject) => {
        postModel
            .update({active: true})
            .then(result => 
                postModel
                    .findOne({
                        active: true,
                        _id: id
                    })
                    .select("_id title description")
                    .exec()
            )
            .then(data =>
                resolve(
                    Object.assign({}, data._doc, { imageUrl: `/api/posts/${id}/data`})
                )
            )
    })

const getImageData = id =>
  new Promise((resolve, reject) => {
    postModel
      .findOne({
        active: true,
        _id: id
      })
      .select("image contentType")
      .exec()
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    getImageData
}