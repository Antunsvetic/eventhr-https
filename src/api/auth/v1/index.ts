import { HttpClient } from '@/api/common/HttpClient';


export interface AuthTokenResponse {
  authenticationToken: string;
  refreshToken: string;
}

export interface LoginDto {
  username: string;
  password: string;
  notificationToken?: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}



class AuthClient extends HttpClient {
  endpoint = 'api/v1/authentication/user';

  login(data: LoginDto) {
    return this.client.post<AuthTokenResponse>(this.endpoint, data);
  }

  refresh(data: RefreshTokenDto) {
    return this.client.post<AuthTokenResponse>(`${this.endpoint}/refresh`, data);
  }
}

const v1 = new AuthClient();
export default v1;
