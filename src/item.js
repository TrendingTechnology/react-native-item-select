import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

import styles from './style';

const positionMapping = {
    topRight: { right: 0 },
    topMiddle: { left: 0, right: 0 },
    bottomLeft: { bottom: 0 },
    bottomRight: { bottom: 0, right: 0 },
    bottomMiddle: { bottom: 0, left: 0, right: 0 },
    leftMiddle: { top: 0, bottom: 0 },
    rightMiddle: { top: 0, bottom: 0, right: 0 },
    middle: {
        top: 0, bottom: 0, left: 0, right: 0,
    },
};

const CheckMark = (props) => {
    const { tickPosition } = props;
    const viewStyle = {
        position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 1,
    };

    return (
        <View style={{ ...viewStyle, ...positionMapping[tickPosition] }}>
            <Text style={
                {
                    backgroundColor: 'green',
                    color: 'white',
                    borderRadius: 12,
                    paddingTop: 3,
                    marginRight: 1,
                    paddingBottom: 3,
                    paddingRight: 6,
                    paddingLeft: 6,
                    fontSize: 12,
                    fontWeight: 'bold',
                }
            }
            >
                &#x2713;
            </Text>
        </View>
    );
};

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false,
        };
    }

    componentDidUpdate(prevProps) {
        const { selected } = this.props;
        const { selected: prevSelected } = prevProps;

        if (selected !== prevSelected) this.setState({ selected });
    }

    render() {
        const {
            item, itemComponent, index, onSelect, isLast, tickPosition, tickStyle,
        } = this.props;
        const { selected } = this.state;
        const { itemTouchableHighlight } = styles;
        const borderColor = selected ? 'green' : '#CECECE';
        const highlightStyle = [itemTouchableHighlight];
        const tickPos = tickPosition || (tickStyle === 'overlayCheck' ? 'middle' : 'topRight');
        highlightStyle.push({ borderColor, opacity: isLast ? 1 : 1 }, { marginBottom: isLast ? 10 : 10 });
        highlightStyle.push(tickStyle === 'overlayCheck' && selected && { backgroundColor: '#cdcdcd' });

        return (
            <TouchableHighlight
                underlayColor="#ddd"
                onPress={() => { onSelect(index, selected, item); }}
                key={item.name}
                style={highlightStyle}
            >
                <View style={{ padding: 5 }}>
                    <View style={{ flexGrow: 1 }}>
                        {selected && <CheckMark tickPosition={tickPos} />}
                        {itemComponent(item)}
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

export default Item;
