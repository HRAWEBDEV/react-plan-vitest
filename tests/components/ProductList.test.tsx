import {
 screen,
 render,
 waitForElementToBeRemoved,
} from '@testing-library/react';
import { server } from '../mock/server';
import { db } from '../mock/db';
import ProductList from '../../src/components/ProductList';
import AllProviders from '../AllProviders';
import { http, HttpResponse, delay } from 'msw';

describe('Products list', () => {
 const productsIds: number[] = [];
 beforeAll(() => {
  [1, 2, 3].forEach(() => {
   const product = db.product.create();
   productsIds.push(product.id);
  });
 });
 afterAll(() => {
  db.product.deleteMany({ where: { id: { in: productsIds } } });
 });

 it('should render the list of products', async () => {
  render(<ProductList />, { wrapper: AllProviders });

  const items = await screen.findAllByRole('listitem');
  expect(items.length).toBeGreaterThan(0);
 });

 it('should render no products available if no product is found', async () => {
  server.use(http.get('/products', () => HttpResponse.json([] as string[])));
  render(<ProductList />, { wrapper: AllProviders });
  const message = await screen.findByText(/no products/i);
  expect(message).toBeInTheDocument();
 });

 it('should render an error message when there is an error', async () => {
  server.use(http.get('/products', () => HttpResponse.error()));
  render(<ProductList />, { wrapper: AllProviders });
  expect(await screen.findByText(/error/i)).toBeInTheDocument();
 });

 it('should render a loading indicator when fetching data', async () => {
  server.use(
   http.get('/products', async () => {
    await delay();
    return HttpResponse.json([]);
   })
  );
  render(<ProductList />, { wrapper: AllProviders });
  expect(await screen.findByText(/loading/i)).toBeInTheDocument();
 });

 it('should remove the loading indicator after data is fetched', async () => {
  render(<ProductList />, { wrapper: AllProviders });
  await waitForElementToBeRemoved(await screen.findByText(/loading/i));
 });

 it('should remove the loading indicator if data fetching fails', async () => {
  server.use(http.get('/products', () => HttpResponse.error()));
  render(<ProductList />, { wrapper: AllProviders });
  await waitForElementToBeRemoved(await screen.findByText(/loading/i));
 });
});
