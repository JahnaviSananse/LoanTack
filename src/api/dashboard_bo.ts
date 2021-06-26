import AxiosInstance from 'src/api/interceptorCall';

export async function getColorScheme() {
  return AxiosInstance.get(`/borrower/color-schema`);
}

export async function getMainList() {
  return AxiosInstance.get(`/borrower/dashboard/mainlist`);
}
export async function getDashboardList() {
  return AxiosInstance.get(`/borrower/dashboard/dashboardlist`);
}
export async function getLOOfficers() {
  return AxiosInstance.get(`/borrower/dashboard/loanofficers`);
}

export async function getAssignedLO() {
  return AxiosInstance.get(`/borrower/dashboard/assigned/lo`);
}

export async function getLODetails() {
  return AxiosInstance.get(`/borrower/dashboard/loanofficers/4`);
}

export async function AssignLO(request: Object) {
  return AxiosInstance.post(`/borrower/dashboard/assign/lo`, request);
}
