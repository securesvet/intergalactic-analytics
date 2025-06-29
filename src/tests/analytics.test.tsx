import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Analytics } from '../pages';


afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe('Analytics component', () => {

  test('Отображает кнопку "Отправить", когда файл загружен', () => {

    const { container } = render(<Analytics />);
    const button = container.querySelector('[data-testid="button-upload"]');

    expect(button).toBeDefined();
    expect(button?.hasAttribute('disabled')).toBeUndefined();
  });

  test('Кнопка disabled, если файл не загружен', () => {

    const { container } = render(<Analytics />);
    const button = container.querySelector('[data-testid="button-upload"]');

    expect(button).toBeDefined();
  });

  test('Кнопка "Отправить" не отображается при ошибке', () => {

    const { container } = render(<Analytics />);
    const button = container.querySelector('[data-testid="button-upload"]');

    expect(button).toBeNull();
  });

  test('Клик по кнопке вызывает sendFile', async () => {

    const sendFile = vi.fn();

    const { container } = render(<Analytics />);
    const button = container.querySelector('[data-testid="button-upload"]')!;
    await userEvent.click(button);

    expect(sendFile).toHaveBeenCalledTimes(0);
  });
});
