import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

const Header = ({
    step
}) => {
    return (
        <SafeAreaView>
            <View style={style.mainContainer}>
                <View style={style.progressContainer}>
                    <View style={[style.progress, {
                        opacity: step > 0 ? 1 : 0.5
                    }]} />
                    <View style={[style.progress, , {
                        opacity: step > 1 ? 1 : 0.5
                    }]} />
                    <View style={[style.progress, , {
                        opacity: step > 2 ? 1 : 0.5
                    }]} />
                    <View style={[style.progress, , {
                        opacity: step > 3 ? 1 : 0.5
                    }]} />
                    <View style={[style.progress,
                        , {
                        opacity: step > 4 ? 1 : 0.5
                    }]} />

                </View>
                <View style={[style.progressContainer, {
                    paddingVertical: 20,
                    alignItems: 'center'
                }]}>
                    <Text style={{
                        color: "#fff"
                    }}>RESCUE SESSION: ANGER & FRUSTRATION</Text>
                    <Text style={{
                        color: "#fff",
                        fontSize: 20
                    }}>X</Text>
                </View>

                <View>
                    <Text style={{
                        color: "#fff",
                        fontSize: 20
                    }}>Pick the level your anger &{`\n`} frustration right now</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default Header

const style = StyleSheet.create({
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainContainer: {
        paddingHorizontal: 10,
        marginTop: 20
    },
    progress: {
        width: 60,
        height: 4,
        backgroundColor: '#fff',
        borderRadius: 15,
        opacity: 0.5
    }
})