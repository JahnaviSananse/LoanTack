import { Platform } from 'react-native';
import AxiosInstance from 'src/api/interceptorCall';
import AxiosFormDataInstance from 'src/api/interceptorFormDataCall';

///user/device-token
export async function saveDeviceToken(req: any) {
  return AxiosInstance.post(`/user/device-token`, req);
}


//getNotificationList
export async function getNotificationList() {
  return AxiosInstance.get(`/user/listing/notifications`);
}

// /user/listing/messages
export async function getLODashboardList() {
  return AxiosInstance.get(`/user/listing/messages`);
}


export async function getChatID(req?: any) {
  if (req) {
    return AxiosInstance.post(`/user/chat-id`, req);
  } else {
    return AxiosInstance.post(`/user/chat-id`);
  }
}

export async function referDeepLink(req: any) {
  return AxiosInstance.post(`/user/deep-link`, req);
}

export async function getUserProfile() {
  return AxiosInstance.get(`/user/profile`);
}

export async function changePassword(req: any) {
  console.log('reqreqreq', req);
  return AxiosInstance.put(`/user/changepassword`, req);
}

export async function updateEmail(email: string) {
  return AxiosInstance.post(`/user/email`, { email: email });
}

export async function saveUserProfile(req: any) {
  var imgObj: any = '';
  console.log("Save Use rpO", req)

  if (req.profile_photo.uri) {
    imgObj = {
      name:
        req.profile_photo.fileName === undefined ||
        req.profile_photo.fileName === null
          ? 'profile.jpeg'
          : req.profile_photo.fileName,
      type: req.profile_photo.type,
      uri: 'data:image/jpeg;base64,' + req.profile_photo.uri,
    };
  } else if(req.profile_photo && Object.keys(req.profile_photo).length > 0 ){
    imgObj = {
      name: req.profile_photo.substring(req.profile_photo.lastIndexOf('/') + 1),
      type: 'jpeg',
      uri: req.profile_photo,
    };
  }
  let formData = new FormData();
  var path_value =
    Platform.OS === 'android'
      ? req.profile_photo?.uri
      : req.profile_photo?.uri?.toString().replace('file://', '');
  let newFile = {
    name:
      req.profile_photo?.filename != null && req.profile_photo?.filename != ''
        ? req.profile_photo?.filename
        : 'file1.jpg',
    uri: path_value,
    type: req.profile_photo?.type,
  };
  formData.append('profile_photo', newFile);
  // formData.append('email', req.email);
  formData.append('bio', req.bio);
  console.log('FORMDATA', formData);
  return AxiosFormDataInstance.post(`/user/loanofficer/profile`, formData);
}

export async function getNotification(req: any) {
  return AxiosInstance.get(`/user/notification`);
}

export async function saveNotification(req: any) {
  return AxiosInstance.post(`/user/notification`, req);
}

//Borrower
export async function saveBorrowerProfile(req: any) {
  return AxiosInstance.post(`/user/borrower/profile`, req);
}

//get Borrowers
export async function getBorrowers() {
  return AxiosInstance.get(`/user/borrower/list`);
}

export async function saveChatDocument(req: any) {
  var imgObj: any = '';

  if (req.chat_document.uri) {
    imgObj = {
      name:
        req.chat_document.fileName === undefined ||
        req.chat_document.fileName === null
          ? 'doc.jpeg'
          : req.chat_document.fileName,
      type: req.chat_document.type,
      uri: 'data:image/jpeg;base64,' + req.chat_document.uri,
    };
  } else {
    imgObj = {
      name: req.chat_document.substring(req.chat_document.lastIndexOf('/') + 1),
      type: 'jpeg',
      uri: req.chat_document,
    };
  }
  let formData = new FormData();
  var path_value =
    Platform.OS === 'android'
      ? req.chat_document.uri
      : req.chat_document.uri.toString().replace('file://', '');
  let newFile = {
    name:
      req.chat_document.filename != null && req.chat_document.filename != ''
        ? req.chat_document.filename
        : 'file1.jpg',
    uri: path_value,
    type: req.chat_document.type,
  };
  formData.append('chat_document', newFile);
  console.log('FORMDATA', formData);
  return AxiosFormDataInstance.post(`/user/chat-document`, formData);
}
