import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    itemWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    floatingOpacity: {
        bottom: 5,
        padding: 10,
        position: 'absolute',
        width: '100%',
    },
    buttonView: {
        borderRadius: 5,
        backgroundColor: '#2196F3',
        padding: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    itemTouchableHighlight: {
        flex: 1,
        padding: 15,
        margin: 10,
        borderRadius: 5,
        borderWidth: 1.5,
    },
});
