import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import fetch from "node-fetch"

global.baseTransactions = [
    {
        "id": "1",
        "date": "2019-12-01",
        "description": "Paycheck from Bob's Burgers",
        "category": "Income",
        "amount": 1000
    },
    {
        "id": "2",
        "date": "2019-12-01",
        "description": "South by Southwest Quinoa Bowl at Fresh & Co",
        "category": "Food",
        "amount": -10.55
    },
    {
        "id": "3",
        "date": "2019-12-02",
        "description": "South by Southwest Quinoa Bowl at Fresh & Co",
        "category": "Food",
        "amount": -10.55
    },
]

global.setFetchResponse = (val) => {
    global.fetch = vi.fn(() => Promise.resolve({
        json: () => Promise.resolve(val),
        ok: true,
        status: 200
    }))
}

afterEach(() => {
    cleanup()
})