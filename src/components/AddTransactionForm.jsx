import React from "react"

function AddTransactionForm({ postTransaction }) {
    function submitForm(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget) 
        const newTransaction = {
            date: formData.get("date"),
            description: formData.get("description"),
            category: formData.get("category"),
            amount: formData.get("amount")
        }
        postTransaction(newTransaction)

    }

    return (
        <div className="ui segment">
            <form className="ui form" onSubmit={submitForm}>
                <div className="inline fields">
                    <input type="date" name="date" data-testid="date-input" />
                    <input type="text" name="description" placeholder="Description" data-testid="description-input" />
                    <input type="text" name="category" placeholder="Category" data-testid="category-input" />
                    <input type="number" name="amount" placeholder="Amount" step="0.01" data-testid="amount-input" />
                </div>
                <button className="ui button" type="submit" data-testid="add-button">
                    Add Transaction
                </button>
            </form>
        </div>
    )
}

export default AddTransactionForm
