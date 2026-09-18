import { render } from "@testing-library/react"
import { beforeEach } from "vitest"
import App from "../../components/App"
import "@testing-library/jest-dom"

beforeEach(() => {
    global.setFetchResponse(global.baseTransactions)
    const { findAllByTestId } = render(<App />)
})

describe("Our app will ", () => {
    test.todo("update page onChange event")
})