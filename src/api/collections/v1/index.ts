import { HttpClient } from '@/api/common/HttpClient';
import type { PageRequest, Page } from '@/api/common/types';

export interface EventVo {
  id: string;
  name: string;
}

export interface Collection {
  id: string;
  name: string;
  customer: {
    id: string;
  };
  events: EventVo[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCollectionDto {
  name: string;
  eventIds: string[];
}

export interface UpdateCollectionDto {
  name: string;
  eventIds: string[];
}

export interface GetCollectionsParams extends PageRequest {
  name?: string;
}

class CollectionsClient extends HttpClient {
  endpoint = 'api/v1/collections';

  getAll(params?: GetCollectionsParams) {
    return this.client.get<Page<Collection>>(this.endpoint, { params });
  }

  getById(id: string) {
    return this.client.get<Collection>(`${this.endpoint}/${id}`);
  }

  create(data: CreateCollectionDto) {
    return this.client.post<void>(this.endpoint, data);
  }

  update(id: string, data: UpdateCollectionDto) {
    return this.client.put<void>(`${this.endpoint}/${id}`, data);
  }

  remove(id: string) {
    return this.client.delete<void>(`${this.endpoint}/${id}`);
  }
}

const v1 = new CollectionsClient();
export default v1;
