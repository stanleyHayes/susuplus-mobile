import React from "react";
import { Toast, Text } from "native-base";

const getInitials = name => {
    if (name) {
        const names = name.split(" ");
        if (names.length === 1)
            return names[0][0].toUpperCase();
        else if (names.length === 2) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase();
        }
    } else {
        return "A";
    }
};

const showToast = (title, description, variant, duration) => {
    Toast.show({
        title: <Text width="100%" fontSize="lg">{title}</Text>,
        description:  <Text width="100%" fontSize="sm">{description}</Text>,
        placement: 'bottom',
        status: variant,
        variant: 'left-accent',
        duration,
        isClosable: true
    })
}

export const navigate = (navigation, path) => {
    navigation.navigate(path);
}


export const UTILS = { getInitials, showToast, navigate };
