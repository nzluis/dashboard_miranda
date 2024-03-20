import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { RootStyled } from "../src/style/RootStyled"
import { ButtonSecondary } from "../src/style/ButtonStyled"
import { CheckDatesBox } from '../src/style/BookingDetailStyled'
import { DashBoard } from '../src/style/DashBoardStyled'
import { Form } from '../src/style/FormStyled'
import { StyledTableBody } from '../src/style/TableStyled'
import { Tab } from '../src/style/TopMenuStyled'

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

describe('CheckDates boxes on Booking Detail', () => {
    it('display flex columns with gap', () => {
        const tree = renderer.create(<CheckDatesBox $insidebox />).toJSON()
        expect(tree).toHaveStyleRule('flex-direction', 'column')
        expect(tree).toHaveStyleRule('gap', '5px')
    })
})

describe('Flex Dashboard on Booking Detail', () => {
    it('display flex property', () => {
        const tree = renderer.create(<DashBoard $flex />).toJSON()
        expect(tree).toHaveStyleRule('display', 'flex')
    })
})

describe('Form width should be', () => {
    it('40% in most cases', () => {
        const tree = renderer.create(<Form />).toJSON()
        expect(tree).toHaveStyleRule('width', '40%')
    })
    it('250px on Login Page', () => {
        const tree = renderer.create(<Form width='login' />).toJSON()
        expect(tree).toHaveStyleRule('width', '250px')
    })
})

describe('Table rows', () => {
    it('should have pointer just on Bookings page', () => {
        const tree = renderer.create(<StyledTableBody />).toJSON()
        expect(tree).toHaveStyleRule('cursor', 'pointer', {modifier: 'tr'})
    })
    it('should not have pointer', () => {
        const tree = renderer.create(<StyledTableBody $noPointer />).toJSON()
        expect(tree).toHaveStyleRule('cursor', 'default', {modifier: 'tr'})
    })
    it('with vertical-align top', () => {
        const tree = renderer.create(<StyledTableBody />).toJSON()
        expect(tree).toHaveStyleRule('vertical-align', 'top', {modifier: 'tr td:not(:first-child)'})
    })
    it('should not have pointer', () => {
        const tree = renderer.create(<StyledTableBody $position='bottom' />).toJSON()
        expect(tree).toHaveStyleRule('vertical-align', 'bottom', {modifier: 'tr td:not(:first-child)'})
    })
})

describe('Tabs on TopMenu', () => {
    it('inactive tab with no bg-color & inherit font', () => {
        const tree = renderer.create(<Tab />).toJSON()
        expect(tree).toHaveStyleRule('background-color', 'inherit')
        expect(tree).toHaveStyleRule('color', 'inherit')
    })
    it('active tab with bg-color green & white font', () => {
        const tree = renderer.create(<Tab $active/>).toJSON()
        expect(tree).toHaveStyleRule('background-color', 'var(--padding-second)')
        expect(tree).toHaveStyleRule('color', 'white')
    })
})