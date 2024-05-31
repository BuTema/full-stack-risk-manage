const mongoose = require('mongoose')

const riskSchema = new mongoose.Schema({
    name: String,
    description: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    resolved: Boolean,
    createdBy: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Risk', riskSchema)