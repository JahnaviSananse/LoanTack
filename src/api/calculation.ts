import AxiosInstance from 'src/api/interceptorCall';

export async function getDefault(type: string) {
  return AxiosInstance.get(`/borrower/calculation/default?type=${type}`);
}

export async function getTypes() {
  return AxiosInstance.get(`/borrower/calculation/types`);
}

export async function getSavedCalculation() {
  return AxiosInstance.get(`/borrower/calculation/save`);
}

export async function getSavedCalculationDetail(id: number) {
  return AxiosInstance.get(`/borrower/calculation/save/${id}`);
}

export async function getCounty(id: number) {
  return AxiosInstance.get(`/borrower/calculation/county/${id}`);
}

export async function saveCalculation(req: any) {
  return AxiosInstance.post(`/borrower/calculation/save`, req);
}

//fha
export async function fhaCalculation(req: any) {
  return AxiosInstance.post(`/borrower/calculation/fha`, req);
}

//conventional
export async function conventionalCalculation(req: any) {
  return AxiosInstance.post(`/borrower/calculation/conventional`, req);
}

//jumbo
export async function jumboCalculation(req: any) {
  return AxiosInstance.post(`/borrower/calculation/jumbo`, req);
}

//usda
export async function usdaCalculation(req: any) {
  return AxiosInstance.post(`/borrower/calculation/usda`, req);
}

//va
export async function vaCalculation(req: any) {
  return AxiosInstance.post(`/borrower/calculation/va`, req);
}

//affordability
export async function affordabilityCalculation(req: any) {
  return AxiosInstance.post(`/borrower/calculation/affordability`, req);
}

//Refinance
//fha
export async function fhaRefinanceCalculation(req: any) {
  console.log('Reuqets', req);
  return AxiosInstance.post(`/borrower/calculation/fha`, req);
}

//conventional
export async function conventionalRefinanceCalculation(req: any) {
  console.log('Reuqets', req);
  return AxiosInstance.post(`/borrower/calculation/conventional`, req);
}

//jumbo
export async function jumboRefinanceCalculation(req: any) {
  console.log('Reuqets', req);
  return AxiosInstance.post(`/borrower/calculation/jumbo`, req);
}

//usda
export async function usdaRefinanceCalculation(req: any) {
  console.log('Reuqets', req);
  return AxiosInstance.post(`/borrower/calculation/usda`, req);
}

//va
export async function vaRefinanceCalculation(req: any) {
  console.log('Reuqets', req);
  return AxiosInstance.post(`/borrower/calculation/va`, req);
}

//va
export async function shouldIRefinanceCalculation(req: any) {
  console.log('Reuqets', req);
  return AxiosInstance.post(`/borrower/calculation/should-refinance`, req);
}

//delete saved
export async function deleteCalculation(id: any) {
  return AxiosInstance.delete(`/borrower/calculation/delete/` + id);
}
