import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import { getNotificationList } from 'src/redux/actions/user';
import { IReduxState } from 'src/redux/reducers';
import { diff_hours, diff_minutes } from 'src/utility/util';
import styles from './styles';

interface INotificationProp {
  notifications: any[];
  getNotificationList: Function;
}

const NotificationLO = (props: INotificationProp) => {
  const navigation = useNavigation();
  const params = useRoute().params;
  // const data = [
  //   { name: 'Jack recently uploaded a document', time: '3 mins ago' },
  //   { name: 'Oliver Ross has sent you a message', time: '2 hours ago' },
  // ];
  const [data, setData] = React.useState<any>([]);
  React.useEffect(() => {
    props.getNotificationList();
  }, []);

  React.useEffect(() => {
    if (props.notifications) {
      setData(props.notifications);
    }
  }, [props.notifications]);

  const renderItem = (item: any) => {
    //2021-03-09T10:38:53.760Z
    let today = new Date();
    let fDate = dayjs(today).format('DD/MM/YYYY');
    let fNDate = dayjs(item.created_at).format('DD/MM/YYYY');
    let displayDate: any = fNDate;
    var toUTC = new Date(item.created_at);

    if (fNDate === fDate && diff_hours(today, toUTC) === 0) {
      let min = diff_minutes(today, toUTC) > 0 ? diff_minutes(today, toUTC) : 1;
      displayDate = min + ' minutes ago';
    } else if (fNDate === fDate && diff_hours(today, toUTC) > 0) {
      displayDate = diff_hours(today, toUTC) + ' hours ago';
    } else {
      displayDate = dayjs(item.created_at).format('MMM DD, YYYY');
    }
    // let time =
    //   moment(item.created_at).format('DD:MM:YYYY hh:mm') + ' hours ago';
    // let time = moment(item.created_at).format('HH') + ' hours ago';
    if (item.meta_data && item.meta_data !== null) {
      return (
        <View>
          <View style={styles.cellContainer2}>
            <Text style={styles.nameText2}>{item.notification_text}</Text>
            <Text>
              +{item.meta_data.contact_code + ' '}
              {item.meta_data.contact_number}
            </Text>
            <Text>{item.meta_data.best_time_to_call}</Text>
            <Text>{item.meta_data.comment}</Text>
          </View>

          <Text style={styles.timeText2}>{displayDate}</Text>
          <View style={styles.separetor} />
        </View>
      );
    }
    return (
      <View>
        <View style={styles.cellContainer}>
          <Text style={styles.nameText}>{item.notification_text}</Text>
          <Text style={styles.timeText}>{displayDate}</Text>
        </View>
        <View style={styles.separetor} />
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={'Notifications'}
          leftImg={params !== undefined && IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
        />
        <View style={styles.flatlistContaier}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderItem(item)}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text>No New Messages Available</Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  notifications: state.user.notifications,
  access_token: state.auth.access_token,
});

export default connect(mapStateToProps, { getNotificationList })(
  NotificationLO,
);
