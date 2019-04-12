const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cvSchema = new Schema({
    url: String,
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

let CV = mongoose.model('CV', cvSchema)

module.exports = CV