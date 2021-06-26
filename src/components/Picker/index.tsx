import * as React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, View } from 'react-native'
import pickerSelectStyles from './styles'
import * as IMAGES from 'src/assets/images/index'
import Image from 'src/components/Image';

interface IProps {
    data: any;
    onValueChange: any;
    value: any;
}

const Picker = (props: IProps) => {
    return (
        <View style={styles.pickerContainer}>
            <RNPickerSelect
                onValueChange={props.onValueChange}
                placeholder={{}}
                items={props.data}
                value={props.value}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                    return (
                        <Image source={IMAGES.IC_DOWN_ARROW_FILL} style={styles.iconContainer} />
                    )
                }}
            />
        </View>
    );
};

export default Picker;


const styles = StyleSheet.create({
    iconContainer: {
        width: 10,
        height: 10,
        top: 8,
        right: 10,
        resizeMode: 'contain'
    },
    pickerContainer: {
        borderWidth: 0.5,
        borderColor: "#CACACA",
        borderRadius: 4
    }
});



