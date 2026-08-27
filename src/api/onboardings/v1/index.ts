import { HttpClient } from '@/api/common/HttpClient';
import type { BaseValueObject, CountryVo } from '@/api/common/types';


export interface Onboarding {
  id: string;
  user: BaseValueObject;
  categories: BaseValueObject[];
  countries: CountryVo[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOnboardingDto {
  categoryIds: string[];
  cityIds: string[];
}

export type UpdateOnboardingDto = CreateOnboardingDto;



class OnboardingsClient extends HttpClient {
  endpoint = 'api/v1/onboardings';

  getByUser() {
    return this.client.get<Onboarding>(this.endpoint);
  }

  create(data: CreateOnboardingDto) {
    return this.client.post<Onboarding>(this.endpoint, data);
  }

  update(data: UpdateOnboardingDto) {
    return this.client.put<Onboarding>(this.endpoint, data);
  }
}

const v1 = new OnboardingsClient();
export default v1;
