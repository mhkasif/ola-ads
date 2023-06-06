import HeaderBackground from '@components/HeaderBackground/HeaderBackground';
import {parseISO, format} from 'date-fns';

export const sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time));
};
export const generateRandomId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
export const headerOptions = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerStyle: {
    // height: 100,
    backgroundColor: 'transparent',
  },
  headerBackground: HeaderBackground,
  headerTintColor: '#fff',
};

export const generateQueryString = (url, params = {}) => {
  console.log({url, params});
  const query = Object.keys(params)
    .map(k => k + '=' + params[k])
    .join('&');
  console.log({query});
  return url + '?' + query;
};

export const UTCToLocal = (date, noFormat) => {
  const zonedDate = parseISO(date);
  const formattedDate = format(zonedDate, 'yyyy-MMM-dd HH:mm:ss');
  return noFormat ? zonedDate : formattedDate;
};
