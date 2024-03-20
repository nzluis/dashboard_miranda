import { render } from "@testing-library/react"
import { ButtonSecondary } from "../src/style/ButtonStyled"


describe('ButtonSecondary', () => {
    it('normal cursor pointer', () => {
        render(<ButtonSecondary />)
        const buttonClass = ButtonSecondary({}).type.styledComponentId
        const buttonElement = document.getElementsByClassName(buttonClass)
        const style = window.getComputedStyle(buttonElement[0])

        expect(style.cursor).toBe('pointer')
    })
    it('change to not-allowed', () => {

    })
})