# Expense Tracker Web Application

## Overview

The **Expense Tracker** is a user-friendly web application that's designed to help users keep track of their daily expenses. With interactive charts and persistent data storage, this tool gives insights into spending patterns while keeping the user experience very simple and intuitive.

## Features

- **Add Expenses**: Easily input expenses with details such as date, category, and amount.
- **Expense Table**:  All recorded expenses are structured and sorted in a table format.
- **Interactive Charts**:
  - **Bar Chart**: Visualize total expenses per category.
  - **Pie Chart**: See a clear percentage breakdown of spending by category.
- **Data Persistence**: Automatically saves data in the browser’s localStorage, ensuring data is retained even after refreshing the page.
- **Clear Data**: Delete all stored expenses with a single click, including a confirmation step for safety.

## Built Using 

- **HTML5**: For the structure and the layout.
- **CSS3**: Used Styling the application's design.
- **JavaScript**: For Handling the functionality of the application, including form processing, data visualization, and storage.
- **Chart.js**: For Creating dynamic and interactive charts for data visualization.

## Installation

1. **Clone or Download the Repository**  
   To get started, clone or download this repository to a local directory:
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
2. Open the Application
  Navigate to the project folder and open the index.html file in your browser to use the application.

## How It Works
 
- Add an Expense:
    - Fill out the form with the expense details (date, category, and amount). Once submitted, the data is saved in localStorage (On your web browser), and the table and charts are updated in real-time.

- View Expenses:
    - All expenses are displayed in a detailed table, showing their respective date, category, and amount.

- Visualize Data:
    - The Bar Chart illustrates the total expenses by category.
    - The Pie Chart shows the percentage breakdown of spending for each category, providing a clear snapshot of your financial distribution.
- Clear Data:
    - Clicking the "Clear Data" button prompts a confirmation dialog. Upon confirmation, all stored data is deleted, and the application resets.
      
## Screenshots

![Screenshot 2024-12-11 132734](https://github.com/user-attachments/assets/6d9d852a-2c60-4eb5-9d3d-62cc08336f09)
![Screenshot 2024-12-11 132645](https://github.com/user-attachments/assets/192c6b98-9f3a-4115-9ede-31eb96160b28)

## Contribution
 If you have ideas for new features or want to fix bugs, feel free to submit a pull request. Here's how you can contribute:

1. Fork the Repository
   Click the "Fork" button on the repository page.

2. Create a New Branch
  Create a feature branch for your changes:
```bash
git checkout -b feature-name
```
3. Commit Your Changes
  After making changes, commit them with a clear message:
```bash
git commit -m "Add description of changes"
```
4. Push and Create a Pull Request
  Push your changes and create a pull request:
```bash
git push origin feature-name
```
## Future Enhancements
- Add the ability to filter expenses by date or category.
- Enable exporting data to a file for offline access.
- Introduce user authentication for cross-device data access.

## Conclusion
This project showcases a good understanding of front-end development and data visualization. It combines practical functionality with a simple design, making it very useful for managing finances or exploring coding concepts in a real-world web applications.


