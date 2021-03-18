const User = require("../models/user");
let currentMonth = new Date().getMonth() + 1;
let currentYear = new Date().getFullYear();

async function index(req, res) {
  try {
    let user = await User.findById(req.user.id);
    let transactions = user.transactions;
    let bills = user.portfolio.monthlyPayments;
    //----------------------------Donut Chart---------------------------//
    let spendPerCategory = sumPerCategory(transactions);
    let totalBills = sumBills(bills);

    //add spend per transaction category
    let categories = Object.keys(spendPerCategory);
    let amounts = Object.values(spendPerCategory);

    //add monthly recurring bills
    categories.push("Recurring Bills");
    amounts.push(totalBills);

    //add money put towards savings
    categories.push("Savings");
    amounts.push(user.portfolio.monthlySavings);

    //add monthly put towards goal
    categories.push("Goal Fund");
    amounts.push(user.portfolio.goal.monthlyGoalPayment);

    console.log(categories);
    console.log(amounts);

    console.log("total bills:", totalBills);
    console.log(spendPerCategory);

    //------------------------Recent Transactions-----------------------//
    // sort results by date
    transactions.sort((a, b) => b.date - a.date);

    // get most recent 5 transactions
    transactions = transactions.slice(0, 5);
    // render
    res.render("dashboard", {
      user: req.user,
      allTransactions: transactions,
      categories: categories,
      amounts: amounts,
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
