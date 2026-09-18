import { render } from "@testing-library/react"
import App from "../../components/App"
import "@testing-library/jest-dom"

describe("Our app will ", () => {
    test.todo("update page onChange event", () => {
        // setup
        global.setFetchResponse(global.baseTransactions)
        const { findAllBy } = render(<App />)
    })
})