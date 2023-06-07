import {COLORS} from '@utils/colors';

const {HStack, Skeleton, Center, VStack} = require('native-base');

export const CategoriesSkeleton = () => {
  return (
    <HStack px={6} py={3} space={4} alignItems="center">
      <Skeleton size="8" rounded="full" />
      <Skeleton.Text lines={1} h="3" flex="1" rounded="full" />
      <Skeleton size="5" rounded="sm" startColor="indigo.300" />
    </HStack>
  );
};

export const AdsSkeleton = () => {
  return (
    <Center w="100%" bg="#fff" my={2}>
      <HStack
        w="100%"
        maxW="400"
        borderWidth="1"
        space={8}
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
        p="4">
        <Skeleton flex="4" h="150" rounded="md" startColor="coolGray.100" />
        <VStack flex="5" space="4">
          <Skeleton />
          <HStack space="2" alignItems="center">
            <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
            <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
            <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
            <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
          </HStack>
          <HStack space="2" alignItems="center">
            <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
            <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
            <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
            <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
          </HStack>

          <Skeleton.Text lines={1} flex="1" />
        </VStack>
      </HStack>
    </Center>
  );
};

export const PlanSkeleton = () => {
  return (
    <HStack
      w="100%"
      // maxW="400"
      borderWidth="1"
      space={8}
      rounded="md"
      h={150}
      _dark={{
        borderColor: 'primaryDark',
      }}
      _light={{
        borderColor: 'primaryDark',
      }}
      bg={COLORS.white}
      p="4">
      <VStack flex={1} justifyContent="center" space={6}>
        <Skeleton.Text lines={1} startColor="coolGray.100" />
        <Skeleton startColor="indigo.100" />
      </VStack>
      <VStack flex="1" space="4" justifyContent="center">
        <HStack space={2}>
          <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
          <Skeleton.Text flex="9" lines="1" />
        </HStack>
        <HStack space={2}>
          <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
          <Skeleton.Text flex="9" lines="1" />
        </HStack>
        <HStack space={2}>
          <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
          <Skeleton.Text flex="9" lines="1" />
        </HStack>
      </VStack>
    </HStack>
  );
};
