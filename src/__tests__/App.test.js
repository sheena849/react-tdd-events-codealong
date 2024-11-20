import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Important for interacting with elements
import App from '../App';

test('pizza checkbox is initially unchecked', () => {
  render(<App />);
  
  const addPepperoni = screen.getByRole('checkbox', { name: /add pepperoni/i });
  
  expect(addPepperoni).not.toBeChecked(); // This should pass if checkbox is initially unchecked
});

test('toppings list initially contains only cheese', () => {
  render(<App />);

  expect(screen.getAllByRole('listitem').length).toBe(1);
  expect(screen.getByText('Cheese')).toBeInTheDocument();
  expect(screen.queryByText('Pepperoni')).not.toBeInTheDocument();
});

test('checkbox appears as checked when user clicks it', () => {
  render(<App />);
  
  const addPepperoni = screen.getByRole('checkbox', { name: /add pepperoni/i });
  
  userEvent.click(addPepperoni);  // Simulate a user click on the checkbox
  expect(addPepperoni).toBeChecked();  // Expect it to be checked after the click
});

test('topping appears in toppings list when checked', () => {
  render(<App />);
  
  const addPepperoni = screen.getByRole('checkbox', { name: /add pepperoni/i });
  
  userEvent.click(addPepperoni);  // Add pepperoni topping
  
  expect(screen.getAllByRole('listitem').length).toBe(2);  // Expect two items in the list now
  expect(screen.getByText('Cheese')).toBeInTheDocument();
  expect(screen.getByText('Pepperoni')).toBeInTheDocument();
});

test('selected topping disappears when checked a second time', () => {
  render(<App />);
  
  const addPepperoni = screen.getByRole('checkbox', { name: /add pepperoni/i });
  
  userEvent.click(addPepperoni);  // First click: add pepperoni
  expect(addPepperoni).toBeChecked();
  expect(screen.getByText('Cheese')).toBeInTheDocument();
  expect(screen.getByText('Pepperoni')).toBeInTheDocument();

  userEvent.click(addPepperoni);  // Second click: remove pepperoni
  expect(addPepperoni).not.toBeChecked();
  expect(screen.getByText('Cheese')).toBeInTheDocument();
  expect(screen.queryByText('Pepperoni')).not.toBeInTheDocument();
});
