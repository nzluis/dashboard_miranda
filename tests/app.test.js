import { ButtonSecondary } from "../src/style/ButtonStyled"
import renderer from 'react-test-renderer'
import 'jest-styled-components'

describe('ButtonSecondary', () => {
    it('normal cursor pointer', () => {
        const tree = renderer.create(<ButtonSecondary />).toJSON()
        expect(tree).toHaveStyleRule('cursor', 'pointer')
        expect(tree).toHaveStyleRule('font-size', '16px')
        expect(tree).toHaveStyleRule('background-color', 'white')

    })
    it('change to not-allowed', () => {
        const tree = renderer.create(<ButtonSecondary $notAllow/>).toJSON()
        expect(tree).toHaveStyleRule('cursor', 'not-allowed')
    })
})