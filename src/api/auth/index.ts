import v1 from './v1';

export type { AuthTokenResponse, LoginDto, RefreshTokenDto, SocialProvider, SocialAuthDto, SocialAuthResponse } from './v1';

export const Auth = { v1 };
export default Auth;
