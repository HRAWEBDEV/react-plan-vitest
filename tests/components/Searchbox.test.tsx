import { render, screen } from '@testing-library/react';
import SearchBox from '../../src/components/SearchBox';
import user from '@testing-library/user-event';

describe('SearchBox', () => {
 const renderComponent = () => {
  const onChange = vi.fn();
  render(<SearchBox onChange={onChange} />);

  return {
   onChange,
   input: screen.getByRole('textbox'),
  };
 };

 it('should render an input field for searching', () => {
  const { input } = renderComponent();
  expect(input).toBeInTheDocument();
 });

 it('should call onChange when enter is pressed', async () => {
  const { input, onChange } = renderComponent();
  const searchTerm = 'search term';
  await user.type(input, searchTerm + '{enter}');

  expect(onChange).toHaveBeenCalledWith(searchTerm);
 });

 it('should not call onChange if input field is empty', async () => {
  const { onChange, input } = renderComponent();

  await user.type(input, '{enter}');
  expect(onChange).not.toHaveBeenCalled();
 });
});
