import React, { Component } from 'react';
import {
    ScrollView, Text, TouchableOpacity, View,
} from 'react-native';

import Item from './item';
import styles from './style';

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
        newState.selectedItem = item;

        this.setState(newState);
    }

    // Creates array of arrays for customizable grid layout
    static getChunks(data, chunk) {
        let i;
        let j;
        const temparray = [];

        for (i = 0, j = data.length; i < j; i += chunk) {
            temparray.push(data.slice(i, i + chunk));
        }

        return temparray;
    }

    render() {
        const { data, itemComponent, onSubmit } = this.props;
        const { selectedItem } = this.state;
        const formattedData = ItemSelect.getChunks(data, 2);
        const formattedDataLength = formattedData.length;
        const {
            buttonText,
            buttonView,
            container,
            floatingOpacity,
            itemWrapper,
        } = styles;

        return (
            <View style={container}>
                <ScrollView>
                    <View style={container}>
                        {
                            formattedData.map((chunkData, index) => (
                                <View key={String(index)} style={itemWrapper}>
                                    {
                                        chunkData.map((d, chunkIndex) => {
                                            const chunkDataLength = chunkData.length;
                                            const { [`${index}_${chunkIndex}`]: isSelected } = this.state;
                                            return (
                                                <Item
                                                    isLast={(formattedDataLength - 1 === index)
                                                        && (chunkDataLength - 1 === chunkIndex)}
                                                    index={`${index}_${chunkIndex}`}
                                                    onSelect={this.onSelect}
                                                    key={d.name}
                                                    selected={isSelected}
                                                    itemComponent={itemComponent}
                                                    item={d}
                                                />
                                            );
                                        })
                                    }
                                </View>
                            ))
                        }
                    </View>
                    {/* <Button title="Submit" onPress={() => { }} /> */}
                </ScrollView>

                <TouchableOpacity
                    // disabled
                    onPress={() => { onSubmit(selectedItem); }}
                    style={floatingOpacity}
                >
                    <View style={buttonView}>
                        <Text style={buttonText}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default ItemSelect;
