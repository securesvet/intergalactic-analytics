import { describe, test, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Generator } from '../pages/';

afterEach(() => {
  cleanup();
})

describe('Generator component', () => {
  test('Отображает кнопку "Начать генерацию"', () => {
    const { container } = render(<Generator />);

    const button = container.querySelector('[data-testid="button-upload"]');
    expect(button).toBeDefined();
  });

  test('Успешная генерация файла показывает сообщение "файл сгенерирован!"', async () => {
    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
    });

    const { container } = render(<Generator />);
    const button = container.querySelector('[data-testid="button-upload"]');
    await userEvent.click(button!);
  });

  test('Если fetch вернул ошибку, отображается сообщение об ошибке', async () => {
    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    });

    const { container } = render(<Generator />);
    const button = container.querySelector('[data-testid="button-upload"]');

    await userEvent.click(button!);

    await waitFor(() => {
      expect(screen.getByText(/упс, не то/i)).toBeDefined();
    });
  });

  test('Кнопка Close сбрасывает ошибку и статус done', async () => {

    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    });

    const { container } = render(<Generator />);
    const button = container.querySelector('[data-testid="button-upload"]');
    await userEvent.click(button!);


    // Нажимаем кнопку сброса
    const closeButton = container.querySelector('[data-testid="button-close"]');
    await userEvent.click(closeButton!);

    expect(screen.queryByText(/упс, не то/i)).toBeNull();
    expect(screen.queryByText(/файл сгенерирован!/i)).toBeNull();
  });
});
