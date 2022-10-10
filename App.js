import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import { MD3LightTheme as DefaultTheme } from 'react-native-paper'
import { store } from './redux/store'
import Index from './Index'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0066ff',
    secondary: 'yellow'
  }
}

export default function App () {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <Index />
      </PaperProvider>
    </StoreProvider>
  )
}
