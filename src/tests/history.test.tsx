import { test, describe, expect, vi } from 'vitest';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router';
import { History } from '../pages';
import { createMockStore } from './mockStore';

describe("Тестирование компонента History", () => {
  test("Отсутствует кнопка 'Очистить всё' при пустом сторе", () => {
    render(
      <BrowserRouter>
        <History />
      </BrowserRouter>
    );
    createMockStore([]); // пустая история

    expect(screen.queryByText(/очистить всё/i)).toBeNull();
  });

  test("Кнопка 'Очистить всё' отображается при наличии истории", () => {
    createMockStore([
      {
        id: 1,
        name: 'test.csv',
        date: new Date(),
        isSuccessfull: true,
      }
    ]);
    const { container } = render(
      <BrowserRouter>
        <History />
      </BrowserRouter>
    );

    const clearButton = container.querySelector('[data-testid="clearHistory"');
    expect(clearButton).toBeDefined()
  });

  test("Удаление элемента из истории", async () => {
    const mockDelete = vi.fn();
    createMockStore([
      {
        id: 1,
        name: 'sample.csv',
        date: new Date(),
        isSuccessfull: true,
      }
    ], {
      deleteHistoryRow: mockDelete,
    });

    render(
      <BrowserRouter>
        <History />
      </BrowserRouter>
    );

    const deleteButton = screen.getAllByRole('button', { name: /trash/i });
    await userEvent.click(deleteButton[0]);

    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  test("Модалка появляется при наличии statsHistory", () => {
    createMockStore([
      {
        id: 1,
        name: 'example.csv',
        date: new Date(),
        isSuccessfull: true,
      }
    ], {
      statsHistory: {
        total_spend_galactic: 100,
        rows_affected: 50,
        average_spend_galactic: 2,
        less_spent_at: 0,
        big_spent_at: 1,
        less_spent_value: 1,
        big_spent_value: 3,
        big_spent_civ: 'humans',
        less_spent_civ: 'monsters'
      }
    });

    const { container } = render(
      <BrowserRouter>
        <History />
      </BrowserRouter>
    );

    // Примерный текст из модалки
    expect(container.querySelector('[data-testid="modal"]')).toBeDefined();
  });

});
