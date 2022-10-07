import * as React from 'react';
import { Appbar } from 'react-native-paper';

export const AppBar = () => (
  <Appbar.Header>
    <Appbar.BackAction onPress={() => {}} />
    <Appbar.Content title="UK Holiday days" />
  </Appbar.Header>
);

export default AppBar;