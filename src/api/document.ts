import AxiosInstance from 'src/api/interceptorCall';

export async function getDocumentsList() {
  return AxiosInstance.get(`/user/borrower/documents`);
}


export async function getDocumentsDetail(id: number) {
  return AxiosInstance.get(`/user/borrower/documents/${id}`);
}
