import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenWrapper from '../../components/ScreenWrapper';
import { lightColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

const LoginScreen = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const colors = lightColors;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const formTranslateY = useSharedValue(Dimensions.get('window').height);

    useEffect(() => {
        formTranslateY.value = withSpring(0, {
            damping: 50,
            stiffness: 100,
            mass: 1,
        });
    }, []);

    const animatedFormStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: formTranslateY.value }],
        };
    });

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Logged in successfully');
        }, 1500);
    };

    const handleGoogleLogin = async () => {
        Alert.alert('Info', 'Google Login not implemented');
    };

    const styles = createStyles(colors, fonts);

    return (
        <LinearGradient colors={[colors.primary, '#3b5998', '#192f6a']} style={styles.container}>
            <ScreenWrapper
                style={{ backgroundColor: 'transparent' }}
                statusBarColor="transparent"
                translucent
                edges={['top', 'left', 'right']}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to continue</Text>
                </View>

                <Animated.View style={[styles.formContainer, animatedFormStyle, { paddingBottom: insets.bottom + 20 }]}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor={colors.textLight}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor={colors.textLight}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color={colors.white} />
                        ) : (
                            <Text style={styles.buttonText}>Login</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.googleButton, { borderColor: colors.border }]} onPress={handleGoogleLogin} disabled={loading}>
                        <View style={styles.googleButtonContent}>
                            <Text style={[styles.googleButtonText, { color: colors.text, marginLeft: 0 }]}>Sign in with Google</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
                            <Text style={styles.link}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ScreenWrapper>
        </LinearGradient>
    );
};

const createStyles = (colors: any, fonts: any) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        paddingHorizontal: 30,
        marginBottom: 50,
    },
    title: {
        fontSize: 32,
        fontFamily: fonts.bold,
        color: colors.white,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#ddd',
        fontFamily: fonts.regular,
    },
    formContainer: {
        backgroundColor: colors.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 50,
        height: '100%',
        flex: 1,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: colors.text,
        marginBottom: 8,
        fontFamily: fonts.semiBold,
    },
    input: {
        backgroundColor: colors.card,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.border,
        fontFamily: fonts.regular,
    },
    forgotPassword: {
        alignItems: 'flex-end',
        marginBottom: 30,
    },
    forgotPasswordText: {
        color: colors.primary,
        fontFamily: fonts.semiBold,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 15,
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
        fontFamily: fonts.bold,
    },
    googleButton: {
        backgroundColor: 'transparent',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 1,
        marginBottom: 15,
    },
    googleButtonText: {
        fontSize: 16,
        fontFamily: fonts.semiBold,
        marginLeft: 10,
    },
    googleButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    footerText: {
        color: colors.textLight,
        fontSize: 16,
        fontFamily: fonts.regular,
    },
    link: {
        color: colors.primary,
        fontSize: 16,
        fontFamily: fonts.bold,
    },
});

export default LoginScreen;
