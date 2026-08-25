import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LiveStatus } from './LiveStatus';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('LiveStatus', () => {
  it('reports the API as live when the readiness probe answers ok', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.example.test');
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'ok', database: 'up' }),
    } as Response);

    render(<LiveStatus />);

    expect(await screen.findByTestId('live-status')).toHaveAttribute(
      'data-state',
      'ok',
    );
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.test/health/ready/',
    );
  });

  it('reports the API as down when the probe fails', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.example.test');
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('network down'));

    render(<LiveStatus />);

    await waitFor(() =>
      expect(screen.getByTestId('live-status')).toHaveAttribute(
        'data-state',
        'down',
      ),
    );
  });

  it('reports the API as down when the probe answers with an error status', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.example.test');
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({ detail: 'database unreachable' }),
    } as Response);

    render(<LiveStatus />);

    await waitFor(() =>
      expect(screen.getByTestId('live-status')).toHaveAttribute(
        'data-state',
        'down',
      ),
    );
  });

  it('skips the probe when no API base URL is configured', async () => {
    vi.spyOn(global, 'fetch');

    render(<LiveStatus />);

    await waitFor(() =>
      expect(screen.getByTestId('live-status')).toHaveAttribute(
        'data-state',
        'down',
      ),
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
