import React, { Component } from 'react';
import {
    Alert, View, TouchableHighlight, Text,
} from 'react-native';

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

const CheckMark = ({ customTickTxt, textStyle, tickPos }) => {
    const { tickTxt } = styles;
    const viewStyle = {
        position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 1,
    };
    const textContent = customTickTxt || <Text>&#x2713;</Text>;

    return (
        <View style={{ ...viewStyle, ...positionMapping[tickPos] }}>
            <Text style={[tickTxt, textStyle]}>
                {textContent}
            </Text>
        </View>
    );
};

class Item extends Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            selected: false,
        };
    }

    componentDidUpdate(prevProps) {
        const { selected } = this.props;
        const { selected: prevSelected } = prevProps;

        if (selected !== prevSelected) this.setState({ selected });
    }

    handleSelect() {
        const { selected } = this.state;
        const {
            denySelect, index, onSelect, item, maxSelectCount, maxSelectAlertTxt,
        } = this.props;

        if (denySelect && !selected) {
            return Alert.alert('', maxSelectAlertTxt || `You can't select more than ${maxSelectCount} items`);
        }

        return onSelect(index, selected, item);
    }

    render() {
        const {
            extraItemHighlighProps, item, itemComponent, index, tickPosition,
            tickStyle, tickTxt, multiselect, styles: customStyles,
        } = this.props;
        const {
            itemBoxHighlight, itemComponentWrapper, activeItemBoxHighlight, tickTextWrapperView,
        } = customStyles || {};
        const { selected } = this.state;
        const { itemTouchableHighlight } = styles;
        const borderColor = selected ? 'green' : '#CECECE';
        const highlightStyle = [itemTouchableHighlight];
        const tickPos = tickPosition || (tickStyle === 'overlayCheck' || multiselect ? 'middle' : 'topRight');
        const tickProps = {
            textStyle: tickTextWrapperView, customTickTxt: tickTxt, tickPos, tickStyle,
        };

        highlightStyle.push({ borderColor }, { marginBottom: 10 }, itemBoxHighlight);
        highlightStyle.push(multiselect && tickStyle !== 'check' && selected && { backgroundColor: '#cdcdcd' });

        if (selected) highlightStyle.push(activeItemBoxHighlight);

        return (
            <TouchableHighlight
                underlayColor="#ddd"
                onPress={this.handleSelect}
                key={index}
                style={highlightStyle}
                {...extraItemHighlighProps}
            >
                <View style={[{ padding: 5 }, itemComponentWrapper]}>
                    <View style={{ flexGrow: 1 }}>
                        {selected && <CheckMark {...tickProps} />}
                        {itemComponent(item)}
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

export default Item;
