import { render, fireEvent,  } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import App from "../../components/App"
import "@testing-library/jest-dom"

// I experienced SIGNIFICANT problems with items being duplicated. This is why
// all of the inputs use findAll and index 0. 

describe("Our app will ", () => {
    test("add transactions to frontend", async () => {
        // setup
        global.setFetchResponse(global.baseTransactions)
        const { findAllByTestId, findAllByText } = render(<App />)

        // find inputs
        const addButton = (await findAllByTestId("add-button"))[0]
        const dateInput = (await findAllByTestId("date-input"))[0]
        const descriptionInput = (await findAllByTestId("description-input"))[0]
        const categoryInput = (await findAllByTestId("category-input"))[0]
        const amountInput = (await findAllByTestId("amount-input"))[0]

        // update inputs with mock values
        fireEvent.change(dateInput, { target: { value: "2026-09-18" } })
        await userEvent.type(descriptionInput, "Test transaction")
        await userEvent.type(categoryInput, "Test category")
        await userEvent.type(amountInput, "12.00")

        // set mock data to satisfy POST
        const mockPostData =  { id: 999, date: "2026-09-18", description: "Test transaction", category: "Test category", amount: "12" }
        global.setFetchResponse(mockPostData)

        // FIRE!
        fireEvent.click(addButton)

        // verify that the description found it's way into the document
        const newTransaction = (await findAllByText("Test transaction"))[0]
        expect(newTransaction).toBeInTheDocument()
    })

    test("correctly POST new transactions", async () => {
        // setup
        global.setFetchResponse(global.baseTransactions)
        const { findAllByTestId } = render(<App />)

        // find inputs
        const addButton = (await findAllByTestId("add-button"))[0]
        const dateInput = (await findAllByTestId("date-input"))[0]
        const descriptionInput = (await findAllByTestId("description-input"))[0]
        const categoryInput = (await findAllByTestId("category-input"))[0]
        const amountInput = (await findAllByTestId("amount-input"))[0]

        // update inputs with mock values
        fireEvent.change(dateInput, { target: { value: "2026-09-18" } })
        await userEvent.type(descriptionInput, "Test transaction")
        await userEvent.type(categoryInput, "Test category")
        await userEvent.type(amountInput, "12.00")

        // set intended response
        const targetResponse = { date: "2026-09-18", description: "Test transaction", category: "Test category", amount: "12" }
        global.setFetchResponse(targetResponse)

        // FIRE
        fireEvent.click(addButton)

        // verify fetch was called correctly
        expect(fetch).toHaveBeenCalledWith("http://localhost:6001/transactions", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(targetResponse)
        })
    })
})