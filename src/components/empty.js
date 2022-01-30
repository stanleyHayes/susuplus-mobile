import React from "react";
import { Box, Button, Center, Image, Stack, Text } from "native-base";
import emptyImage from "../assets/images/empty.png";

const Empty = ({ title, description, refresh }) => {
    return (
        <Box>
            <Stack direction="column">
                <Center mb={2}>
                    <Image alt="Empty Icon" source={emptyImage} />
                </Center>
                <Text
                    textTransform="uppercase"
                    fontSize="md"
                    mb={2}
                    color="muted.500"
                    fontFamily="body"
                    textAlign="center">
                    {title}
                </Text>
                <Text
                    mb={1}
                    fontFamily="body"
                    textTransform="capitalize"
                    fontSize="xs"
                    color="muted.400"
                    textAlign="center">
                    {description}
                </Text>
                
                <Button
                    alignSelf="center"
                    onPress={refresh}
                    mt={2}
                    _text={{fontSize: 'xs'}}
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
