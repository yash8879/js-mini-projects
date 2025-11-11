import { saveTransactions, loadTransactions } from "./storage.js";
import {
  calculateBalance,
  calculateIncome,
  calculateExpense,
} from "./finance.js";
import { renderTransactions, renderSummary } from "./ui.js";

let transactions = loadTransactions(); // Load from localStorage
let editId = null; // 🆕 This tracks if you're editing something

export function init() {
  console.log("App started");
}
document
  .getElementById("transaction-list")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const id = Number(e.target.dataset.id);
      transactions = transactions.filter((t) => t.id !== id);
      saveTransactions(transactions);
      renderTransactions(transactions);
      renderSummary(
        calculateBalance(transactions),
        calculateIncome(transactions),
        calculateExpense(transactions)
      );
    }
    if (e.target.classList.contains("edit-btn")) {
      const id = Number(e.target.dataset.id); // ✅ define id here
      editId = id;

      const tx = transactions.find((t) => t.id === id);
      if (tx) {
        document.getElementById("title").value = tx.title;
        document.getElementById("amount").value = tx.amount;
        document.getElementById("type").value = tx.type;
        document.getElementById("date").value = tx.date;

        const submitBtn = document.querySelector("#transaction-form button");
        if (editId) {
          submitBtn.textContent = "Update";
        } else {
          submitBtn.textContent = "Add";
        }

        // Remove the old transaction so it can be re-added on submit
        saveTransactions(transactions);
        renderTransactions(transactions);
        renderSummary(
          calculateBalance(transactions),
          calculateIncome(transactions),
          calculateExpense(transactions)
        );
      }
    }
  });

document
  .getElementById("transaction-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title");
    const amount = document.getElementById("amount");
    const type = document.getElementById("type");
    const date = document.getElementById("date");

    let transaction = {
      id: editId || Date.now(), //  use old ID if editing, otherwise generate new
      title: title.value,
      amount: Number(amount.value),
      type: type.value,
      date: date.value,
    };
    if (editId) {
      // Update existing transaction by replacing it
      const index = transactions.findIndex((t) => t.id === editId);
      if (index !== -1) {
        transactions[index] = transaction;
      }
    } else {
      // Add new
      transactions.push(transaction);
    }
    console.log(transaction);
    saveTransactions(transactions); // Save to localStorage

    renderTransactions(transactions);
    renderSummary(
      calculateBalance(transactions),
      calculateIncome(transactions),
      calculateExpense(transactions)
    );

    editId = null;
    document.querySelector("#transaction-form button").textContent = "Add";

    title.value = "";
    amount.value = "";
    type.value = "income"; // or default value
    date.value = "";

    editId = null; // 🆕 Reset back to null
  });

renderTransactions(transactions); // Render saved ones on load
renderSummary(
  calculateBalance(transactions),
  calculateIncome(transactions),
  calculateExpense(transactions)
);
