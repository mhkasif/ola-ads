import {extendTheme} from 'native-base';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};
const font = {
  //use Montserrat
  heading: 'Montserrat',
  body: 'Montserrat',
  mono: 'Montserrat',

};
const colors = {
  primary: {
    50: '#EEF2F6',
    100: '#CFD9E7',
    200: '#B1C1D8',
    300: '#92A9C9',
    400: '#7491B9',
    500: '#5578AA',
    600: '#446088',
    700: '#334866',
    800: '#223044',
    900: '#111822',
  },
};
const theme = extendTheme({config, colors, font});
export default theme;
