import React from "react";
import { Box, Center, Divider, Flex, Image, Pressable, Text } from "native-base";
import { SCREEN_NAME_CONSTANTS } from "../constants/constants";
import defaultImage from "./../assets/images/group-colored.png";

const savingsImage = require("./../assets/images/savings.png");
const investmentImage = require("./../assets/images/investment.png");
const Group = ({ group, navigation }) => {
    
    return (
        <Pressable
            onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.GROUP_DETAIL_SCREEN, { groupID: group._id })}>
            <Box
                borderBottomLeftRadius={0}
                borderTopRightRadius={0}
                borderBottomRightRadius={16}
                borderTopLeftRadius={16}
                backgroundColor="white"
                p={4}
                m={2}
                shadow={0}>
                <Flex flexDirection="row">
                    <Box
                        backgroundColor="primary.100"
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        size={75}>
                        <Image
                            alt={group.name}
                            source={group.image ? group.image : defaultImage}
                            objectPosition="center"
                            resizeMode="cover"
                            borderBottomLeftRadius={0}
                            borderTopRightRadius={0}
                            borderBottomRightRadius={16}
                            borderTopLeftRadius={16}
                            size={75}
                        />
                    </Box>
                    
                    <Box flexGrow={1} ml={2} justifyContent="center">
                        <Text mb={1} fontSize="md">{group.name}</Text>
                        <Flex flexDirection="row" justifyContent="flex-start" alignItems="space-between">
                            <Flex mr={4} flexDirection="row" justifyContent="center" alignItems="center">
                                <Center
                                    mr={2}
                                    size={10}
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16} backgroundColor="primary.50">
                                    <Image alt="Saving icon" size={5} source={savingsImage} />
                                </Center>
                                <Text fontSize="sm" color="muted.500">{group.percentages.susu}%</Text>
                            </Flex>
                            <Flex flexDirection="row" justifyContent="center" alignItems="center">
                                <Center
                                    mr={2}
                                    size={10}
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16} backgroundColor="primary.50">
                                    <Image size={5} alt="Investment icon" source={investmentImage} />
                                </Center>
                                <Text fontSize="sm" color="muted.500">{group.percentages.investment}%</Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
                <Divider
                    alignSelf="center"
                    width="100%"
                    mt={2}
                    mb={2}
                    backgroundColor="muted.200"
                    orientation="horizontal"
                    thickness={1} />
                <Text color="muted.500" fontSize="xs">{group.description}</Text>
            </Box>
        </Pressable>
    );
};

export default Group;
