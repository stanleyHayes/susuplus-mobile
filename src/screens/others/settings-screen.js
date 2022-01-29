import React, { useEffect } from "react";
import { Container, Heading } from "native-base";
import NavigationBar from "react-native-navbar-color";

const SettingsScreen = () => {
    useEffect(() => {
        NavigationBar.setColor('#155e75');
    }, []);
  return (
    <Container>
      <Heading>Settings</Heading>
    </Container>
  )
}

export default SettingsScreen;
