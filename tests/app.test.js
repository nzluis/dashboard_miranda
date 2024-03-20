import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { RootStyled } from "../src/style/RootStyled"
import { ButtonSecondary } from "../src/style/ButtonStyled"

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

describe('Lateral Panel', () => {
    it('Dashboard should show Panel', () => {
    const tree = renderer.create(<RootStyled $visiblePanel/>).toJSON()
    expect(tree).toHaveStyleRule('grid-template-columns', '1fr 4fr')    
    expect(tree).toHaveStyleRule('grid-template-rows', '125px 1fr')    
    expect(tree).toHaveStyleRule('grid-template-areas', "'panel navbar' 'panel dashboard'")    
    })
    it('Dashboard should hide Panel', () => {
    const tree = renderer.create(<RootStyled />).toJSON()
    expect(tree).toHaveStyleRule('grid-template-columns', '1fr')    
    expect(tree).toHaveStyleRule('grid-template-rows', '125px 1fr')    
    expect(tree).toHaveStyleRule('grid-template-areas', "'navbar' 'dashboard'")    
    })
})

