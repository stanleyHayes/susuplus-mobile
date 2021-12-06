import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { NavigationContainer } from "@react-navigation/native";
import { extendTheme, NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const theme = extendTheme({
  fontConfig: {
    GoogleSans: {
      400:{
        normal: 'GoogleSans-Regular'
      }
    },
    InterBlack: {
      200:{
        normal: 'Inter-Black'
      },
      300:{
        normal: 'Inter-Black'
      },
      400:{
        normal: 'Inter-Black'
      },
      500:{
        normal: 'Inter-Black'
      },
      600:{
        normal: 'Inter-Black'
      },
      700:{
        normal: 'Inter-Black'
      }
    },
    ProductSans: {
      300:{
        normal: 'ProductSans-Thin',
        italic: 'ProductSans-ThinItalic'
      },
      400:{
        normal: 'ProductSans-Regular',
        italic: 'ProductSans-Italic'
      },
      600:{
        normal: 'ProductSans-Medium',
        italic: 'ProductSans-MediumItalic'
      },
      700:{
        normal: 'ProductSans-Bold',
        italic: 'ProductSans-BlackItalic'
      },
      800:{
        normal: 'ProductSans-Black',
        italic: 'ProductSans-BlackItalic'
      }
    },
  },
  fonts: {
    body: 'GoogleSans',
    heading: 'GoogleSans',
    mono: 'GoogleSans'
  }
});

const Root = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          <App />
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => Root);
