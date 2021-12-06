import React from "react";
import { Box, Center, Text } from "native-base";

const Stat = ({ value, icon, label }) => {

  return (
    <Box borderWidth={1} borderColor="gray.100" shadow={1} p={4} backgroundColor="white" borderRadius={0}>
      <Center>
        {icon}
      </Center>
      <Text fontFamily="body" textAlign="center" fontSize="lg">{value}</Text>
      <Text fontFamily="body" textAlign="center" fontSize="md">{label}</Text>
    </Box>
  );
};

export default Stat;
