import React, { useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import timedAnimation from '../../services/timedAnimation';

interface Props {
  index: number;

  name: string;

  choices: Array<string | number>;

  enabled: boolean;

  onHandlerStateChange: (
    _layout: any,
    _translate: any,
    index: number
  ) => (event: any) => any;

  clearOut: () => void;

  landingZoneOccupier?: number;
}

const onPanGestureEvent = (_translate: { x: any; y: any }) => {
  return Animated.event(
    [
      {
        nativeEvent: {
          translationX: _translate.x,
          translationY: _translate.y,
        },
      },
    ],
    { useNativeDriver: true }
  );
};

const DraggableButton: React.FC<Props> = (props) => {
  const _translate = useState(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  )[0];

  const [layout, setLayout] = useState({ x: 0, y: 0 });

  const _onPanGestureEvent = onPanGestureEvent(_translate);

  const _onHandlerStateChange = props.onHandlerStateChange(
    layout,
    _translate,
    props.index
  );

  useEffect(() => {
    if (props.landingZoneOccupier == props.index) {
      timedAnimation(_translate, 0, { x: 0, y: 0 }).start(() => {
        _translate.setOffset({ x: 0, y: 0 });
        _translate.setValue({ x: 0, y: 0 });
        props.clearOut();
      });
    }
  }, [props.choices]);

  return (
    <View
      style={styles.main}
      onLayout={(event) => {
        setLayout({
          x: event.nativeEvent.layout.x,
          y: event.nativeEvent.layout.y,
        });
      }}
    >
      <PanGestureHandler
        onGestureEvent={_onPanGestureEvent}
        onHandlerStateChange={_onHandlerStateChange}
        hitSlop={{ horizontal: 10, vertical: 10 }}
        enabled={props.enabled}
      >
        <Animated.View>
          <TapGestureHandler
            onHandlerStateChange={_onHandlerStateChange}
            enabled={props.enabled}
          >
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      translateX: _translate.x,
                    },
                    {
                      translateY: _translate.y,
                    },
                  ],
                },
              ]}
            >
              <View
                style={{
                  width: 100,
                  ...styles.choice,
                }}
                key={props.index}
              >
                <Text style={styles.text}>{props.name}</Text>
              </View>
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 23,
  },
  choice: {
    height: 46,
    backgroundColor: 'white',
    borderRadius: 23,
    justifyContent: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { height: 1, width: 0 },
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default DraggableButton;
