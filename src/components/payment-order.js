import React from "react";
import { Box, HStack, Image, Text } from "native-base";
import moment from "moment";
import defaultUserImage from "./../assets/images/user.png";

const PaymentOrder = ({ order }) => {
    
    return (
        <Box
            borderBottomLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomRightRadius={16}
            borderTopLeftRadius={16}
            backgroundColor="white"
            p={2}
            mx={2}
            my={0.5}
            shadow={0}>
            <HStack>
                <Box>
                    <Image
                        alt={order.member.user.name}
                        source={order.member.user.image ? order.member.user.image : defaultUserImage}
                        objectPosition="center"
                        resizeMode="cover"
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        size={50} />
                </Box>
                <Box ml={2}>
                    <Text fontSize="sm" color="muted.500">{order.member.user.name}</Text>
                    <Text fontSize="xs" color="muted.400" textTransform="capitalize">{order.member.role}</Text>
                    <Text fontSize="xs" color="muted.500">Payment Position: {order.position}</Text>
                    
                    {order.isPaid ? (
                        <Text fontSize="xs" color="muted.500" fontFamily="body">
                            Paid {moment(order.disbursementDate).fromNow()}
                        </Text>
                    ) : (
                        <Text fontSize="xs" color="muted.500" fontFamily="body">
                            Member not paid
                        </Text>
                    )}
                </Box>
            </HStack>
        </Box>
    );
};

export default PaymentOrder;
