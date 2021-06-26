import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import styles from './styles';

const SelectLoanOfficerBO = () => {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState('');
  const officerData = [
    {name: 'Robert Baker'},
    {name: 'Jack Smith'},
    {name: 'Oliver Ross'},
    {name: 'Ethan Fortin'},
    {name: 'Mike Rudd'},
  ];

  React.useEffect(() => {
    if (search !== '') {
      let ary = [];
      officerData.map((mvalue) => {
        let n = mvalue.name.search(search);
        if (n !== -1) {
          ary.push(mvalue);
        }
      });
      setData(ary);
    } else {
      setData(officerData);
    }
  }, [search]);
  const renderItem = (item: any) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChatLO', {
              name: item.name,
            });
          }}
          style={styles.cellContainer}>
          <Image source={IMAGES.IC_AVATAR} style={styles.avatar} />
          <Text style={styles.nameText}>{item.name}</Text>
        </TouchableOpacity>
        <View style={styles.separetor} />
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAware}>
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={'Select Loan Officer'}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
        />
        <View style={styles.dataContainer}>
          <View style={styles.searchContainer}>
            <Image source={IMAGES.IC_SEARCH} style={styles.searchIcon} />
            <TextInput
              style={styles.textInput}
              value={search}
              placeholder={'Search'}
              onChangeText={(text) => setSearch(text)}
            />
          </View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => renderItem(item)}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SelectLoanOfficerBO;
