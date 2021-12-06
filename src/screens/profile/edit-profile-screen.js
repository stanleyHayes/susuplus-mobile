import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Flex, Input, ScrollView, Text, VStack } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/auth-reducer";

import { AUTH_ACTION_CREATORS } from "../../redux/auth/auth-action-creators";
import validator from "validator";

const EditProfileScreen = ({ navigation }) => {

  const { userData, authToken, authLoading, authError } = useSelector(selectAuth);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (userData) {
      setPhone(userData.phone);
      setName(userData.name);
    }
  }, []);

  const [error, setError] = useState({});

  const dispatch = useDispatch();

  const handleUpdateProfile = () => {
    if (!name) {
      setError({ error, name: "Field required" });
      return;
    } else {
      setError({ error, name: null });
    }

    if (!phone) {
      setError({ error, phone: "Field required" });
      return;
    } else {
      setError({ error, phone: null });
    }
    dispatch(AUTH_ACTION_CREATORS.updateProfile({ phone, name }, authToken, navigation));
  };

  return (
    <Box>
      <ScrollView width="100%" height="100%" backgroundColor="white">
        <Flex
          height="100%"
          width="100%"
          justifyContent="center">

          {authError && (
            <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
              <VStack alignItems="center" width="100%" space={2}>
                <Alert.Icon size="lg" />
                <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
                <Text textAlign="center" fontSize="md" color="red.600">{authError}</Text>
              </VStack>
            </Alert>
          )}

          <Box px={2} flex={1} pt={4} pb={4}>

            <Input
              isInvalid={Boolean(error.name)}
              _invalid={{
                borderColor: "red.400",
              }}
              mb={1}
              mt={2}
              isFullWidth={true}
              size="lg"
              _focus={{ borderColor: "gray.100" }}
              borderRadius={32}
              value={name}
              placeholder="Enter name"
              variant="filled"
              alignSelf="stretch"
              isRequired={true}
              p={4}
              type="name"
              backgroundColor="gray.50"
              name="name"
              onChangeText={name => setName(name)}
            />
            {error.name && <Text textColor="red.400" textAlign="center">{error.name}</Text>}

            <Input
              isInvalid={Boolean(error.phone)}
              _invalid={{
                borderColor: "red.400",
              }}
              mb={1}
              mt={2}
              isFullWidth={true}
              size="lg"
              _focus={{ borderColor: "gray.100" }}
              borderRadius={32}
              value={phone}
              placeholder="Enter phone"
              variant="filled"
              alignSelf="stretch"
              isRequired={true}
              p={4}
              type="tel"
              backgroundColor="gray.50"
              name="phone"
              onChangeText={phone => setPhone(phone)}
            />
            {error.phone && <Text textColor="red.400" textAlign="center">{error.phone}</Text>}

            <Button
              isLoading={authLoading}
              isLoadingText="Updating Profile..."
              onPress={handleUpdateProfile}
              pt={3}
              pb={3}
              mt={8}
              shadow={1}
              borderRadius={32}
              backgroundColor="primary.800"
              _text={{ textTransform: "uppercase", fontSize: "lg", color: "white" }}
              alignSelf="stretch"
              size="md"
              variant="solid">
              <Text fontSize="md" color="white">
                Update Profile
              </Text>
            </Button>
          </Box>
        </Flex>
      </ScrollView>
    </Box>
  );
};

export default EditProfileScreen;
