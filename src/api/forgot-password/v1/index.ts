import { HttpClient } from '@/api/common/HttpClient';


export interface ForgotPasswordCreateDto {
  email: string;
}

export interface ChangeForgotPasswordDto {
  password: string;
}



class ForgotPasswordClient extends HttpClient {
  endpoint = 'api/v1/forgot-password';

  create(data: ForgotPasswordCreateDto) {
    return this.client.post<void>(this.endpoint, data);
  }

  changePassword(id: string, data: ChangeForgotPasswordDto) {
    return this.client.patch<void>(`${this.endpoint}/${id}/change`, data);
  }
}

const v1 = new ForgotPasswordClient();
export default v1;
