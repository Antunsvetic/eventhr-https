import { HttpClient } from '@/api/common/HttpClient';
import type { PageRequest, Page } from '@/api/common/types';


export interface EventAddress {
  city: string;
  address: string;
  postalCode?: string;
  locationName?: string;
}

export interface EventCoordinates {
  latitude: number;
  longitude: number;
}

export interface EventOrganizer {
  id: string;
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  startAt: string;
  endAt: string;
  address: EventAddress;
  coordinates: EventCoordinates;
  price?: number;
  capacity?: number;
  organizer: EventOrganizer;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventDto {
  name: string;
  description?: string;
  startAt: string;
  endAt: string;
  address: EventAddress;
  coordinates: EventCoordinates;
  price?: number;
  capacity?: number;
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
