import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Stylesheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const StackProgressBar = (props) => {
    const barBaseValue = Math.ceil(props.barMaxWidth / (props.bars - 1))
    const [activateLevel, setActivateLevel] = useState([]);

    return (
        <View>
            <View style={{
                alignItems: 'center'
            }}>
                <View style={{
                    marginVertical: 20
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 22
                    }}>Level: {activateLevel.length < 3 ? 'Low' : activateLevel.length > 2 && activateLevel.length < 5 ? 'Medium' : activateLevel.length >= 5 ? 'High' : 'Low'}</Text>
                </View>
                {Array.from({ length: props.bars }).map((item, index) => {
                    return (
                        <View
                            onPress={() => {
                                if (activateLevel.indexOf(index) == -1) {
                                    setActivateLevel([...activateLevel, index])
                                }
                                else {
                                    let level = activateLevel
                                    level.splice(activateLevel.indexOf(index), 1);
                                    setActivateLevel([...level])
                                }
                            }}
                            style={{
                                width: props.barMaxWidth - barBaseValue * index,
                                height: 41,
                                backgroundColor: activateLevel.indexOf(index) == -1 ? '#aaa' : '#fff',
                                marginBottom: 10,
                            }}>
                            <View style={{
                                width: 35,
                                height: 44,
                                backgroundColor: activateLevel.indexOf(index) == -1 ? '#aaa' : '#fff',
                                borderRadius: 20,
                                position: 'absolute',
                                left: -14,
                                top: -1,
                                transform: [{
                                    rotate: (index + 1) == props.bars ? '45deg' : '-45deg'
                                }]
                            }} />

                            <View style={{
                                width: 35,
                                height: 44,
                                backgroundColor: activateLevel.indexOf(index) == -1 ? '#aaa' : '#fff',
                                borderRadius: 20,
                                position: 'absolute',
                                right: -14,
                                top: -1,
                                transform: [{
                                    rotate: (index + 1) == props.bars ? '-45deg' : '45deg'
                                }],
                            }} />
                            {props.barMaxWidth - barBaseValue * index === 0 && <View style={{
                                width: 20,
                                height: 20,
                                backgroundColor: activateLevel.indexOf(index) == -1 ? '#aaa' : '#fff',
                                left: -10
                            }} />}
                        </View>
                    )
                })}
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 50
            }}>
                <TouchableOpacity
                    onPress={() => {
                        if (activateLevel.length == 0) {
                            setActivateLevel([props.bars - 1])
                        }
                        else {
                            if (activateLevel.length <= props.bars) {
                                let lastElement = activateLevel[activateLevel.length - 1]
                                lastElement--
                                console.log(lastElement, activateLevel)
                                setActivateLevel([...activateLevel, lastElement])
                            }
                        }

                    }}
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        backgroundColor: 'yellow',
                        borderRadius: 10
                    }}>
                    <Text style={{
                        fontSize: 20,
                    }}>UP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        if (activateLevel.length != 0) {
                            activateLevel.pop()
                            setActivateLevel([...activateLevel])
                        }
                        else {

                        }

                    }}
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        backgroundColor: 'yellow',
                        borderRadius: 10
                    }}>
                    <Text style={{
                        fontSize: 20,
                    }}>DOWN</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default StackProgressBar