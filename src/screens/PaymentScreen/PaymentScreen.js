import CustomButton from '@components/CustomButton/CustomButton';
import {StripeProvider, CardField} from '@stripe/stripe-react-native';
import { Box } from 'native-base';

function PaymentScreen() {
  return (
    <Box h="100%" bg="red.500">

    <StripeProvider
      publishableKey="pk_test_51N2DsJCnPuYN2rinLMHNM7SnzPHMrhgZOdtKb7xUBUntzatdw8utlZpCNTwZyhIL9ShQBddovI4lQA2TWEZBDRgR009G3YVIMz"

      //   urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.olaads" // required for Apple Pay
      >
      {/* // Your app code here */}
      <CardField
        onCardChange={cardDetails => console.log('cardDetails', cardDetails)}
        />
      <CustomButton>Title</CustomButton>
    </StripeProvider>
        </Box>
  );
}

export default PaymentScreen;
