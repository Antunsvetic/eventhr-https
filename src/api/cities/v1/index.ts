import { HttpClient } from '@/api/common/HttpClient';
import type { PageRequest, Page, BaseValueObject } from '@/api/common/types';


export interface City {
  id: string;
  name: string;
  country: BaseValueObject;
  county: BaseValueObject;
}

export interface GetCitiesParams extends PageRequest {
  name?: string;
  'country-id'?: string;
  'county-id'?: string;
}



class CitiesClient extends HttpClient {
  endpoint = 'api/v1/cities';

  getAll(params?: GetCitiesParams) {
    return this.client.get<Page<City>>(this.endpoint, { params });
  }

  getById(id: string) {
    return this.client.get<City>(`${this.endpoint}/${id}`);
  }
}

const v1 = new CitiesClient();
export default v1;
