export function calculateBalance(transactions) {
  return transactions.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount : acc - t.amount;
  }, 0);
}

export function calculateIncome(transactions) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
}

export function calculateExpense(transactions) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
}
