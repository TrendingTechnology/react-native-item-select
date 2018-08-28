import React, { Component } from 'react';
import {
    ScrollView, Text, TouchableOpacity, View,
} from 'react-native';

import Item from './item';
import styles from './style';

const SubmitButton = (props) => {
    const {
        buttonText,
        buttonView,
        submitOpacity,
    } = styles;
    const {
        disableBtn, floatingBtn, onSubmit, selectedItem, submitBtnTitle,
    } = props;
    const opacityStyle = [
        submitOpacity,
        floatingBtn && { position: 'absolute' },
        disableBtn && { opacity: 0.5 },
    ];

    return (
        <TouchableOpacity
            disabled={disableBtn}
            onPress={() => { onSubmit(selectedItem); }}
            style={opacityStyle}
        >
            <View style={buttonView}>
                <Text style={buttonText}>{submitBtnTitle || 'Submit'}</Text>
            </View>
        </TouchableOpacity>
    );
};

class ItemSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(index, selected, item) {
        const newState = { ...this.state };

        Object.keys(newState).forEach((v) => { newState[v] = false; });
        newState[index] = !selected;
        newState.selectedItem = selected ? null : item;

        this.setState(newState);
    }

    // Creates array of arrays for customizable grid layout
    static getChunks(data, chunk) {
        let i;
        let j;
        const tempArray = [];

        for (i = 0, j = data.length; i < j; i += chunk) {
            tempArray.push(data.slice(i, i + chunk));
        }

        return tempArray;
    }

    render() {
        const {
            data, itemComponent, onSubmit, countPerRow, floatSubmitBtn, submitBtnTitle,
            tickPosition, tickStyle,
        } = this.props;
        const { selectedItem } = this.state;
        const formattedData = ItemSelect.getChunks(data, countPerRow || 2);
        const formattedDataLength = formattedData.length;
        const {
            container,
            itemWrapper,
        } = styles;
        const renderSubmitBtn = () => (
            <SubmitButton
                floatingBtn={floatSubmitBtn}
                selectedItem={selectedItem}
                disableBtn={!selectedItem}
                onSubmit={onSubmit}
                submitBtnTitle={submitBtnTitle}
            />
        );

        return (
            <View style={container}>
                <ScrollView>
                    <View style={container}>
                        {
                            formattedData.map((chunkData, index) => (
                                <View key={String(index)} style={itemWrapper}>
                                    {
                                        chunkData.map((item, chunkIndex) => {
                                            const chunkDataLength = chunkData.length;
                                            const { [`${index}_${chunkIndex}`]: isSelected } = this.state;
                                            return (
                                                <Item
                                                    isLast={(formattedDataLength - 1 === index)
                                                        && (chunkDataLength - 1 === chunkIndex)}
                                                    index={`${index}_${chunkIndex}`}
                                                    onSelect={this.onSelect}
                                                    key={String(chunkIndex)}
                                                    selected={isSelected}
                                                    itemComponent={itemComponent}
                                                    item={item}
                                                    tickPosition={tickPosition}
                                                    tickStyle={tickStyle}
                                                />
                                            );
                                        })
                                    }
                                </View>
                            ))
                        }
                    </View>

                    { !floatSubmitBtn && renderSubmitBtn() }
                </ScrollView>

                { floatSubmitBtn && renderSubmitBtn() }
            </View>
        );
    }
}

export default ItemSelect;
