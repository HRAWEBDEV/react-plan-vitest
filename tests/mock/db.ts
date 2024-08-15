import { factory, manyOf, oneOf, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';

const db = factory({
 category: {
  id: primaryKey(faker.number.int),
  name: faker.commerce.department,
  products: manyOf('product'),
 },
 product: {
  id: primaryKey(faker.number.int),
  name: faker.commerce.productName,
  categoryId: faker.number.int,
  category: oneOf('category'),
 },
});

const getProductByCategory = (categoryId: number) =>
 db.product.findMany({
  where: {
   categoryId: { equals: categoryId },
  },
 });

export { factory, getProductByCategory };
