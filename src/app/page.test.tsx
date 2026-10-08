import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Home from './page';

describe('Home', () => {
  it('renders the product heading and tagline', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'DevFlow' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/task management built in public/i),
    ).toBeInTheDocument();
  });

  it('links to the repository and the configured live API', () => {
    process.env.DEVFLOW_API_URL = 'https://devflow-api-jtmi.onrender.com';
    try {
      render(<Home />);
      expect(
        screen.getByRole('link', { name: 'View the source' }),
      ).toHaveAttribute('href', 'https://github.com/OwlGuild');
      expect(
        screen.getByRole('link', { name: 'Open the API' }),
      ).toHaveAttribute(
        'href',
        'https://devflow-api-jtmi.onrender.com/health/ready/',
      );
    } finally {
      delete process.env.DEVFLOW_API_URL;
    }
  });

  it('passes the configured API URL into the readiness probe', async () => {
    process.env.DEVFLOW_API_URL = 'https://api.example.test';
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'ok', database: 'up' }),
    } as Response);
    try {
      render(<Home />);
      expect(await screen.findByTestId('live-status')).toHaveAttribute(
        'data-state',
        'ok',
      );
      expect(fetchSpy).toHaveBeenCalledWith(
        'https://api.example.test/health/ready/',
        expect.anything(),
      );
    } finally {
      delete process.env.DEVFLOW_API_URL;
      vi.restoreAllMocks();
    }
  });

  it('lists the four shipped building blocks', () => {
    render(<Home />);
    for (const title of ['REST API', 'Realtime layer', 'Vector search', 'Quality gates']) {
      expect(
        screen.getByRole('heading', { level: 3, name: title }),
      ).toBeInTheDocument();
    }
  });

  it('shows the live status probe', () => {
    render(<Home />);
    expect(screen.getByTestId('live-status')).toBeInTheDocument();
  });

  it('renders the board preview with all three status pills', () => {
    render(<Home />);
    expect(screen.getByTestId('board-preview')).toBeInTheDocument();
    const badges = screen.getAllByTestId('status-badge');
    expect(badges).toHaveLength(3);
    expect(badges.map((b) => b.textContent)).toEqual([
      'To do',
      'In progress',
      'Done',
    ]);
  });

  it('shows the run instructions', () => {
    render(<Home />);
    expect(screen.getByText(/npm run dev/)).toBeInTheDocument();
    expect(screen.getByText(/npm test/)).toBeInTheDocument();
  });
});
