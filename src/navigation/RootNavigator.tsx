import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';

const RootNavigator = () => {

    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    );
};

export default RootNavigator;
