import {StyleSheet, Text, View } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { store } from './redux/store';
import HolidayList from './Views/HolidayList';

const theme = {
  colors: {
    primary: 'white',
    secondary: 'blue',
  },
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <HolidayList />
      </PaperProvider>
    </StoreProvider>
  );
}