import { render } from "@testing-library/react"
import App from "../../components/App"
import "@testing-library/jest-dom"

describe("Our app will ", () => {
    test("display all users on startup", async () => {
        global.setFetchResponse(global.baseTransactions)
        const { findAllByTestId } = render(<App />)
        const transactionItems = await findAllByTestId("transaction-item")
        expect(transactionItems).toHaveLength(global.baseTransactions.length)

        const transactionDescriptions = transactionItems.map((item) => item.querySelectorAll("td")[1].textContent)
        const baseDescriptions = global.baseTransactions.map((item) => item.description)
        expect(transactionDescriptions).toEqual(baseDescriptions)
    })
})