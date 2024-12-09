// Ensure references to DOM elements are correct 
const expenseForm = document.getElementById('expense-form');
const expenseTable = document.getElementById('expense-table-body');
const chartCanvas = document.getElementById('expense-chart'); // Chart container
const clearDataBtn = document.getElementById('clear-data-btn');
const confirmClearBtn = document.getElementById('confirm-clear-btn');
const categoryPieChart = document.getElementById('category-pie-chart'); // SVG Pie Chart container

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
        updatePieChart();

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
                backgroundColor: [],
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

    // Generate random colors for each category
    const colors = labels.map(() => getRandomColor());

    // Update chart data
    expenseChart.data.labels = labels;
    expenseChart.data.datasets[0].data = data;
    expenseChart.data.datasets[0].backgroundColor = colors;
    expenseChart.update(); // Ensure the chart is re-rendered
}

// Function to Generate Random Colors
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to update the Pie Chart (SVG Circle)
function updatePieChart() {
    const categories = {};
    expenses.forEach(expense => {
        categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
    });

    const totalAmount = Object.values(categories).reduce((acc, amount) => acc + amount, 0);
    let startAngle = 0;

    // Clear existing chart
    categoryPieChart.innerHTML = '';

    // Create slices for each category
    Object.keys(categories).forEach((category, index) => {
        const categoryAmount = categories[category];
        const sliceAngle = (categoryAmount / totalAmount) * 360;
        const sliceColor = getRandomColor();

        // Create the SVG slice (path)
        const x1 = 16 + 16 * Math.cos(Math.PI * startAngle / 180);
        const y1 = 16 + 16 * Math.sin(Math.PI * startAngle / 180);
        const x2 = 16 + 16 * Math.cos(Math.PI * (startAngle + sliceAngle) / 180);
        const y2 = 16 + 16 * Math.sin(Math.PI * (startAngle + sliceAngle) / 180);

        const largeArcFlag = sliceAngle > 180 ? 1 : 0;

        const pathData = `M 16,16 L ${x1},${y1} A 16,16 0 ${largeArcFlag} 1 ${x2},${y2} Z`;

        const slice = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        slice.setAttribute('d', pathData);
        slice.setAttribute('fill', sliceColor);

        categoryPieChart.appendChild(slice);

        startAngle += sliceAngle;
    });
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
    updatePieChart();

    // Hide confirmation button and show the original button again
    confirmClearBtn.style.display = 'none';
    clearDataBtn.style.display = 'inline-block';
}

// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    updateTable();
    updateChart();
    updatePieChart();

    // Event listener for "Clear Data" button
    clearDataBtn.addEventListener('click', handleClearData);

    // Event listener for "Confirm Clear Data" button
    confirmClearBtn.addEventListener('click', confirmClear);
});
