const expenseForm = document.getElementById('expense-form');
const expenseTable = document.getElementById('expense-table');
const expenseChartCanvas = document.getElementById('expenseChart');

let expenses = []; // Will be populated from the backend

// Fetch Expenses from Backend on Page Load
window.onload = fetchExpenses;

// Fetch Expenses
function fetchExpenses() {
    fetch('http://127.0.0.1:5000/get_expenses')
        .then(response => response.json())
        .then(data => {
            expenses = data; // Update the local array
            updateTable();
            updateChart();
        })
        .catch(error => console.error('Error fetching expenses:', error));
}

// Add Expense Handler
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (date && category && amount) {
        const expense = { date, category, amount };

        // Send to Backend
        fetch('http://127.0.0.1:5000/add_expense', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expense),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    // Add to local array and update UI
                    expenses.push(expense);
                    updateTable();
                    updateChart();

                    // Clear Form
                    expenseForm.reset();
                } else {
                    alert('Error adding expense: ' + data.message);
                }
            })
            .catch(error => console.error('Error adding expense:', error));
    } else {
        alert('Please fill out all fields!');
    }
});

// Update Table
function updateTable() {
    expenseTable.innerHTML = ''; // Clear existing rows

    expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.category}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td><button class="delete-btn" data-id="${expense.id}">Delete</button></td>
        `;
        expenseTable.appendChild(row);
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', handleDelete);
    });
}

// Handle Deleting Expense
function handleDelete(e) {
    const id = e.target.getAttribute('data-id');
    
    fetch(`http://127.0.0.1:5000/delete_expense/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Remove the expense from the local array and update UI
            expenses = expenses.filter(expense => expense.id !== parseInt(id));
            updateTable();
            updateChart();
        } else {
            alert('Error deleting expense: ' + data.message);
        }
    })
    .catch(error => console.error('Error deleting expense:', error));
}

// Initialize Chart
const chart = new Chart(expenseChartCanvas, {
    type: 'pie',
    data: {
        labels: [], // Categories
        datasets: [{
            data: [], // Amounts
            backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff'],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
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
