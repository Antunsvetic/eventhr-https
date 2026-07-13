import v1 from './v1';

export type {
  Event,
  EventAddress,
  EventCoordinates,
  EventOrganizer,
  CreateEventDto,
  UpdateEventDto,
  GetEventsParams,
} from './v1';

export const Events = { v1 };
export default Events;
