import v1 from './v1';

export type {
  Collection,
  CreateCollectionDto,
  UpdateCollectionDto,
  GetCollectionsParams,
} from './v1';

export const Collections = { v1 };
export default Collections;
