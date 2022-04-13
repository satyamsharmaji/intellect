import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export default class SeekBar extends Component {
    containerLeft = 0;
    progressLeft = 0;
    progressRight = 0;

    static defaultProps = {
        progressHeight: 15,
        progressBackgroundColor: '#666666',
        progressColor: '#73dbe5',
        thumbSize: 25,
        thumbColor: '#73dbe5',
        thumbColorPressed: '#73dbe5',
        min: 0,
        max: 100,
        progress: 0,
    }


    constructor(props) {
        super(props);
        this.state = {
            value: this.props.progress,
            progressPosition: this.getPositionFromValue(this.props.progress),
            isPressed: false,
        };


        let containerHeight = Math.max(this.props.progressHeight, this.props.thumbSize) * 2;


        this.styles = StyleSheet.create({
            container: {
                height: containerHeight,
                padding: this.props.progressHeight,
                justifyContent: 'center',
                backgroundColor: 'transparent',
            },
            progressBackground: {
                height: this.props.progressHeight,
                borderRadius: this.props.progressHeight / 2,
                overflow: 'hidden',
                backgroundColor: "#fff",
            },
            innerProgressCompleted: {
                height: this.props.progressHeight,
                backgroundColor: this.props.progressColor,
            },
            progressThumb: {
                width: this.props.thumbSize,
                height: this.props.thumbSize,
                position: 'absolute',
                backgroundColor: this.props.thumbColor,
                borderStyle: 'solid',
                borderRadius: this.props.thumbSize / 2,
                borderWidth: 4,
                borderColor: '#fff'
            },

        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!this.state.isPressed &&
            nextProps.progress != undefined && nextProps.progress != this.props.progress) {
            this.setProgress(nextProps.progress);
        }
    }
    /**
     * @param value
     */
    setProgress(value) {
        if (value < this.props.min) {
            value = this.props.min;
        } else if (value > this.props.max) {
            value = this.props.max;
        }
        let position = this.getPositionFromValue(value);
        this.updatePosition(position);
    }

    getPositionFromValue(value) {
        if (this.props.max <= this.props.min) {
            return 0;
        }
        let position = this.progressLeft + (this.progressRight - this.progressLeft) * (value - this.props.min) / (this.props.max - this.props.min);
        return position;
    }

    getPositionFromEvent(event) {
        let mX = event.nativeEvent.pageX;
        let position = mX - this.containerLeft;
        return position;
    }

    /**
     * @param position  
     * @param fromUser  
     */
    updatePosition(position, fromUser = false) {
        let newValue;
        if (position < this.progressLeft) {
            position = this.progressLeft;
            newValue = this.props.min;
        } else if (position > this.progressRight) {
            position = this.progressRight;
            newValue = this.props.max;
        } else {
            newValue = this.props.min + (this.props.max - this.props.min) * (position - this.progressLeft) / (this.progressRight - this.progressLeft);
        }

        this.setState(
            {
                value: newValue,
                progressPosition: position,
            }
        )
        if (fromUser && this.props.onProgressChanged !== undefined) {
            this.props.onProgressChanged(newValue)
        }

    }


    onGrant(event) {
        let position = this.getPositionFromEvent(event);
        this.updatePosition(position, true);
        this.setState(
            {
                isPressed: true,
            }
        )

        if (this.props.onStartTouch !== undefined) {
            this.props.onStartTouch(this.state.value)
        }

    }

    onMoving(event) {
        let position = this.getPositionFromEvent(event);
        this.updatePosition(position, true);
    }

    onPressEnd(event) {
        let position = this.getPositionFromEvent(event);
        this.updatePosition(position, true);
        this.setState(
            {
                isPressed: false,
            }
        )

        if (this.props.onStopTouch !== undefined) {
            this.props.onStopTouch(this.state.value)
        }
    }


    render() {
        return (
            <View style={[this.styles.container, this.props.style]}
                onLayout={(e) => {
                    this.containerLeft = e.nativeEvent.layout.x;
                    this.setProgress(this.state.value);
                }}

                onStartShouldSetResponder={() => this.props.thumbSize > 0}
                onMoveShouldSetResponder={() => this.props.thumbSize > 0}
                onResponderGrant={(event) => this.onGrant(event)}
                onResponderMove={(event) => this.onMoving(event)}
                onResponderEnd={(event) => this.onPressEnd(event)}
            >

                <View style={this.styles.progressBackground}
                    onLayout={(e) => {
                        this.progressLeft = e.nativeEvent.layout.x;
                        this.progressRight = this.progressLeft + e.nativeEvent.layout.width;
                    }}
                >
                    <View style={[this.styles.innerProgressCompleted,
                    {
                        width: this.state.progressPosition - this.progressLeft,
                        backgroundColor: this.props.progressColor || this.styles.innerProgressCompleted.backgroundColor
                    }
                    ]} />
                </View>

                <View style={[this.styles.progressThumb,
                {
                    left: this.state.progressPosition - this.props.thumbSize / 2,
                    backgroundColor: this.state.isPressed ? this.props.thumbColorPressed : this.props.thumbColor,
                }]}
                />
            </View>
        );
    }


}
