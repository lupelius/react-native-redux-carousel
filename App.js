import { Provider } from 'react-redux';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import colors from './src/styles/colors';

import { store, persistor } from './src/redux/store';

import AppView from './src/modules/AppViewContainer';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <View style={styles.container}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        }
        persistor={persistor}
      >
        <AppView />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
