import React, { useEffect } from "react";
import { Container, Heading } from "native-base";
import NavigationBar from "react-native-navbar-color";

const TermsAndConditionsScreen = () => {
    useEffect(() => {
        NavigationBar.setColor('#155e75');
    }, []);
  return (
    <Container>
      <Heading>Terms and Conditions</Heading>
    </Container>
  )
}

export default TermsAndConditionsScreen;
