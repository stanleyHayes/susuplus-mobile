import React from "react";
import { Box, Button, Center, Image, Stack, Text } from "native-base";
import emptyImage from "../assets/images/empty.png";

const Empty = ({ title, description, refresh }) => {
    return (
        <Box>
            <Stack direction="column">
                <Center mb={4}>
                    <Image alt="Empty Icon" source={emptyImage} />
                </Center>
                <Text
                    textTransform="uppercase"
                    fontSize="xl"
                    mb={3}
                    fontFamily="body"
                    textAlign="center">
                    {title}
                </Text>
                <Text
                    mb={2}
                    fontFamily="body"
                    textTransform="capitalize"
                    fontSize="md"
                    textAlign="center">
                    {description}
                </Text>
                
                <Button
                    onPress={refresh}
                    mt={2}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    backgroundColor="primary.600">
                    Refresh
                </Button>
            </Stack>
        </Box>
    );
};

export default Empty;
