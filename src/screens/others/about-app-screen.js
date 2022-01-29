import React, { useEffect } from "react";
import { Container, Heading } from "native-base";
import NavigationBar from "react-native-navbar-color";

const AboutAppScreen = () => {
    useEffect(() => {
        NavigationBar.setColor('#155e75');
    }, []);
    
  return (
    <Container>
      <Heading>About App</Heading>
    </Container>
  )
}

export default AboutAppScreen;
