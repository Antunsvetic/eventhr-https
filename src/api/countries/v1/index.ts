import { HttpClient } from '@/api/common/HttpClient';
import type { PageRequest, Page } from '@/api/common/types';


export interface Country {
  id: string;
  name: string;
}

export interface GetCountriesParams extends PageRequest {
  name?: string;
}



class CountriesClient extends HttpClient {
  endpoint = 'api/v1/countries';

  getAll(params?: GetCountriesParams) {
    return this.client.get<Page<Country>>(this.endpoint, { params });
  }

  getById(id: string) {
    return this.client.get<Country>(`${this.endpoint}/${id}`);
  }
}

const v1 = new CountriesClient();
export default v1;
