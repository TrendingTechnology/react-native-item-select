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
        disableBtn, floatingBtn, onSubmit, selectedItem, submitBtnTitle, multiselect,
    } = props;
    const opacityStyle = [
        submitOpacity,
        floatingBtn && { position: 'absolute' },
        disableBtn && { opacity: 0.5 },
    ];
    let submitItem = selectedItem;

    if (multiselect) submitItem = selectedItem && selectedItem.map(obj => obj.item);

    return (
        <TouchableOpacity
            disabled={disableBtn}
            onPress={() => { onSubmit(submitItem); }}
            style={opacityStyle}
        >
            <View style={buttonView}>
                <Text style={buttonText}>{submitBtnTitle || 'Submit'}</Text>
            </View>
        </TouchableOpacity>
    );
};

class ItemSelect extends Component {
    static isDisabled(selectedItem, multiselect, minSelectCount) {
        return (multiselect && selectedItem && selectedItem.length < minSelectCount) || !selectedItem;
    }

    constructor(props) {
        super(props);

        const { multiselect } = props;

        this.state = {
            indexMapping: {},
            selectedItem: multiselect && [],
        };
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(index, selected, item) {
        const newState = { ...this.state };
        const { indexMapping, selectedItem } = newState;
        let tempSelected = selectedItem;
        // console.log('Prev State', newState);
        const { multiselect } = this.props;

        if (!multiselect) Object.keys(indexMapping).forEach((i) => { indexMapping[i] = false; });

        indexMapping[index] = !selected;

        if (multiselect) {
            if (selected) tempSelected = tempSelected.filter(obj => obj.index !== index);
            else tempSelected.push({ index, item });
        } else {
            tempSelected = selected ? null : item;
        }

        newState.selectedItem = tempSelected;

        // console.log('New State', newState);
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
        const { isDisabled, getChunks } = ItemSelect;
        const {
            data, onSubmit, countPerRow, floatSubmitBtn, submitBtnTitle,
            multiselect, minSelectCount, maxSelectCount,
        } = this.props;
        const { selectedItem } = this.state;
        const formattedData = getChunks(data, countPerRow || 2);
        const formattedDataLength = formattedData.length;
        const {
            container,
            itemWrapper,
        } = styles;
        const renderSubmitBtn = () => (
            <SubmitButton
                multiselect={multiselect}
                floatingBtn={floatSubmitBtn}
                selectedItem={selectedItem}
                disableBtn={isDisabled(selectedItem, multiselect, minSelectCount || 1)}
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
                                            const {
                                                indexMapping: { [`${index}_${chunkIndex}`]: isSelected },
                                            } = this.state;

                                            return (
                                                <Item
                                                    denySelect={multiselect && selectedItem.length === maxSelectCount}
                                                    isLast={(formattedDataLength - 1 === index)
                                                        && (chunkDataLength - 1 === chunkIndex)}
                                                    index={`${index}_${chunkIndex}`}
                                                    onSelect={this.onSelect}
                                                    key={String(chunkIndex)}
                                                    selected={isSelected}
                                                    item={item}
                                                    {...this.props}
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
