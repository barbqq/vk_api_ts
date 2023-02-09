import commonUtils from "./common.utils.js"
import { expect } from "chai"

class Assertoin {
    public toEqual(actual: any, expected: any, errorMessage?: string ){
        commonUtils.addLog(`Assertion: ${actual} eqaul to ${expected}`)
        expect(actual,errorMessage).to.be.equal(expected)
    }

    public toDeepEqual(actual: any, expected: any, errorMessage?: string ){
        commonUtils.addLog(`Assertion: ${actual} eqaul to ${expected}`)
        expect(actual,errorMessage).to.be.deep.equal(expected)
    }

    public toContain(actual: any, expected: any, errorMessage?: string ){
        commonUtils.addLog(`Assertion: ${actual} eqaul to ${expected}`)
        expect(actual,errorMessage).to.contain(expected)
    }
}

export default new Assertoin()