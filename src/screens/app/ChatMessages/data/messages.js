module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Yes, and I use Gifted Chat!',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Developer',
    },
    sent: true,
    received: true,
    // location: {
    //   latitude: 48.864601,
    //   longitude: 2.398704
    // },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text:
      'Andres has been a counsellor on CARA since the beginning. He has been a friendly support to over 50 people on CARA. He loves to talk to people and spread positive energy around.',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
    },
  },
  // {
  //     _id: Math.round(Math.random() * 1000000),
  //     text: "You are officially rocking GiftedChat.",
  //     createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
  //     system: true,
  // },
];
