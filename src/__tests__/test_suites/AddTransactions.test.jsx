import { render, act, fireEvent } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import App from "../../components/App"
import "@testing-library/jest-dom"

describe("Our app will ", () => {
    test.only("add transactions to frontend", async () => {
        global.setFetchResponse(global.baseTransactions)
        const { findByTestId, findByText } = render(<App />)

        const addButton = await findByTestId("add-button")
        const dateInput = await findByTestId("date-input")
        const descriptionInput = await findByTestId("description-input")
        const categoryInput = await findByTestId("category-input")
        const amountInput = await findByTestId("amount-input")

        fireEvent.change(dateInput, { target: { value: "2026-09-18" } })
        await userEvent.type(descriptionInput, "Test transaction")
        await userEvent.type(categoryInput, "Test category")
        await userEvent.type(amountInput, "12.00")

        await userEvent.click(addButton)

        const newTransaction = await findByText("Test transaction")
        expect(newTransaction).toBeInTheDocument()
    })
})