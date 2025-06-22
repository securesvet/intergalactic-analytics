import { create } from "zustand";

type GenerateFileOptions = {
  size: number;
  withErrors?: string;
  maxSpend?: string;
};

type HistoryType = {
  id: number;
  name: string;
  date: Date;
  isSuccessfull: boolean;
};

type FileStore = {
  name: string;
  history: HistoryType[];
  loaded: boolean;
  changeFile: (file: File) => void;
  clearFile: () => void;
  sendFile: (data: any) => Promise<void>;
  generateFile: (options: GenerateFileOptions) => Promise<Response>;
  deleteHistoryRow: (id: number) => void;
};

const HISTORY_KEY = "history";

export const useFileStore = create<FileStore>((set) => {
  const storedHistory = (() => {
    try {
      const raw = window.localStorage.getItem(HISTORY_KEY);
      return raw ? (JSON.parse(raw) as HistoryType[]) : [];
    } catch (e) {
      console.error("Failed to load history from localStorage", e);
      return [];
    }
  })();

  return {
    name: "",
    loaded: false,
    history: storedHistory,
    changeFile: (file) => {
      set({ name: file.name, loaded: true });
    },
    clearFile: () => {
      set({ name: "", loaded: false });
    },
    sendFile: async (_data) => {
      await fetch("http://localhost:3000/aggregate", {
        method: "POST",
      });
    },
    generateFile: async ({ size, withErrors = "off", maxSpend = 1000 }) => {
      return await fetch(
        `http://localhost:3000/report?size=${size}&withErrors=${withErrors}&maxSpend=${maxSpend}`,
        { method: "GET" },
      );
    },
    deleteHistoryRow: (idToDelete) => {
      console.log("DELETE HISTORY ROW");
      set((state) => {
        const updatedHistory = state.history.filter(
          ({ id }) => id !== idToDelete,
        );
        try {
          window.localStorage.setItem(
            HISTORY_KEY,
            JSON.stringify(updatedHistory),
          );
        } catch (e) {
          console.log("Error saving to local storage: ", e);
        }
        return { history: updatedHistory };
      });
    },
  };
});
