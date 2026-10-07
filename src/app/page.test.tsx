import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './page';

describe('Home', () => {
  it('renders the product heading', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'DevFlow Web' }),
    ).toBeInTheDocument();
  });

  it('shows the default board status', () => {
    render(<Home />);
    expect(screen.getByTestId('status-badge')).toHaveTextContent('To do');
  });
});
