import { HttpClient } from '@/api/common/HttpClient';
import type { FileVo, PageRequest, Page } from '@/api/common/types';


export interface Ad {
  id: string;
  title: string;
  description: string;
  image: FileVo;
  url?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdDto {
  title: string;
  description: string;
  imageId: string;
  url?: string;
}

export type UpdateAdDto = CreateAdDto;

export interface GetAdsParams extends PageRequest {
  title?: string;
}



class AdsClient extends HttpClient {
  endpoint = 'api/v1/ads';

  getAll(params?: GetAdsParams) {
    return this.client.get<Page<Ad>>(this.endpoint, { params });
  }

  create(data: CreateAdDto) {
    return this.client.post<void>(this.endpoint, data);
  }

  update(id: string, data: UpdateAdDto) {
    return this.client.put<void>(`${this.endpoint}/${id}`, data);
  }

  remove(id: string) {
    return this.client.delete<void>(`${this.endpoint}/${id}`);
  }
}

const v1 = new AdsClient();
export default v1;
