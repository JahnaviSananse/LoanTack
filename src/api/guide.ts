import AxiosInstance from 'src/api/interceptorCall';
import request from './request';

export async function getGuideList(isGuest: boolean) {
  if (isGuest) {
    return request.authCall({
      url: '/borrower/guide/list',
      method: 'GET',
    });
  }
  return AxiosInstance.get(`/borrower/guide/list`);
}

export async function getLoanProgram(isGuest: boolean) {
  if (isGuest) {
    return request.authCall({
      url: '/borrower/guide/loanprogram',
      method: 'GET',
    });
  }
  return AxiosInstance.get(`/borrower/guide/loanprogram`);
}

export async function getLoanProgramDetail(id: number, isGuest: boolean) {
  if (isGuest) {
    return request.authCall({
      url: `/borrower/guide/loanprogram/${id}`,
      method: 'GET',
    });
  }
  return AxiosInstance.get(`/borrower/guide/loanprogram/${id}`);
}

export async function getLearningCenter(isGuest: boolean) {
  if (isGuest) {
    return request.authCall({
      url: '/borrower/guide/learningcenter',
      method: 'GET',
    });
  }
  return AxiosInstance.get(`/borrower/guide/learningcenter`);
}

export async function getLearningCenterDetail(id: number, isGuest: boolean) {
  if (isGuest) {
    return request.authCall({
      url: `/borrower/guide/learningcenter/${id}`,
      method: 'GET',
    });
  }
  return AxiosInstance.get(`/borrower/guide/learningcenter/${id}`);
}

export async function getChecklist(isGuest: boolean) {
  if (isGuest) {
    return request.authCall({
      url: '/borrower/guide/checklists',
      method: 'GET',
    });
  }
  return AxiosInstance.get(`/borrower/guide/checklists`);
}

export async function getPrivacy(isGuest: boolean) {
  if (isGuest) {
    return request.authCall({
      url: '/borrower/guide/legal/privacy',
      method: 'GET',
    });
  }
  return AxiosInstance.get(`/borrower/guide/legal/privacy`);
}
export async function getDisclaimer(isGuest: boolean) {
  if (isGuest) {
    return request.authCall({
      url: '/borrower/guide/legal/disclaimer',
      method: 'GET',
    });
  }
  return AxiosInstance.get(`/borrower/guide/legal/disclaimer`);
}

export async function updateChecklist(req: any) {
  // console.log('Request', req, isGuest);
  return AxiosInstance.post(`/borrower/guide/checklists`, req);
}

export async function getGlossarylist(isGuest: boolean) {
  if (isGuest) {
    return request.authCall({
      url: '/borrower/guide/glossary',
      method: 'GET',
    });
  }
  return AxiosInstance.get('/borrower/guide/glossary');
}
