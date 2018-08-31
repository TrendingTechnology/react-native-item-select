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
    submitOpacity: {
        bottom: 5,
        padding: 10,
        left: 0,
        right: 0,
    },
    buttonView: {
        borderRadius: 5,
        backgroundColor: '#00955b',
        padding: 8,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    itemTouchableHighlight: {
        flex: 1,
        margin: 10,
        borderRadius: 5,
        borderWidth: 1.5,
    },
    tickTxt: {
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
    },
});
