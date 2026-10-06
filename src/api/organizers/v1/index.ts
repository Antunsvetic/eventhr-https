import { HttpClient } from '@/api/common/HttpClient';
import type { PageRequest, Page } from '@/api/common/types';


export interface Organizer {
  id: string;
  name: string;
  following: boolean;
}



class OrganizersClient extends HttpClient {
  endpoint = 'api/v1/organizers';

  getAll(params?: PageRequest) {
    return this.client.get<Page<Organizer>>(this.endpoint, { params });
  }

  getById(id: string) {
    return this.client.get<Organizer>(`${this.endpoint}/${id}`);
  }
}

const v1 = new OrganizersClient();
export default v1;
