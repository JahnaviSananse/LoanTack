import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { DraggableGrid } from 'react-native-draggable-grid';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import { setTabbarTabs } from 'src/redux/actions/dashboard_bo';
import { IReduxState } from 'src/redux/reducers';
import styles from './styles';

interface IEditMenuBOProps {
  setTabbarTabs: Function;
  allTabs: any;
  mainlistData: any;
}
var blankData: any[] = [];
const EditMenuBO = (props: IEditMenuBOProps) => {
  const navigation = useNavigation();
  const [data, setData] = React.useState<any[]>([]);
  const [finalData, setFinalData] = React.useState([]);
  const [mData, setMData] = React.useState<any[]>([]);
  React.useEffect(() => {
    blankData = [];
    if (props.mainlistData) {
      // setData(props.mainlistData);
      let termpData = JSON.parse(JSON.stringify(props.mainlistData));
      setMData(termpData);
      let fillData = termpData.filter((fvalue: any) => fvalue.name !== '');
      let mainLinks = fillData.splice(0, 4);
      let mainLinks1 = JSON.parse(JSON.stringify(mainLinks));
      let moreLinks = fillData.splice(0, fillData.length);
      let moreLinks1 = JSON.parse(JSON.stringify(moreLinks));
      fillData = moreLinks.concat(mainLinks);
      let finalLinks1 = mainLinks1.concat(moreLinks1);
      // finalLinks1 = Object.values(finalLinks1).filter(
      //   (fvalue) => fvalue.type === 1,
      // );
      setFinalData(finalLinks1);
      let upperLength = termpData.length - 4;
      // console.log('UpperLength', upperLength % 4);
      if (upperLength % 4 === 0) {
        let mdata: any[] = [];
        Object.values(fillData).map((mvalue, index) => {
          let temp = JSON.parse(JSON.stringify(mvalue));
          temp.key = index.toString();
          mdata.push(temp);
        });
        //mdata = Object.values(mdata).filter((fvalue) => fvalue.type === 1);
        setData(mdata);
      } else {
        let fLength = 4 - (upperLength % 4);
        for (let index = 0; index < fLength; index++) {
          blankData.push({
            id: 'BLANK',
            type: 1,
            name: '',
            key: termpData.length + 1 + (index - 1) + '',
            sequence: termpData.length + (index - 1),
          });
        }
        setTimeout(() => {
          fillData.splice.apply(fillData, [upperLength, 0].concat(blankData));
          let mdata: any[] = [];
          Object.values(fillData).map((mvalue, index) => {
            let temp = JSON.parse(JSON.stringify(mvalue));
            temp.key = index.toString();
            mdata.push(temp);
          });
          setData(mdata);
        }, 500);
      }
    }

    // console.log('MainList', props.mainlistData);
  }, []);

  const renderItem = (item: any, index: number) => {
    // console.log('Edit', item, index);
    if (index > data.length - 5) {
      return (
        <View style={styles.selected_item} key={item.key}>
          <Image
            source={{ uri: item.icon ? item.icon.gray : '' }}
            style={styles.icon}
            resizeMode={'contain'}
          />
          <Text style={styles.item_text}>{item.name}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.item} key={item.key}>
          <Image
            source={{ uri: item.icon ? item.icon.gray : '' }}
            style={styles.icon}
            resizeMode={'contain'}
          />
          <Text style={styles.item_text}>{item.name}</Text>
        </View>
      );
    }
    // return (
    //   <View>
    //     {index > 3 && (
    //       <View style={styles.item} key={item.key}>
    //         <Image
    //           source={{ uri: item.icon ? item.icon.gray : '' }}
    //           style={styles.icon}
    //           resizeMode={'contain'}
    //         />
    //         <Text style={styles.item_text}>{item.name}</Text>
    //       </View>
    //     )}
    //     {index < 4 && (
    //       <View style={styles.selected_item} key={item.key}>
    //         <Image
    //           source={{ uri: item.icon ? item.icon.gray : '' }}
    //           style={styles.icon}
    //           resizeMode={'contain'}
    //         />
    //         <Text style={styles.item_text}>{item.name}</Text>
    //       </View>
    //     )}
    //   </View>
    // );
  };
  let deviderHeight = data.length - 4;
  let readSize = data.length / 4 - (deviderHeight % 4);
  return (
    <SafeAreaView style={styles.container}>
      <COMPONENT.Header
        title={'Edit Menu'}
        leftImg={IMAGES.IC_BACK}
        leftClick={() => {
          setTimeout(() => {
            props.setTabbarTabs(finalData);
            navigation.goBack();
          }, 100);
        }}
      />
      <View style={styles.blackContainer}>
        {/* <Text style={styles.mainLinks}>Main Links</Text> */}
      </View>
      <View
        style={[
          styles.whiteContainer,
          // { marginTop: ((mData.length - 4) % 4) * 180 },
        ]}
      >
        {/* <Text style={styles.moreLinks}>More Links</Text> */}
        <View style={[styles.sep, { top: readSize * 80 }]} />
      </View>
      <View style={styles.wrapper}>
        <DraggableGrid
          numColumns={4}
          renderItem={(item, index) => renderItem(item, index)}
          data={data && data}
          onDragRelease={(data) => {
            // let allData = JSON.parse(JSON.stringify(data));
            // // console.log('All', allData.splice(mData.length - 4, 4));
            // allData = allData.filter((i) => i.name !== '');
            // let mainLinks = allData;
            // console.log('All', allData);
            // let moreLinks = allData;
            // let blankCount: number = 4 - (mData.length % 4);
            // // Alert.alert(JSON.stringify(blankCount));
            // let temp: any = [];
            // let currentBlank = 0;
            // let blankArray: any = [];
            // let upperLength: number = mData.length - 4;
            // for (let index = 0; index < blankCount; index++) {
            //   blankArray.push({
            //     id: 'BLANK',
            //     type: 1,
            //     name: '',
            //     sequence: mData.length + 1 + (index + 1),
            //     key: mData.length + 1 + (index + 1) + '',
            //   });
            // }
            // allData.splice.apply(allData, [upperLength, 0].concat(blankArray));
            // // console.log('ALL DATA FINAL', temp);
            // console.log('TEMP', allData);

            // setData(allData);
            // setFinalData(allData);
            // console.log('Da', data);
            let fillData = data.filter((fvalue: any) => fvalue.name !== '');
            // let fillData = data;
            // let blankData = data.filter((fvalue: any) => fvalue.name === '');
            let moreLinks = fillData.splice(0, mData.length - 4);
            let moreLinks1 = JSON.parse(JSON.stringify(moreLinks));
            let mainLinks = fillData.splice(0, 4);
            let mainLinks1 = JSON.parse(JSON.stringify(mainLinks));
            let finalLinks = moreLinks.concat(mainLinks);
            // finalLinks.map((mVal, i) => {
            //   mVal.sequence = i + 1;
            // });
            // let upperLength: number = mData.length - 3;
            let finalLinks1 = mainLinks1.concat(moreLinks1);
            // finalLinks.map((mVal, i) => {
            //   mVal.sequence = i + 1;
            // });
            let temp: any = [];
            let currentBlank = 0;
            let blankArray: any = [];
            let upperLength: number = mData.length - 4;
            let blankCount: number = 4 - (mData.length % 4);
            for (let index = 0; index < blankCount; index++) {
              blankArray.push({
                id: 'BLANK',
                type: 1,
                name: '',
                sequence: mData.length + 1 + (index + 1),
                key: mData.length + 1 + (index + 1) + '',
              });
            }
            // console.log('moreLinks', moreLinks);
            // console.log('mainList', mainLinks);
            // console.log('FData', finalLinks);
            setFinalData(finalLinks1);
            if (upperLength % 4 === 0) {
              setData(finalLinks);
            } else {
              finalLinks.splice.apply(
                finalLinks,
                [upperLength, 0].concat(blankArray),
              );

              setData(finalLinks);
              console.log('Fata', finalLinks);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  allTabs: state.common.tabs,
  mainlistData: state.dashboard_bo.mainlistData,
});

export default connect(mapStateToProps, {
  setTabbarTabs,
})(EditMenuBO);
