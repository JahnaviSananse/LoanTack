import Share from 'react-native-share';

const Sharing = (options: Object) => {
  const shareOptions = {
    title: 'Share via',
    message: 'some message',
    url: 'some share url',
    social: Share.Social.WHATSAPP,
    whatsAppNumber: '9199999999', // country code + phone number
    filename: 'test', // only for base64 file in Android
  };
  return Share.open(shareOptions)
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      err && console.log(err);
    });
};

export default Sharing;
