const postModel = require("./model");
const fs = require("fs");

const createPost = ({title, description, userid, imageFile}) => 
    new Promise((resolve, reject) => {
        postModel
            .create({
                image: fs.readFileSync(imageFile.path),
                title: title,
                description: description,
                createBy: userid
            })
            .then(data => resolve({id: data._id}))
            .catch(err => reject(err))
    })

module.exports = {
    createPost
}