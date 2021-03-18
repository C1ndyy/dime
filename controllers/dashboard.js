const User = require("../models/user");
let currentMonth = new Date().getMonth() + 1;
let currentYear = new Date().getFullYear();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function index(req, res) {
  try {
    let user = await User.findById(req.user.id);
    let transactions = user.transactions;
    let bills = user.portfolio.monthlyPayments;
    //----------------------------Donut Chart 1---------------------------//
    let spendPerCategory = sumPerCategory(transactions);

    //Dataset for Chart 1
    let labels1 = Object.keys(spendPerCategory);
    let data1 = Object.values(spendPerCategory);

    //----------------------------Donut Chart 2---------------------------//

    const totalTransactions = data1.reduce((sum, b) => sum + b, 0);
    let totalBills = sumBills(bills);
    let remaining =
      user.portfolio.income -
      totalBills -
      totalTransactions -
      user.portfolio.monthlySavings -
      user.portfolio.goal.monthlyGoalPayments;

    let labels2 = [
      "Transactions",
      "Recurring Bills",
      "Savings",
      "Goal Fund",
      "Remaining Budget",
    ];
    let data2 = [
      totalTransactions,
      totalBills,
      user.portfolio.monthlySavings,
      user.portfolio.goal.monthlyGoalPayments,
      remaining.toFixed(2),
    ];

    let datasets = [
      {
        label: "My",
        data: 12,
        backgroundColor: ["rgb(23,99,132)"],
      },
      {
        label: "first ",
        data: 14,
        backgroundColor: ["rgb(99,99,132)"],
      },
      {
        label: "dataset",
        data: 12,
        backgroundColor: ["rgb(255,99,132)"],
      },
    ];

    //------------------------Recent Transactions-----------------------//
    // sort results by date
    transactions.sort((a, b) => b.date - a.date);

    // get most recent 5 transactions
    transactions = transactions.slice(0, 5);
    // render
    res.render("dashboard", {
      user: req.user,
      month: monthNames[currentMonth - 1],
      allTransactions: transactions,
      labels1,
      data1,
      labels2,
      data2,
      datasets,
    });
  } catch (err) {
    console.log(err);
    return res.send("there was an error");
  }
}

function sumPerCategory(transactions) {
  let currentMonthTransactions = transactions.reduce((categories, curr) => {
    if (
      curr.date.getMonth() + 1 == currentMonth &&
      curr.date.getFullYear() == currentYear
    ) {
      if (curr.category in categories) {
        categories[curr.category] += curr.amount;
      } else {
        categories[curr.category] = curr.amount;
      }
    }
    return categories;
  }, {});
  return currentMonthTransactions;
}

function sumBills(bills) {
  let currentMonthBills = bills.reduce((categories, curr) => {
    return (categories += curr.amount);
  }, 0);
  return currentMonthBills;
}

module.exports = {
  index,
};
