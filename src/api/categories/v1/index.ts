import { HttpClient } from '@/api/common/HttpClient';
import type { PageRequest, Page } from '@/api/common/types';


export interface Category {
  id: string;
  name: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  name: string;
}

export interface UpdateCategoryDto {
  name: string;
}

export interface GetCategoriesParams extends PageRequest {
  name?: string;
}



class CategoriesClient extends HttpClient {
  endpoint = 'api/v1/categories';

  getAll(params?: GetCategoriesParams) {
    return this.client.get<Page<Category>>(this.endpoint, { params });
  }

  create(data: CreateCategoryDto) {
    return this.client.post<void>(this.endpoint, data);
  }

  update(id: string, data: UpdateCategoryDto) {
    return this.client.put<void>(`${this.endpoint}/${id}`, data);
  }

  remove(id: string) {
    return this.client.delete<void>(`${this.endpoint}/${id}`);
  }
}

const v1 = new CategoriesClient();
export default v1;
