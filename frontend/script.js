// Ensure references to DOM elements are correct
const expenseForm = document.getElementById('expense-form');
const expenseTable = document.getElementById('expense-table-body');
const chartCanvas = document.getElementById('expense-chart'); // Chart container
const clearDataBtn = document.getElementById('clear-data-btn');
const confirmClearBtn = document.getElementById('confirm-clear-btn');

// Load expenses from localStorage or initialize as empty
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Chart instance (will be initialized later)
let expenseChart;

// Handle form submission
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Validation checks
    const isAmountValid = isFinite(amount); // Check if amount is a valid number
    const isDateValid = date.trim() !== ""; // Ensure date is not empty
    const isCategoryValid = category.trim() !== ""; // Ensure category is not empty

     // If all fields are valid
    if (isDateValid && isCategoryValid && isAmountValid) {
      const expense = { date, category, amount };

      // Add to local array
      expenses.push(expense);

      // Save to localStorage
      localStorage.setItem('expenses', JSON.stringify(expenses));

      // Update UI
      updateTable();
      updateChart();

      // Clear the form
      expenseForm.reset();
    } else {
      alert('Please fill out all fields with valid data!');
  }
});

// Function to update the table
function updateTable() {
    expenseTable.innerHTML = ''; // Clear existing rows

    // Add rows for each expense
    expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.category}</td>
            <td>${expense.amount.toFixed(2)}</td>
        `;
        expenseTable.appendChild(row);
    });
}

// Function to initialize the chart
function initializeChart() {
    const ctx = chartCanvas.getContext('2d');
    expenseChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [], // Categories
            datasets: [{
                label: 'Expenses',
                data: [], // Amounts
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            }
        } // <-- Closing the chart configuration here
    }); // <-- Closing the Chart constructor here
}

// Function to update the chart
function updateChart() {
    const categories = {};
    expenses.forEach(expense => {
        categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
    });

    const labels = Object.keys(categories);
    const data = Object.values(categories);

    // Update chart labels and data
    expenseChart.data.labels = labels;
    expenseChart.data.datasets[0].data = data;
    expenseChart.update(); // Ensure the chart is re-rendered
}

// Function to handle clearing data with confirmation
function handleClearData() {
    confirmClearBtn.style.display = 'inline-block'; // Show confirmation button
    clearDataBtn.style.display = 'none'; // Hide the "Clear Data" button
}

// Function to confirm clearing data
function confirmClear() {
    // Clear all expenses from localStorage
    localStorage.removeItem('expenses');
    expenses = [];

    // Update the UI
    updateTable();
    updateChart();

    // Hide confirmation button and show the original button again
    confirmClearBtn.style.display = 'none';
    clearDataBtn.style.display = 'inline-block';
}

// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    updateTable();
    
    // Event listener for "Clear Data" button
    clearDataBtn.addEventListener('click', handleClearData);

    // Event listener for "Confirm Clear Data" button
    confirmClearBtn.addEventListener('click', confirmClear);
});
