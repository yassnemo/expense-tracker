// Ensure references to DOM elements are correct
const expenseForm = document.getElementById('expense-form');
const expenseTable = document.getElementById('expense-table-body');
const chartCanvas = document.getElementById('expense-chart'); // Chart container

// Expenses array to hold added expenses
const expenses = [];

// Chart instance (will be initialized later)
let expenseChart;

// Handle form submission
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (date && category && !isNaN(amount)) {
        const expense = { date, category, amount };

        // Add to local array
        expenses.push(expense);

        // Update UI
        updateTable();
        updateChart();

        // Clear the form
        expenseForm.reset();
    } else {
        alert('Please fill out all fields!');
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
        }
    });
}

// Function to update the chart
function updateChart() {
    const categories = {};
    expenses.forEach(expense => {
        categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
    });

    const labels = Object.keys(categories);
    const data = Object.values(categories);

    expenseChart.data.labels = labels;
    expenseChart.data.datasets[0].data = data;
    expenseChart.update();
}

// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', initializeChart);
