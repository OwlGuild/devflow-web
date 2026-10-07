import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BoardPreview } from './BoardPreview';

describe('BoardPreview', () => {
  it('renders the three planned columns', () => {
    render(<BoardPreview />);
    for (const title of ['Backlog', 'In progress', 'Shipped']) {
      expect(
        screen.getByRole('heading', { level: 3, name: title }),
      ).toBeInTheDocument();
    }
  });

  it('pairs each column with its own status pill', () => {
    render(<BoardPreview />);
    const badges = screen.getAllByTestId('status-badge');
    expect(badges.map((badge) => badge.textContent)).toEqual([
      'To do',
      'In progress',
      'Done',
    ]);
  });

  it('shows the tasks under the column they belong to', () => {
    render(<BoardPreview />);
    const shipped = screen
      .getByRole('heading', { name: 'Shipped' })
      .closest('section') as HTMLElement;
    const tasks = within(shipped).getAllByRole('listitem');
    expect(tasks.map((task) => task.textContent)).toEqual([
      'Health and readiness endpoints',
      'CI, Docker builds, smoke checks',
    ]);
  });
});
