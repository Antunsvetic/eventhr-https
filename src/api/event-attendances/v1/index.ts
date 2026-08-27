import { HttpClient } from '@/api/common/HttpClient';
import type { PageRequest, Page, BaseValueObject } from '@/api/common/types';


export interface EventAttendance {
  id: string;
  user: BaseValueObject;
  event: BaseValueObject;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventAttendanceDto {
  eventId: string;
}

export interface GetEventAttendancesParams extends PageRequest {
  'event-id'?: string;
}



class EventAttendancesClient extends HttpClient {
  endpoint = 'api/v1/event-attendances';

  getAll(params?: GetEventAttendancesParams) {
    return this.client.get<Page<EventAttendance>>(this.endpoint, { params });
  }

  create(data: CreateEventAttendanceDto) {
    return this.client.post<void>(this.endpoint, data);
  }

  remove(id: string) {
    return this.client.delete<void>(`${this.endpoint}/${id}`);
  }
}

const v1 = new EventAttendancesClient();
export default v1;
