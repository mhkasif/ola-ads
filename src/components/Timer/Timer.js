import CustomText from '@components/CustomText/CustomText';
import {UTCToLocal} from '@utils/helpers';
import {Alert, Box, HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';

const publishedText = 'Published';
const Timer = ({futureDate, published = true, justTime = false, ...props}) => {
  const [timeLeft, setTimeLeft] = useState('');
  const isPublished = published || timeLeft === publishedText;
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const targetTime = new Date(UTCToLocal(futureDate, true)).getTime();
      const timeDifference = targetTime - currentTime;

      if (timeDifference <= 0 || published) {
        // Timer reached the future date
        clearInterval(intervalId);
        setTimeLeft(publishedText);
      } else {
        // Calculate time left
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        if (days > 0)
          setTimeLeft(`${days}d : ${hours}h : ${minutes}m : ${seconds}s`);
        else {
          setTimeLeft(`${hours}h, ${minutes}m, ${seconds}s`);
        }
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [futureDate, published]);

  return justTime ? (
    <CustomText {...props}>{timeLeft}</CustomText>
  ) : timeLeft ? (
    <Alert
      {...props}
      w="100%"
      //   variant="left-accent"
      variant="left-accent"
      colorScheme={isPublished ? 'success' : 'warning'}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={2}
          alignItems="center"
          justifyContent="center">
          {!isPublished && (
            <CustomText color="warning.800">Will be posted in</CustomText>
          )}
          <CustomText bold color={isPublished ? 'coolGray.800' : 'warning.800'}>
            {isPublished ? `Published at: ${UTCToLocal(futureDate)}` : timeLeft}
          </CustomText>
        </HStack>
      </VStack>
    </Alert>
  ) : null;
};

export default Timer;
