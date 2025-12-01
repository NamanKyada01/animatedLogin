import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenWrapper from '../../components/ScreenWrapper';
import { lightColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const colors = lightColors;

    const [name, setName] = useState('');
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

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Account created successfully');
            navigation.navigate('Login' as never);
        }, 1500);
    };

    const handleGoogleLogin = async () => {
        Alert.alert('Info', 'Google Login not implemented');
    };

    const styles = createStyles(colors, fonts);

    return (
        <LinearGradient colors={[colors.secondary, '#EE5D5D', '#D43F3F']} style={styles.container}>
            <ScreenWrapper
                style={{ backgroundColor: 'transparent' }}
                statusBarColor="transparent"
                translucent
                edges={['top', 'left', 'right']}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>
                </View>

                <Animated.View style={[styles.formContainer, animatedFormStyle, { paddingBottom: insets.bottom + 20 }]}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            placeholderTextColor={colors.textLight}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

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
                            placeholder="Create a password"
                            placeholderTextColor={colors.textLight}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color={colors.white} />
                        ) : (
                            <Text style={styles.buttonText}>Sign Up</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.googleButton, { borderColor: colors.border }]} onPress={handleGoogleLogin} disabled={loading}>
                        <View style={styles.googleButtonContent}>
                            <Text style={[styles.googleButtonText, { color: colors.text, marginLeft: 0 }]}>Sign in with Google</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
                            <Text style={styles.link}>Login</Text>
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
    button: {
        backgroundColor: colors.secondary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: colors.secondary,
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
        color: colors.secondary,
        fontSize: 16,
        fontFamily: fonts.bold,
    },
});

export default RegisterScreen;
