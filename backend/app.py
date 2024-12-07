from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)
# Route to add an expense
@app.route('/add_expense', methods=['POST'])
def add_expense():
    try:
        data = request.get_json()
        date = data['date']
        category = data['category']
        amount = data['amount']

        # Insert into the database
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO expenses (date, category, amount) VALUES (?, ?, ?)', (date, category, amount))
        conn.commit()
        conn.close()

        return jsonify({"status": "success", "message": "Expense added successfully"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

# Route to fetch all expenses
@app.route('/get_expenses', methods=['GET'])
def get_expenses():
    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute('SELECT date, category, amount FROM expenses')
        rows = cursor.fetchall()
        conn.close()

        expenses = [{"date": row[0], "category": row[1], "amount": row[2]} for row in rows]
        return jsonify({"status": "success", "expenses": expenses}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
