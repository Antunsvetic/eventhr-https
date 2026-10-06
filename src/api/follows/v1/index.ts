import { HttpClient } from '@/api/common/HttpClient';
import type { PageRequest, Page, BaseValueObject } from '@/api/common/types';


export interface Follow {
  id: string;
  customer: BaseValueObject;
  organizer: BaseValueObject;
  createdAt: string;
  updatedAt: string;
}

export interface FollowOrganizerDto {
  organizerId: string;
}



class FollowsClient extends HttpClient {
  endpoint = 'api/v1/follows';

  getAll(params?: PageRequest) {
    return this.client.get<Page<Follow>>(this.endpoint, { params });
  }

  follow(data: FollowOrganizerDto) {
    return this.client.post<void>(this.endpoint, data);
  }

  unfollow(organizerId: string) {
    return this.client.delete<void>(`${this.endpoint}/${organizerId}`);
  }
}

const v1 = new FollowsClient();
export default v1;
