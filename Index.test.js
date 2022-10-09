import React from 'react'
import renderer from 'react-test-renderer'
import Index from './Index'
import { Provider } from 'react-redux'
import { store } from './redux/store'


describe('<App />', () => {
  // it('has 1 child', () => {
  //   const tree = renderer.create(<AppBar />).toJSON()
  //   expect(tree.length).toBe(1) // The length of the tree should be three because we want a 3x3 grid
  // })
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><Index /></Provider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
