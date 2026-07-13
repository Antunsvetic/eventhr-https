import v1 from './v1';

export type {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  GetCategoriesParams,
} from './v1';

export const Categories = { v1 };
export default Categories;
