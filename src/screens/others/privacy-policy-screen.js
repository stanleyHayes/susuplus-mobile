import React, { useEffect } from "react";
import { Container, Heading } from "native-base";
import NavigationBar from "react-native-navbar-color";

const PrivacyPolicyScreen = () => {
    useEffect(() => {
        NavigationBar.setColor('#155e75');
    }, []);
  return (
    <Container>
      <Heading>Privacy Policy</Heading>
    </Container>
  )
}

export default PrivacyPolicyScreen;
