import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './style';
import * as CONSTANT from 'src/constants/constant'

interface IButtonProps {
    data: any;
    column: number;
}

const ChartDetail = (props: IButtonProps) => {
    const { data, column } = props;
    let width = CONSTANT.SCREEN_WIDTH - 30
    let optionWidth = width / column
    return (
        <View>
            <FlatList
                scrollEnabled={false}
                data={data}
                showsVerticalScrollIndicator={false}
                numColumns={column}
                renderItem={({ item }) =>
                    <View style={[styles.cellContainer, { width: optionWidth }]}>
                        <View style={styles.colorContainer}>
                            <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                            <Text style={[styles.cellAmount, { color: item.color, }]}>{item.title}</Text>
                        </View>
                        {item.desc && <Text style={styles.cellDesc}>{item.desc}</Text>}
                    </View>
                }
            />
        </View>
    );

}
export default ChartDetail;
