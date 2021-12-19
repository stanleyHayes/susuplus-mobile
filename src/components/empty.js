import React from "react";
import { Box, Center, Image, Stack, Text } from "native-base";
import emptyImage from "../assets/images/empty.png";

const Empty = ({ title, description }) => {
  return (
    <Box>
      <Stack direction="column">
        <Center mb={4}>
          <Image alt="Empty Icon" source={emptyImage} />
        </Center>
        <Text
          textTransform="uppercase"
          fontSize="xl"
          mb={4}
          fontFamily="body"
          textAlign="center">
          {title}
        </Text>
        <Text
          fontFamily="body"
          textTransform="capitalize"
          fontSize="md"
          textAlign="center">
          {description}
        </Text>
      </Stack>
    </Box>
  );
};

export default Empty;
