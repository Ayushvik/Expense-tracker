// Load saved transactions from localStorage or start with an empty array
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Load data on page load
window.onload = function () {
  updateTransactionList();
  updateSummary();
};

// Add a new transaction
function addTransaction() {
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  // Validate input
  if (!date || !description || isNaN(amount) || !category) {
    alert("Please fill in all fields.");
    return;
  }

  const transaction = {
    date,
    description,
    amount,
    category,
  };

  // Add transaction to array
  transactions.push(transaction);

  // Save and update UI
  saveTransactions();
  updateTransactionList();
  updateSummary();
  clearForm();
}

// Clear the form inputs
function clearForm() {
  document.getElementById("date").value = "";
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
}

// Delete a transaction by index
function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveTransactions();
  updateTransactionList();
  updateSummary();
}

// Save transactions to localStorage
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Render the transaction list
function updateTransactionList() {
  const list = document.getElementById("transaction-list");
  list.innerHTML = "";

  transactions.forEach((transaction, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.description}</td>
      <td>${transaction.category}</td>
      <td>$${transaction.amount.toFixed(2)}</td>
      <td><button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button></td>
    `;

    list.appendChild(row);
  });
}

// Calculate and display income, expenses, and net income
function updateSummary() {
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((transaction) => {
    if (transaction.category === "Income") {
      totalIncome += transaction.amount;
    } else {
      totalExpenses += transaction.amount;
    }
  });

  const netIncome = totalIncome - totalExpenses;

  document.getElementById("total-income").textContent = totalIncome.toFixed(2);
  document.getElementById("total-expenses").textContent = totalExpenses.toFixed(2);
  document.getElementById("net-income").textContent = netIncome.toFixed(2);
}
