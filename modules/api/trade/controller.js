const tradeModel = require('./model')

const sendRequest = ({ ownerId, postId, guestId }) =>
    new Promise((resolve, reject) => {
        tradeModel
            .create({
                ownerId: ownerId,
                postId: postId,
                guestId: guestId
            })
            .then(data => resolve(data))
            .catch(err => reject(err))
    })

const getRequest = (tradeId) => 
    new Promise((resolve, reject) => {
        tradeModel
            .find({
                _id: tradeId
            })
            .then(data => resolve(data))
            .catch(err => reject(err))
    })

const getAllRequest = (ownerId) => 
    new Promise((resolve, reject) => {
        tradeModel
            .find({
                ownerId: ownerId
            })
            .then(data => resolve(data))
            .catch(err => reject(err))
    })

const acceptRequest = (tradeId) =>
    new Promise((resolve, reject) => {
        tradeModel
            .findOne({
                _id: tradeId    
            })
            .update({
                status: 1
            })
            .exec()
            .then(data => resolve({success: 1, mess:"success"}))
            .catch(err => reject(err))
    })

const denyRequest = (tradeId) =>
    new Promise((resolve, reject) => {
        tradeModel
            .findOne({
                _id: tradeId    
            })
            .update({
                status: 2
            })
            .exec()
            .then(data => resolve({success: 1, mess:"success"}))
            .catch(err => reject(err))
    })


module.exports = {
    sendRequest,
    getRequest,
    acceptRequest,
    denyRequest,
    getAllRequest
}