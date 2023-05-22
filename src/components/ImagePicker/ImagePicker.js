import {Actionsheet} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

const ImagePicker = ({isOpen, onClose, callback,mediaType}) => {
  const handleLibraryOpen = (mediaType="mixed")=>async () => {
    try {
      const x = await launchImageLibrary({
        selectionLimit: 1,
        presentationStyle: 'fullScreen',
        mediaType
      });
      console.log(x);
      if (x.didCancel) {
        return;
      }
      if (x.errorCode) {

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: x.errorMessage,
        });
        return;
      }
      callback?.(x.assets);
    } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        })
      //   console.log(error);
    }
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Actionsheet.Item onPress={handleLibraryOpen(mediaType)}>
          Choose From Library
        </Actionsheet.Item>
        <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
export default ImagePicker;
