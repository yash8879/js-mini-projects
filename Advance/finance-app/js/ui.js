// ui.js
export function renderTransactions(transactions) {
  const list = document.getElementById("transaction-list");
  list.innerHTML = "";

  transactions.forEach((tx) => {
    const li = document.createElement("li");
    li.innerHTML = `${tx.title} - ₹${tx.amount} [${tx.type}] on ${tx.date}
    <div class = "action-buttons">
    <button class="edit-btn" data-id="${tx.id}">Edit</button>
    <button class="delete-btn" data-id="${tx.id}">&#128465;</button>
    </div>
`;
    list.appendChild(li);
  });
}
export function renderSummary(balance, income, expense) {
  document.getElementById("total-balance").textContent = `₹${balance}`;
  document.getElementById("total-income").textContent = `₹${income}`;
  document.getElementById("total-expense").textContent = `₹${expense}`;
}
