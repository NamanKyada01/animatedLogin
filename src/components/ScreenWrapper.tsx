import React from 'react';
import { StyleSheet, ViewStyle, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { lightColors } from '../theme/colors';

interface ScreenWrapperProps {
    children: React.ReactNode;
    style?: ViewStyle;
    withScrollView?: boolean;
    statusBarColor?: string;
    translucent?: boolean;
    edges?: Edge[];
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
    children,
    style,
    statusBarColor,
    translucent = false,
    edges = ['top', 'left', 'right', 'bottom']
}) => {
    const colors = lightColors;
    const isDark = false; // Default to light theme

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: colors.background },
                style
            ]}
            edges={edges}
        >
            <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor={statusBarColor || colors.background}
                translucent={translucent}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                {children}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ScreenWrapper;
