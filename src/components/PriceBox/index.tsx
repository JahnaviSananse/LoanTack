import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from './styles';


interface IProps {
    sign: string;
    title: any;
    onChangeText: any;
    width: number;
    maxLength: number;
    onEndEditing: any;
}

const PriceBox = (props: IProps) => {
    const {title} = props;
    return (
        <View style={[styles.buttonView, { width: props.width ? props.width : 80 }]}>
            <Text style={styles.signText}>{`${props.sign}`}</Text>
            <TextInput
                value={title !== undefined && title !== null ? title.toString() : ''}
                style={[styles.inputText, { width: props.width ? props.width - 20 : 60 }]}
                keyboardType={'decimal-pad'}
                maxLength={props.maxLength}
                onEndEditing={props.onEndEditing}
                onChangeText={(text) => props.onChangeText(text)}
            />
        </View>
    )
}
export default PriceBox;
