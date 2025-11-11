/* let transactions = [];

let newTransaction = {
  id: Date.now(),
  description: "Recharge",
  amount: -100,
  date: new Date().toLocaleString(),
};

transactions.push(newTransaction);
displayExpense() */

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
displayExpense(); // Show saved data on load

const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", function () {
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;

  if (description.trim() === "" || amount.trim() === "") {
    alert("pls enter some input");
    return;
  }

  const newTransaction = {
    id: Date.now(),
    description: description,
    amount: Number(amount),
    date: new Date().toLocaleString(),
  };
  transactions.push(newTransaction);

  localStorage.setItem("transactions", JSON.stringify(transactions));

  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  displayExpense();
});

function displayExpense() {
  let container = document.querySelector(".transaction-list");

  container.innerHTML = "";

  transactions.forEach(function (transaction) {
    const newDiv = document.createElement("div");

    newDiv.innerHTML = `
    <strong>💼 Description:</strong> ${transaction.description} <br>
    <strong>💰 Amount:</strong> ₹${transaction.amount} <br>
    <strong>🗓️ Date:</strong> ${transaction.date} <br>
    <button onclick="deleteTransaction(${transaction.id})">❌ Delete</button>
    
`;

    container.appendChild(newDiv);
  });
  // 1. Calculate total income
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  // 2. Calculate total expenses
  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  // 3. Balance = income + expense (expense is negative)
  const balance = income + expense;

  // 4. Update DOM
  document.getElementById("income").textContent = income;
  document.getElementById("expense").textContent = Math.abs(expense);
  document.getElementById("balance").textContent = balance;
}

function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions)); // update

  displayExpense();
}
