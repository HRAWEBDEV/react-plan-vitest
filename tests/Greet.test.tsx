import { render, screen } from '@testing-library/react';
import Greet from '../src/components/Greet';

describe('Greet', () => {
 it('should render hello when the name is provided', () => {
  const name = 'hamid reza';
  render(<Greet name={name} />);
  const heading = screen.getByRole('heading');
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent(name);
 });

 it('should render login button when name is not provided', () => {
  render(<Greet />);
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent(/login/i);
 });
});
