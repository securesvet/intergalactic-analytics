import { test, describe, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import events from "@testing-library/user-event";
import { valueToDescription } from '../utils';

describe("Преобразование ключа статистики в описание статистики", () => {
  test("Преобразование поля total_spend_galactic в \"общие расходы в галактических кредитах\"", () => {
    const result = valueToDescription['total_spend_galactic']

    expect(result).toBe("общие расходы в галактических кредитах")

  })
})
