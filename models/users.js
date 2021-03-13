const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: String,
    email: String,
    porfolio: portfolioSchema,
    transactions: [transactionSchema],
    googleId: String,
}, {
    timestamps: true
});


const portfolioSchema = new Schema({
    income: Number,
    montlysavings: Number,
    monthlyPayments: [monthlyPaymentSchema],
    goal: goalSchema,
}, {
    timestamps: true
});


const monthlyPaymentSchema = new Schema({
    description: String,
    amount: Number,
}, {
    timestamps: true
});


const goalSchema = new Schema({
    description: String,
    amount: Number,
    monthlyGoalPayments: Number,
}, {
    timestamps: true
});


const transactionSchema = new Schema({
    description: String,
    amount: Number,
    category: String,
    date: Date,
}, {
    timestamps: true
});







module.exports = mongoose.model('User', userSchema);