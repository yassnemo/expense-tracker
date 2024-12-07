from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Initialize Database
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            category TEXT NOT NULL,
            amount REAL NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Route: Add Expense
@app.route('/add_expense', methods=['POST'])
def add_expense():
    try:
        data = request.get_json()
        date = data['date']
        category = data['category']
        amount = data['amount']

        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO expenses (date, category, amount) VALUES (?, ?, ?)', (date, category, amount))
        conn.commit()
        conn.close()

        return jsonify({"status": "success", "message": "Expense added successfully"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400
    
# Route: Get All Expenses
@app.route('/get_expenses', methods=['GET'])
def get_expenses():
    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM expenses')
        rows = cursor.fetchall()
        conn.close()

        # Format response
        expenses = [{"id": row[0], "date": row[1], "category": row[2], "amount": row[3]} for row in rows]
        return jsonify(expenses), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Route: Delete Expense by ID
@app.route('/delete_expense/<int:id>', methods=['DELETE'])
def delete_expense(id):
    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute('DELETE FROM expenses WHERE id = ?', (id,))
        conn.commit()
        conn.close()

        return jsonify({"status": "success", "message": "Expense deleted successfully"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == '__main__':
    init_db()  # Initialize database if not already set up
    app.run(debug=True)
