import { render, fireEvent,  } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import App from "../../components/App"
import "@testing-library/jest-dom"

describe("Our app will ", () => {
    test.only("add transactions to frontend", async () => {
        global.setFetchResponse(global.baseTransactions)
        const { findAllByTestId, findAllByText } = render(<App />)

        const addButton = (await findAllByTestId("add-button"))[0]
        const dateInput = (await findAllByTestId("date-input"))[0]
        const descriptionInput = (await findAllByTestId("description-input"))[0]
        const categoryInput = (await findAllByTestId("category-input"))[0]
        const amountInput = (await findAllByTestId("amount-input"))[0]

        fireEvent.change(dateInput, { target: { value: "2026-09-18" } })
        await userEvent.type(descriptionInput, "Test transaction")
        await userEvent.type(categoryInput, "Test category")
        await userEvent.type(amountInput, "12.00")

        const mockPostData =  { id: 999, date: "2026-09-18", description: "Test transaction", category: "Test category", amount: "12" }
        global.setFetchResponse(mockPostData)

        fireEvent.click(addButton)

        const newTransaction = (await findAllByText("Test transaction"))[0]
        expect(newTransaction).toBeInTheDocument()
    })

    test("correctly POST new transactions", async () => {
        global.setFetchResponse(global.baseTransactions)
        const { findAllByTestId } = render(<App />)

        const addButton = (await findAllByTestId("add-button"))[0]
        const dateInput = (await findAllByTestId("date-input"))[0]
        const descriptionInput = (await findAllByTestId("description-input"))[0]
        const categoryInput = (await findAllByTestId("category-input"))[0]
        const amountInput = (await findAllByTestId("amount-input"))[0]

        fireEvent.change(dateInput, { target: { value: "2026-09-18" } })
        await userEvent.type(descriptionInput, "Test transaction")
        await userEvent.type(categoryInput, "Test category")
        await userEvent.type(amountInput, "12.00")

        const targetResponse = { date: "2026-09-18", description: "Test transaction", category: "Test category", amount: "12" }
        global.setFetchResponse(targetResponse)
        fireEvent.click(addButton)
        expect(fetch).toHaveBeenCalledWith("http://localhost:6001/transactions", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(targetResponse)
        })
    })
})