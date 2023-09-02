/* eslint-disable react-hooks/exhaustive-deps */
import CustomText from '@components/CustomText/CustomText';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import Purchases from 'react-native-purchases';
import {
  endConnection,
  getProducts,
  getSubscriptions,
  initConnection,
} from 'react-native-iap';

const InAppPurchase = () => {
  const [products, setProducts] = useState([]);

  const init = async () => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    try {
      if (Platform.OS === 'ios') {
        Purchases.configure({apiKey: 'appl_kbvzktoNFYAOwDTMOyUYDpTINCB'});
      } else if (Platform.OS === 'android') {
        Purchases.configure({apiKey: 'goog_XBQodaBWmqhKZGBTilDqbdcPfNa'});
      }
      await initConnection();
      await fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };
  const fetchProducts = async () => {
    try {
      const offerings = await Purchases.getProducts([
        '28082023_yearly_advanced',
        '28082023_monthly_advanced',
      ]);
      console.log({offerings});
      setProducts(offerings);

      //   if (
      //     offerings.current !== null &&
      //     offerings.current.availablePackages.length !== 0
      //   ) {
      //     console.log(offerings);
      //   }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    init();
    return () => {
      endConnection();
    };
  }, []);
  return <CustomText>{products.map(x => JSON.stringify(x))}</CustomText>;
};

export default InAppPurchase;
