import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../../src/app/scripts/app';

test('renders span element with "App,tsx" text', () => {
  render(<App />);
  const spanElement = screen.getByText(/App.tsx/i);
  expect(spanElement).toBeInTheDocument();
});
