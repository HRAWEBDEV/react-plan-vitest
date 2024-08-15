import { render, screen } from '@testing-library/react';
import ToastDemo from '../../src/components/ToastDemo';
import { Toaster } from 'react-hot-toast';
import user from '@testing-library/user-event';

describe('ToastDemo', () => {
 it('should render a toast', async () => {
  render(
   <>
    <ToastDemo />
    <Toaster />
   </>
  );

  const button = screen.getByRole('button');
  await user.click(button);
  const toast = await screen.findByText(/success/i);
  expect(toast).toBeInTheDocument();
 });
});
