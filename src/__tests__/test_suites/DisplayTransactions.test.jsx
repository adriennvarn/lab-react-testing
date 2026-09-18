import { render } from "@testing-library/react"
import App from "../../components/App"
import "@testing-library/jest-dom"

describe("Our app will ", () => {
    test("display all users on startup", async () => {
        // setup
        global.setFetchResponse(global.baseTransactions)
        const { findAllByTestId } = render(<App />)

        // count transaction items to ensure all are displayed
        const transactionItems = await findAllByTestId("transaction-item")
        expect(transactionItems).toHaveLength(global.baseTransactions.length)

        // match descriptions
        const transactionDescriptions = transactionItems.map((item) => item.querySelectorAll("td")[1].textContent)
        const baseDescriptions = global.baseTransactions.map((item) => item.description)
        expect(transactionDescriptions).toEqual(baseDescriptions)
    })
})