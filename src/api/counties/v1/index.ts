import { HttpClient } from '@/api/common/HttpClient';
import type { PageRequest, Page, BaseValueObject } from '@/api/common/types';


export interface County {
  id: string;
  name: string;
  country: BaseValueObject;
}

export interface GetCountiesParams extends PageRequest {
  name?: string;
  'country-id'?: string;
}



class CountiesClient extends HttpClient {
  endpoint = 'api/v1/counties';

  getAll(params?: GetCountiesParams) {
    return this.client.get<Page<County>>(this.endpoint, { params });
  }

  getById(id: string) {
    return this.client.get<County>(`${this.endpoint}/${id}`);
  }
}

const v1 = new CountiesClient();
export default v1;
