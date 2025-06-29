import { test, describe, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router';
import { Header } from '../components';
import { History } from '../pages';

describe("Тестирование навигации приложения", () => {
  test("Если нажать на кнопки в Header, то будет навигация", async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const generatorLink = screen.getByTestId("generator");

    await userEvent.click(generatorLink);

    // Проверяем, что перешли на страницу генерации
    expect(window.location.pathname).toBe("/generator");

    const history = screen.getByTestId("history");
    await userEvent.click(history);

    // Проверяем, что перешли на вкладку history
    expect(window.location.pathname).toBe("/history");

    const analyticsLink = screen.getByTestId("analytics");
    await userEvent.click(analyticsLink);

    // Проверяем, что вернулись на главную страницу
    expect(window.location.pathname).toBe("/");
  });

  test("На странице history при нажатии на кнопкnу Сгенерировать Ещё должна перенаправлять на /generate", async () => {

    render(
      <BrowserRouter>
        <History />
      </BrowserRouter>
    );

    const button = screen.getByTestId("generate-more");
    await userEvent.click(button);

    // Проверяем, что перешли на страницу генерации
    expect(window.location.pathname).toBe("/generator");

  })
});
