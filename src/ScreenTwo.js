import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from "./assets/colors";
import Header from "./common/Header";
import StackProgressBar from "./custom-features/stackProgressBar";

const ScreenTwo = (props) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: Colors.themeColor
        }}>
            <Header step={2} />
            <View style={{
                flex: 1,
            }}>
                <View style={style.circleMainContainer}>
                    <StackProgressBar
                        bars={5}
                        barMaxWidth={200}
                    />
                </View>
            </View>
            <View style={{
                flex: 0.2,
                paddingHorizontal: 20
            }}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                    style={{
                        backgroundColor: "#fff",
                        width: '100%',
                        height: 45,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}><Text style={{
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}>Back</Text></TouchableOpacity>
            </View>
        </View>
    )
}
export default ScreenTwo

const style = StyleSheet.create({
    circleMainContainer: {
        width: '100%',
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center'
    }
})