import { waitFor, render } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import App from "../../components/App"
import "@testing-library/jest-dom"

describe("Our app will ", () => {
    test("update page onChange event", async () => {
        // setup
        global.setFetchResponse(global.baseTransactions)
        const { findAllByTestId, findAllByText } = render(<App />)

        // find input
        const searchInput = (await findAllByTestId("search-input"))[0]

        // check if sample item is currently in document
        const targetText = (await findAllByText(global.baseTransactions[0].description))[0]
        expect(targetText).toBeInTheDocument()

        // update search bar
        await userEvent.type(searchInput, "south")

        // verify that two venmo items appear in list
        await waitFor(async () => {
            const results = await findAllByText(/south/i)
            expect(results).toHaveLength(2)
        })
    })
})