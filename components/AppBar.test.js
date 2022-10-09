import React from 'react'

import renderer from 'react-test-renderer'
import AppBar from './AppBar'
import { Provider as StoreProvider, useSelector } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
// import { Platform } from 'react-native'
import { store } from '../redux/store'
import { setViewing } from '../redux/reducers/holidays'
import reactNative from 'react-native';
// jest.mock('react-native', () => jest.fn()
// jest.mock('Platform', () => {
//   const Platform = require.requireActual('Platform')
//   Platform.OS = 'android'
//   return Platform
// })
const Platform = jest.requireActual('Platform')
    Object.defineProperty(Platform, 'OS', {
      get: () => 'android',
    })


describe('<AppBar />', () => {
  // need to mock OS platform as theme provider Throws and error
  beforeEach(() => {
    const Platform = jest.requireActual('Platform')
    Object.defineProperty(Platform, 'OS', {
      get: () => 'android',
    })
  })

  it('renders correctly', () => {
    const tree = renderer.create(
      <PaperProvider>
        <StoreProvider store={store}>
          <AppBar />
        </StoreProvider>
      </PaperProvider>).toJSON()
    expect(tree.length).toBe(1)
  })

  store.dispatch(setViewing(true))

  it('renders back button when viewing a holiday', () => {
    const tree = renderer.create(
      <PaperProvider>
        <StoreProvider store={store}>
          <AppBar />
        </StoreProvider>
      </PaperProvider>).toJSON()
    expect(tree.length).toBe(1)
  })
})
