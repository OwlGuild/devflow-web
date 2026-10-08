import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LiveStatus } from './LiveStatus';

const API_URL = 'https://api.example.test';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('LiveStatus', () => {
  it('reports the API as live when the readiness probe answers ok', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'ok', database: 'up' }),
    } as Response);

    render(<LiveStatus apiUrl={API_URL} />);

    expect(await screen.findByTestId('live-status')).toHaveAttribute(
      'data-state',
      'ok',
    );
    expect(global.fetch).toHaveBeenCalledWith(
      `${API_URL}/health/ready/`,
      expect.anything(),
    );
  });

  it('normalises a trailing slash so the probe never doubles it', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'ok', database: 'up' }),
    } as Response);

    render(<LiveStatus apiUrl={`${API_URL}/`} />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(global.fetch).toHaveBeenCalledWith(
      `${API_URL}/health/ready/`,
      expect.anything(),
    );
  });

  it('reports the API as down when the probe fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('network down'));

    render(<LiveStatus apiUrl={API_URL} />);

    await waitFor(() =>
      expect(screen.getByTestId('live-status')).toHaveAttribute(
        'data-state',
        'down',
      ),
    );
  });

  it('reports the API as down when the probe answers with an error status', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({ detail: 'database unreachable' }),
    } as Response);

    render(<LiveStatus apiUrl={API_URL} />);

    await waitFor(() =>
      expect(screen.getByTestId('live-status')).toHaveAttribute(
        'data-state',
        'down',
      ),
    );
  });

  it('skips the probe and says so when no API base URL is configured', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');

    render(<LiveStatus apiUrl='' />);

    expect(screen.getByTestId('live-status')).toHaveAttribute(
      'data-state',
      'unconfigured',
    );
    expect(screen.getByText('API status not configured')).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
