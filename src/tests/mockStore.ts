import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router';
import { useFileStore } from '../store'; // путь к zustand store
import { History } from '../pages';
import { type HistoryType } from '../store';

export const createMockStore = (history: HistoryType[] = [], overrides = {}) => {
  useFileStore.setState({
    history,
    deleteHistoryRow: vi.fn(),
    clearHistory: vi.fn(),
    statsHistory: null,
    ...overrides,
  });
};

afterEach(() => {
  useFileStore.setState({
    history: [],
    statsHistory: null,
  });
});
