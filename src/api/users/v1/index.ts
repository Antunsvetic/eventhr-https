import { HttpClient } from '@/api/common/HttpClient';
import type { PageRequest, Page } from '@/api/common/types';


export type UserRole = 'ADMIN' | 'CUSTOMER' | 'PRIVATE_ORGANIZER' | 'PUBLIC_ORGANIZER' | 'SUB_ORGANIZER';

export interface User {
  id: string;
  name: string;
  username: string;
  imageId?: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  onboarded: boolean;
}

export interface CreateUserDto {
  name: string;
  username: string;
  password: string;
}

export interface CreateOrganizerUserDto {
  name: string;
  username: string;
  password: string;
  userRole: UserRole;
}

export interface EditUserDto {
  name: string;
  username: string;
  password?: string;
  imageId?: string;
}



class UsersClient extends HttpClient {
  endpoint = 'api/v1/users';

  getAll(params?: PageRequest) {
    return this.client.get<Page<User>>(this.endpoint, { params });
  }

  getProfile() {
    return this.client.get<User>(`${this.endpoint}/profile`);
  }

  create(data: CreateUserDto) {
    return this.client.post<void>(this.endpoint, data);
  }

  createOrganizer(data: CreateOrganizerUserDto) {
    return this.client.post<void>(`${this.endpoint}/organizer`, data);
  }

  createSubOrganizer(data: CreateUserDto) {
    return this.client.post<void>(`${this.endpoint}/sub-organizer`, data);
  }

  verify(userId: string) {
    return this.client.patch<void>(`${this.endpoint}/${userId}/verify`);
  }

  edit(id: string, data: EditUserDto) {
    return this.client.put<void>(`${this.endpoint}/${id}`, data);
  }
}

const v1 = new UsersClient();
export default v1;
