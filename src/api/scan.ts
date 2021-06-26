import AxiosInstance from 'src/api/interceptorCall';
import AxiosFormDataInstance from 'src/api/interceptorFormDataCall';

export async function getDocument() {
  return AxiosInstance.get(`/borrower/scan/upload`);
}

export async function saveDocument(req: any, file: any) {
  console.log('Before', file);
  let formData = new FormData();
  if (file.length > 0) {
    file.map((item: any) => {
      console.log('FileItem', item);
      let tempFile = {
        name: item.name,
        type: item.type,
        uri: item.uri,
      };
      formData.append('media', tempFile);
    });
  }

  formData.append('name', req.name);
  formData.append('uploaded_for', 3);
  formData.append('is_combine', req.is_combine);

  console.log('D Request', formData);

  return AxiosFormDataInstance.post(`/borrower/scan/upload`, formData);
}

export async function deleteDocument(id: any) {
  return AxiosInstance.delete(`/borrower/scan/upload/` + id);
}
