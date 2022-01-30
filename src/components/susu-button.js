import { Box, Flex, HStack, Icon, Pressable, Text } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React from "react";

const SusuButton = ({ navigation, destination, iconName, label, as }) => {
  return (
    <Pressable onPress={() => navigation.push(destination)}>
      <Flex
        direction="row"
        px={5}
        py={2}
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="white">
        <HStack flex={1} space="md" alignItems="center">
          <Box
            backgroundColor="primary.100"
            p={2}
            borderBottomLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomRightRadius={16}
            borderTopLeftRadius={16}>
            <Icon
              color="primary.600"
              size="sm"
              as={as}
              name={iconName}
            />
          </Box>
          <Text
            fontSize="md"
            fontFamily="body"
            textTransform="capitalize"
            color="muted.500">
            {label}
          </Text>
        </HStack>
        <Icon size="sm" as={MaterialIcons} name="chevron-right" />
      </Flex>
    </Pressable>
  );
};

export default SusuButton;
