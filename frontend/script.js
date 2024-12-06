const expenseForm = document.getElementById('expense-form');
const expenseTable = document.getElementById('expense-table');
const expenseChartCanvas = document.getElementById('expenseChart');

let expenses = []; // Store expenses locally for now

// Add Expense Handler
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (date && category && amount) {
        const expense = { date, category, amount };
        expenses.push(expense); // Add to local array

        // Update Table
        addExpenseToTable(expense);

        // Update Chart
        updateChart();

        // Clear Form
        expenseForm.reset();
    } else {
        alert('Please fill out all fields!');
    }
});

// Update Table
function addExpenseToTable(expense) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${expense.date}</td>
        <td>${expense.category}</td>
        <td>${expense.amount.toFixed(2)}</td>
    `;
    expenseTable.appendChild(row);
}

// Initialize Chart
const chart = new Chart(expenseChartCanvas, {
    type: 'pie',
    data: {
        labels: [], // Categories
        datasets: [{
            data: [], // Amounts
            backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Update Chart
function updateChart() {
    const categories = {};
    expenses.forEach(expense => {
        categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
    });

    chart.data.labels = Object.keys(categories);
    chart.data.datasets[0].data = Object.values(categories);
    chart.update();
}
