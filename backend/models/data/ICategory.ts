export default interface ICategory {
  categoryType: string;
  categoryName: string | null;
  categoryDescription: string | null;
  categoryImage?: File | string;
}
