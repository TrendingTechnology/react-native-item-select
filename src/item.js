import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

import styles from './style';

const CheckMark = () => (
    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
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
            item, itemComponent, index, onSelect, isLast,
        } = this.props;
        const { selected } = this.state;
        const { itemTouchableHighlight } = styles;
        const borderColor = selected ? 'green' : '#CECECE';
        const highlightStyle = [itemTouchableHighlight];
        highlightStyle.push({ borderColor }, { marginBottom: isLast ? 55 : 10 });

        return (
            <TouchableHighlight
                underlayColor="#ddd"
                onPress={() => { onSelect(index, selected, item); }}
                key={item.name}
                style={highlightStyle}
            >
                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                    {selected ? <CheckMark /> : null}

                    <View style={{ flexGrow: 1 }}>
                        {itemComponent(item)}
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

export default Item;
