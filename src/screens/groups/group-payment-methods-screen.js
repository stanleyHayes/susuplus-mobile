import React, { useEffect } from "react";
import { Center, FlatList, Flex, Spinner } from "native-base";
import Empty from "../../components/empty";
import PaymentMethod from "../../components/payment-method";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/auth-reducer";
import { selectGroupPaymentMethods } from "../../redux/group-payment-methods/group-payment-method-reducers";
import { GROUP_PAYMENT_METHOD_ACTION_CREATORS } from "../../redux/group-payment-methods/group-payment-method-action-creators";

const GroupPaymentMethodScreen = ({ navigation, route }) => {
    
    const {
        groupPaymentMethodLoading,
        groupPaymentMethods,
    } = useSelector(selectGroupPaymentMethods);
    
    const { groupID } = route.params;
    
    const dispatch = useDispatch();
    
    const { authToken } = useSelector(selectAuth);
    
    useEffect(() => {
        dispatch(GROUP_PAYMENT_METHOD_ACTION_CREATORS.getGroupPaymentMethods(authToken, groupID));
    }, []);
    
    return (
        <Flex>
            <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
                {groupPaymentMethodLoading &&
                <Center width="100%" height="100%">
                    <Spinner
                        position="absolute"
                        size={50}
                        color="primary.800"
                    />
                </Center>}
                
                
                {groupPaymentMethods && groupPaymentMethods.length === 0 ? (
                    <Flex
                        backgroundColor="white"
                        width="100%"
                        height="100%"
                        justifyContent="center"
                        alignItems="center">
                        <Empty
                            description="This group has no payment methods"
                            title="Group Payment Methods"
                        />
                    </Flex>
                ) : (
                    <FlatList
                        refreshing={groupPaymentMethodLoading}
                        onRefresh={() => dispatch(GROUP_PAYMENT_METHOD_ACTION_CREATORS.getGroupPaymentMethods(authToken, groupID))}
                        data={groupPaymentMethods}
                        renderItem={
                            (paymentMethod) =>
                                <PaymentMethod
                                    navigation={navigation}
                                    paymentMethod={paymentMethod.item}
                                />}
                        keyExtractor={(paymentMethod) => paymentMethod._id}
                    />
                )}
            </Flex>
        </Flex>
    );
};

export default GroupPaymentMethodScreen;
