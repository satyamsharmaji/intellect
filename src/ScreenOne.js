import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Colors } from "./assets/colors";
import Header from "./common/Header";
import SeekBar from "./custom-features/draggableProgressbar";



const ScreenOne = (props) => {
    const [progress, setProgress] = useState(0)

    const caclulateCircleProgessAsPerValue = () => {
        const base_degrees = -135;
        const rotateBy = base_degrees + (progress * 10 * 3.6);
        return {
            transform: [{ rotateZ: `${rotateBy}deg` }]
        };
    }

    const oupperLayerToMove = () => {
        if (progress * 10 > 50) {
            let progressNow = progress * 10
            /**
            * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
            * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
            * before passing to the propStyle function
            **/
            const base_degrees = -135;
            const rotateBy = base_degrees + ((progressNow - 50) * 3.6);
            return {
                transform: [{ rotateZ: `${rotateBy}deg` }]
            }
        } else {
            return {
                transform: [{ rotateZ: `-135deg` }]
            }
        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: Colors.themeColor
        }}>
            <Header step={1} />
            <View style={{
                flex: 1,
            }}>
                <View style={style.circleMainContainer}>
                    <View style={style.firstCircle}>

                    </View>
                    <View style={style.secondCircle}>

                    </View>
                    <View style={style.thirdCircle}>
                        <Text style={{
                            color: '#fff',
                            position: 'absolute',
                            fontSize: 45
                        }}>{progress}</Text>
                    </View>
                    <View style={{
                        width: 230,
                        height: 230,
                        borderRadius: 230 / 2,
                        borderColor: "#062b2e",
                        borderWidth: 6,
                        position: 'absolute'
                    }} />
                    <View style={{
                        width: 230,
                        height: 230,
                        borderRadius: 230 / 2,
                        borderColor: "#fff",
                        borderWidth: 6,
                        borderLeftColor: "transparent",
                        borderBottomColor: "transparent",
                        position: 'absolute',
                        ...caclulateCircleProgessAsPerValue()
                    }}>
                    </View>
                    <View style={{
                        width: 230,
                        height: 230,
                        borderRadius: 230 / 2,
                        borderColor: "red",
                        borderWidth: 6,
                        borderLeftColor: "transparent",
                        borderBottomColor: "transparent",
                        position: 'absolute',
                        ...oupperLayerToMove()
                    }}>
                    </View>


                </View>

                <View style={{
                    flex: 0.2
                }}>
                    <View>
                        <SeekBar style={{ margin: 20, padding: 0 }}
                            min={0}
                            max={10}
                            onStartTouch={() => { console.log('onStartTouch') }}
                            onProgressChanged={(progress) => setProgress(Math.ceil(progress))}
                            onStopTouch={() => { console.log('onStopTouch') }}
                        />
                    </View>
                </View>

            </View>
            <View style={{
                flex: 0.2,
                paddingHorizontal: 20
            }}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('ScreenTwo')
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
                    }}>Next</Text></TouchableOpacity>
            </View>
        </View>
    )
}
export default ScreenOne

const style = StyleSheet.create({
    thirdCircle: {
        width: 160,
        height: 160,
        backgroundColor: '#73dbe5',
        position: 'absolute',
        borderRadius: 160 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    secondCircle: {
        width: 230,
        height: 230,
        backgroundColor: "#062b2e",
        position: 'absolute',
        borderRadius: 230 / 2,
        opacity: 0.5

    },
    firstCircle: {
        width: 300,
        height: 300,
        position: 'absolute',
        borderRadius: 300 / 2,
        borderStyle: 'dashed',
        borderWidth: 3,
        borderColor: '#fff',
        opacity: 0.5,
    },
    circleMainContainer: {
        width: '100%',
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center'
    }
})