import React, { useEffect } from "react";
import { Center, Fab, FlatList, Flex, Icon, IconButton, Spinner } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Empty from "../../components/empty";
import { selectPaymentMethods } from "../../redux/payment-methods/payment-method-reducers";
import PaymentMethod from "../../components/payment-method";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import { PAYMENT_METHOD_ACTION_CREATORS } from "../../redux/payment-methods/payment-method-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import NavigationBar from "react-native-navbar-color";

const PaymentMethodsScreen = ({ navigation }) => {
    const { paymentMethodLoading, paymentMethods } = useSelector(selectPaymentMethods);
    
    const dispatch = useDispatch();
    
    const { authToken } = useSelector(selectAuth);
    
    useEffect(() => {
        dispatch(PAYMENT_METHOD_ACTION_CREATORS.getPaymentMethods(authToken));
    }, []);
    
    useEffect(() => {
        NavigationBar.setColor('#155e75');
    }, []);
    
    return (
        <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
            {paymentMethodLoading &&
            <Center width="100%" height="100%">
                <Spinner
                    position="absolute"
                    size="lg"
                    color="primary.600"
                />
            </Center>}
            
            {paymentMethods && paymentMethods.length === 0 ? (
                <Flex backgroundColor="white" width="100%" height="100%" justifyContent="center" alignItems="center">
                    <Empty description="You have no payment methods" title="Payment Methods" />
                </Flex>
            ) : (
                <FlatList
                    data={paymentMethods}
                    renderItem={(paymentMethod) => <PaymentMethod navigation={navigation}
                                                                  paymentMethod={paymentMethod.item} />}
                    keyExtractor={(paymentMethod) => paymentMethod._id}
                />
            )}
    
            <IconButton
                icon={<Icon color="primary.800" as={MaterialIcons} name="add" />}
                borderRadius="full"
                variant="solid"
                placement="bottom-right"
                position="absolute"
                borderWidth={2}
                borderColor="primary.600"
                shadow={8}
                onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.ADD_PAYMENT_METHOD_SCREEN)}
                size="md"
                right={5}
                bottom={15}
            />
            
        </Flex>
    );
};

export default PaymentMethodsScreen;
