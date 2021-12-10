import React from "react";
import { Box, HStack, Image, Text } from "native-base";
import moment from "moment";
import defaultUserImage from "../assets/images/user.png";

const SusuMember = ({ susuMember }) => {
    
    return (
        <Box
            mx={2}
            my={.5}
            borderRadius={32}
            backgroundColor="white"
            p={4}
            shadow={0}>
            <HStack>
                <Box>
                    <Image
                        alt={susuMember.member.user.name}
                        source={susuMember.member.user.image ? susuMember.member.user.image : defaultUserImage}
                        objectPosition="center"
                        resizeMode="cover"
                        borderRadius={100}
                        size={60} />
                </Box>
                <Box ml={2}>
                    <Text
                        fontSize="lg"
                    >{susuMember.member.user.name}</Text>
                    <Text fontSize="xs">{susuMember.member.role.toLowerCase()}</Text>
                    <Text>Payment Position: {susuMember.position}</Text>
                    <Text fontSize="md" fontFamily="body">Payment
                        Date: {moment(susuMember.disbursementDate).format("YYYY, MMM DD")}</Text>
                    {susuMember.isPaid ? (
                        <Text fontSize="md" fontFamily="body">Paid
                            on {moment(susuMember.disbursementDate).fromNow()}</Text>
                    ) : (
                        <Text fontSize="md" fontFamily="body">Member not paid</Text>
                    )}
                </Box>
            </HStack>
        </Box>
    );
};

export default SusuMember;
