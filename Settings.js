import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Switch } from "react-native-gesture-handler"
import { useState } from "react/cjs/react.development"
import { EventRegister } from 'react-native-event-listeners'
import { useTheme } from "@react-navigation/native"

export default function Settings() {
    const { colors } = useTheme();
    const [darkMode, setDarkMode] = useState(false)
    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <Text style={[styles.text,{color: colors.text}]}>Dark Mode</Text>
            <Switch value={darkMode} onValueChange={(val) => {
                setDarkMode(val);
                EventRegister.emit('changeThemeEvent', val)
            }}></Switch>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontWeight: "bold",
        fontSize: 18,
    },
})