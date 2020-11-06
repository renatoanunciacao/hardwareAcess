import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import BluePage from './src/pages/BluePage';
import CameraPage from './src/pages/CameraPage';
import HttpRequestPage from './src/pages/HttpRequestPage';
import MapsPage from './src/pages/MapsPage';

const AppNavigator = createStackNavigator(
  {

    'HTTPREQUEST': {
      screen: HttpRequestPage,
      navigationOptions: {
        title: 'Pessoas',
        headerTitleStyle: {
          textAlign: 'left',
          fontSize: 20,
        }
      }
    },
    'Ble': {
      screen: BluePage,
      navigationOptions: {
        headerShown: false,
      }
    },
    'Camera': {
      screen: CameraPage,
      navigationOptions: {
        headerShown: false,
      }
    },
    'Maps': {
      screen: MapsPage,
      navigationOptions: {
        headerShown: false,
      }
    },

  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#504d4d',
      headerStyle: {
        backgroundColor: '#dbd5d5',
        borderBottomColor: '#f4f2ff',
      },
      headerTitleStyle: {
        color: 'black',
        fontSize: 20,
        flexGrow: 1,
        textAlign: 'center',
      }
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;