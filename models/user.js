const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monthlyPaymentSchema = new Schema(
  {
    description: String,
    amount: Number,
  },
  {
    timestamps: true,
  }
);

const goalSchema = new Schema(
  {
    description: {
      type: String,
      default: null,
    },
    amount: {
      type: Number,
      default: 0,
    },
    monthlyGoalPayments: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const transactionSchema = new Schema(
  {
    description: String,
    amount: Number,
    category: String,
    date: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const portfolioSchema = new Schema(
  {
    income: {
      type: Number,
      default: 0,
    },
    monthlySavings: {
      type: Number,
      default: 0,
    },
    monthlyPayments: [monthlyPaymentSchema],
    goal: {
      type: goalSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = new Schema(
  {
    name: String,
    email: String,
    portfolio: {
      type: portfolioSchema,
      default: () => ({}),
    },

    transactions: [transactionSchema],
    googleId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
