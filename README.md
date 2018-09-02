# React Native Item Select

Sometimes selecting items from dropdowns or checkboxes just don't cut it. You may need a fancy grid item picker. May be this highly customizable List Grid item(s) picker for React Native is what you're looking for.

* [Installation](#installation)
* [Features](#features-tada)
* [Example](#example)
* [Props](#props)
  * [Required Props](#required-props)
  * [Optional Props](#optional-props)
* [Styling](#styling)
  * [Example](#example-1)


## Installation

```
npm install --save react-native-item-select
```

## Features :tada:

- List or Grid. If Grid, customizable no of items per row.
- Multiselect supported.
- Validation for minimum & maximum no of items to be selected.
- Fine-grained style control.

## Example

```jsx
import React, {Component} from 'react';
import { Text, View } from 'react-native';
import ReactNativeSelect from 'react-native-item-select';

class LanguageSelectionScreen extends Component {
  render() {
    const textStyle = { textAlign: 'center', color: '#696969', fontWeight: 'bold' };
    const data = [
      { firstLetter: 'அ', displayName: 'தமிழ்', name: 'Tamil' },
      { firstLetter: 'A', displayName: 'English', name: 'English' },
      ...
    ];

    return (
      <ReactNativeSelect
        data={data}
        itemComponent={
          item => (
            <View>
                <Text style={{ ...textStyle, fontSize: 35 }}>{item.firstLetter}</Text>
                <Text style={textStyle}>{item.displayName}</Text>
            </View>
          )
        }
        onSubmit={item => navigate('Result')}
      />
    );
  }
}
```

## Props

We can divide props into two types. One is mandatory other one is optional. Without optional props, this library will work properly with its default values. However, you've to pass all required props.

### Required Props

  Name         | Type     | Description
---------------|----------|-----------------------------------------------------------------------
data           | Array    | Array of items you pass to `itemComponent` callback.
itemComponent  | Function | Takes 2 parameters and returns a React component. Two paramerts, `(item, selected)`. `item`: `data` prop item, `selected`: `boolean` that suggested whether the item is selected. `selected` boolean is useful when you want to alter the content if it is selected.
onSubmit       | Function | Callback function that consumes selected item(s).

### Optional Props

Name                   |    Type    |       Default       |          Description
-----------------------|------------|---------------------|---------------------------------
multiselect            |   Boolean  |    false            |  Pass this to enable multiselect
countPerRow            |   Number   |      2              |  No of items to display per row, pass 1 for list view
floatSubmitBtn         |   Boolean  |    false            |  When the number of items increases, you may want to float the submit button at the botton of the screen. Pass this prop to do so.
lastRowMargin          |   Number   |      50             |   This only takes effect when you float submit button. Most often floating button will hinder the view of last row. This is to avoid it.
submitBtnTitle         |   String   |    Submit           |   Change submit button title
minSelectCount         |   Number   |       1             |   Valid only when multiselect is enabled. Minimum number of items to be selected to enable submit button.
maxSelectCount         |   Number   |       2             |  Valid only when multiselect is enabled. To set max limit on the number of items selected. Displays an alert when user tries to select more items.
maxSelectAlertTxt      |   String   |  Check description  |  To change the alert text. Default: `You can't select more than N items.`
tickStyle              |   String   |  Check description  |  Valid params: `check`, `overlayCheck`. For single select `check` is default. `overlayCheck` is default for multiselect
tickPosition           |   String   |  Check description  |  Default values: single select - `topRight`, multiselect - `middle`. However, you can override the default by passing custom value. Valid params: `topLeft`, `topRight`, `topMiddle`, `bottomLeft`, `bottomRight`, `bottomMiddle`, `middle`, `leftMiddle`, `rightMiddle`
submitBtnWidth         |   Number   |      100            |   This number represents percentage width. So, to set the width to 50% just pass 50.
tickTxt                |   String   |       ✔             |   Pass some string to change the tick string rendered.
extraItemHighlighProps |   Object   |       {}            |   This is to alter existing prop value or to add new values to the [`TouchableHighlight`](https://facebook.github.io/react-native/docs/touchablehighlight) component that encloses your `itemComponent`.
extraBtnOpacityProps   |   Object   |       {}            |   Use this to pass props to [`TouchableOpacity`](https://facebook.github.io/react-native/docs/touchableopacity) that encloses the submit button.
styles                 |   Object   |       {}            |   For customer styling you can use this prop. Refer [styling](#styling) section.

## Styling

You can alter the styles of any component of this library by passing appropriate prop. For now you can use 10 keys in styles prop to customize the look. They are, `btn`, `btnOpacity`, `btnTxt`, `disabledBtnOpacity`, `disabledBtn`, `disabledBtnTxt`, `itemBoxHighlight`, `activeItemBoxHighlight`, `tickTxt`, `itemComponentWrapper`, `rowWrapper`

### Example

In the following component, styles prop will change the color of submit button, tick background and selected items border color to material blue.

```jsx
<ReactNativeItemSelect
    data={data}
    itemComponent={this.itemComponent}
    onSubmit={this.onSubmit}
    styles={
        {
            btn: { backgroundColor: '#2196F3' },
            disabledBtn: { backgroundColor: '#2196F3' },
            tickTxt: { backgroundColor: '#2196F3' },
            activeItemBoxHighlight: { borderColor: '#2196F3' },
        }
    }
/>
```

#### `btn`, `disabledBtn`

For the Button View. You can use any of the [View style props](https://github.com/vhpoet/react-native-styling-cheat-sheet#view). Use `disabledBtn` key to style the button when it is in disabled state and use `btn` for enabled button.

#### `btnOpacity`, `disabledBtnOpacity`

For the [`TouchableOpacity`](https://facebook.github.io/react-native/docs/touchableopacity) that encloses the button view. You can use any [View style props](https://github.com/vhpoet/react-native-styling-cheat-sheet#view).

#### `btnTxt`, `disabledBtnTxt`

Use this to style the text inside submit button. Refer [Text style props](https://github.com/vhpoet/react-native-styling-cheat-sheet#text).

#### `itemBoxHighlight`, `activeItemBoxHighlight`

You can use this to style the [`TouchableHighlight`](https://facebook.github.io/react-native/docs/touchablehighlight) which wraps your item component. **All border styling must go here**. You can use any [View style props](https://github.com/vhpoet/react-native-styling-cheat-sheet#view) here.

#### `itemComponentWrapper`

This is a View that wraps you item component. Wrapping order is like this `TouchableHighlight` > `View` > `itemComponent`. You can use this to get rid of the padding inside box. Refer [View style props](https://github.com/vhpoet/react-native-styling-cheat-sheet#view).

#### `tickTxt`

You can use this to alter the `View` the encloses your tick character. **Tick color is changed here**. Refer [Text style props](https://github.com/vhpoet/react-native-styling-cheat-sheet#text).

#### `rowWrapper`

Used to alter the style of the View that wraps the items in a row.  Refer [View style props](https://github.com/vhpoet/react-native-styling-cheat-sheet#view).

## LICENSE

MIT
