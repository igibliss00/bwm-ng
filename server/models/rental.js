const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    title: { type: String, required: true, max: [128, 'Too long. Max is 18 characters'] },
    city: { type: String, required: true, lowercase: true },
    street: { type: String, required: true, min: [4, 'Too short. Minimium is 4 characters'] },
    category: { type: String, required: true, lowercase: true },
    image: { type: String, required: true},
    bedroom: Number,
    shared: Boolean,
    description: { type: String, required: true },
    dailyRate: Number,
    createdAt: { type: Date, default: Date.now },
    user: [{type: Schema.Types.ObjectId, ref: 'User'}]
    
});

module.exports = mongoose.model('Rental', rentalSchema);