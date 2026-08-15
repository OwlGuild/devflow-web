import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusBadge, type Status } from './StatusBadge';

const CASES: Array<[Status, string]> = [
  ['todo', 'To do'],
  ['in_progress', 'In progress'],
  ['done', 'Done'],
];

describe('StatusBadge', () => {
  it.each(CASES)('renders the %s label', (status, label) => {
    render(<StatusBadge status={status} />);
    expect(screen.getByTestId('status-badge')).toHaveTextContent(label);
  });

  it('applies a distinct class per status', () => {
    const { rerender } = render(<StatusBadge status='todo' />);
    const todoClass = screen.getByTestId('status-badge').className;
    rerender(<StatusBadge status='done' />);
    const doneClass = screen.getByTestId('status-badge').className;
    expect(todoClass).not.toBe(doneClass);
  });
});
