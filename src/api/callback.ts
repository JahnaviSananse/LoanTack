import request from './request';
import AxiosInstance from 'src/api/interceptorCall';
import AxiosFormDataInstance from 'src/api/interceptorFormDataCall';
import { Platform } from 'react-native';


export async function callbackRequest(req: any) {
 return AxiosInstance.post(`/borrower/callbackrequest`, req);
}