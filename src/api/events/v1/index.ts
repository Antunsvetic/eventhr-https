import { HttpClient } from '@/api/common/HttpClient';
import type { BaseValueObject, Coordinates, CountryVo, FileVo, PageRequest, Page } from '@/api/common/types';


export interface EventAddress {
  countryVo?: CountryVo;
  address: string;
  postalCode?: string;
  locationName?: string;
}

export interface EventAddressDto {
  cityId: string;
  address: string;
  postalCode?: string;
  locationName?: string;
}

export type EventFeature =
  | 'FREE_ENTRY'
  | 'PAID_ENTRY'
  | 'RESERVATION_REQUIRED'
  | 'INDOOR'
  | 'OUTDOOR'
  | 'FREE_PARKING_NEARBY'
  | 'PAID_PARKING_NEARBY'
  | 'NO_PARKING_AVAILABLE'
  | 'PUBLIC_TRANSPORT_NEARBY'
  | 'WHEELCHAIR_ACCESSIBLE'
  | 'ACCESSIBLE_RESTROOM'
  | 'FAMILY_FRIENDLY'
  | 'PET_FRIENDLY'
  | 'FOOD_AVAILABLE'
  | 'DRINKS_AVAILABLE'
  | 'VEGAN_VEGETARIAN_OPTIONS'
  | 'CARD_PAYMENT_AVAILABLE'
  | 'CASH_ONLY'
  | 'NON_SMOKING'
  | 'SMOKING_ALLOWED'
  | 'ADULTS_ONLY_18_PLUS'
  | 'CLOAKROOM_AVAILABLE'
  | 'BABY_CHANGING_FACILITY';

export interface SubEvent {
  id: string;
  name: string;
  description?: string;
  startAt: string;
  endAt: string;
  address: EventAddress;
  coordinates: Coordinates;
  price?: number;
  capacity?: number;
  images: FileVo[];
  features?: EventFeature[];
  attendeeCount?: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  startAt: string;
  endAt: string;
  address: EventAddress;
  coordinates: Coordinates;
  price?: number;
  capacity?: number;
  organizer: BaseValueObject;
  category: BaseValueObject;
  features?: EventFeature[];
  attendeeCount?: number;
  images?: FileVo[];
  parentEvent?: BaseValueObject;
  subEvents?: SubEvent[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventDto {
  name: string;
  description?: string;
  startAt: string;
  endAt: string;
  address: EventAddressDto;
  coordinates: Coordinates;
  price: number;
  capacity?: number;
  imageIds?: string[];
  features?: EventFeature[];
  categoryId: string;
  subOrganizerId?: string;
  parentEventId?: string;
}

export type UpdateEventDto = CreateEventDto;

export interface GetEventsParams extends PageRequest {
  name?: string;
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
}



class EventsClient extends HttpClient {
  endpoint = 'api/v1/events';

  getAll(params?: GetEventsParams) {
    return this.client.get<Page<Event>>(this.endpoint, { params });
  }

  getById(id: string) {
    return this.client.get<Event>(`${this.endpoint}/${id}`);
  }

  create(data: CreateEventDto) {
    return this.client.post<void>(this.endpoint, data);
  }

  update(id: string, data: UpdateEventDto) {
    return this.client.put<void>(`${this.endpoint}/${id}`, data);
  }

  remove(id: string) {
    return this.client.delete<void>(`${this.endpoint}/${id}`);
  }
}

const v1 = new EventsClient();
export default v1;
