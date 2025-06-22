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
  history: HistoryType[];
  loaded: boolean;
  file: File | null;
  isLoadingAnalytics: boolean,
  statsHistory: {
    total_spend_galactic: number;
    rows_affected: number;
    average_spend_galactic: number;
    less_spent_at: number;
    big_spent_at: number;
    less_spent_value: number;
    big_spent_value: number;
    big_spent_civ: string;
    less_spent_civ: string;
  } | null;
  changeFile: (file: File) => void;
  clearFile: () => void;
  sendFile: (options: { rows: number }) => Promise<void>;
  generateFileLink: (options: GenerateFileOptions) => string;
  deleteHistoryRow: (id: number) => void;
  clearHistory: () => void;
};

const HISTORY_KEY = "history";

export const useFileStore = create<FileStore>((set, get) => {
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
    loaded: false,
    history: storedHistory,
    file: null,
    isLoadingAnalytics: false,
    statsHistory: null,
    fileMetrics: {},
    changeFile: (file) => {
      set({ loaded: true, file });
    },
    clearFile: () => {
      set({ loaded: false, file: null });
    },
    sendFile: async ({ rows }) => {
      const { file } = get();
      if (!file) {
        console.error("No file to send");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);

      set({ isLoadingAnalytics: true });

      let isSuccessfull = false;

      try {
        const response = await fetch(`http://localhost:3000/aggregate?rows=${rows}`, {
          method: "POST",
          body: formData
        });
        if (!response.ok) {
          console.error("Server error:", response.status);
          return;
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            let lines = buffer.split("\n");
            buffer = lines.pop()!;

            for (const line of lines) {
              if (!line.trim()) continue;

              try {
                const parsed = JSON.parse(line);
                console.log(parsed);
                set({ statsHistory: parsed });

              } catch (e) {
                console.warn("Skipping:", line);
              }
            }
          }

          if (buffer.trim()) {
            try {
              const final = JSON.parse(buffer);
              set({ statsHistory: final });
            } catch (e) {
              console.warn("Trying final line:", buffer);
            }
          }
        }
        isSuccessfull = true;
      }
      catch (e) {
        console.error(e);
      }
      finally {
        set({ isLoadingAnalytics: false });
        set((state) => {
          const newItem = {
            id: Date.now(),
            name: file.name,
            date: new Date(),
            isSuccessfull
          };
          const updatedHistory = [...state.history, newItem];
          try {
            window.localStorage.setItem("history", JSON.stringify(updatedHistory));
          } catch (e) {
            console.error("Error writing to localStorage", e);
          }
          return { history: updatedHistory };
        });
        set({ loaded: false, file: null });
      }
    },
    generateFileLink: ({ size, withErrors = "off", maxSpend = 1000 }) => {
      return `http://localhost:3000/report?size=${size}&withErrors=${withErrors}&maxSpend=${maxSpend}`;
    },
    addHistoryRow: (newItem: HistoryType) => {
      set((state) => {
        const updatedHistory = [...state.history, newItem];
        try {
          window.localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
        } catch (e) {
          console.error("Error writing to localStorage", e);
        }
        return { history: updatedHistory };
      });
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
    clearHistory: () => {
      set(() => {
        try {
          window.localStorage.removeItem(HISTORY_KEY);
        } catch (e) {
          console.log("Error saving to local storage: ", e);
        }
        return {
          history: []
        }
      });
    }
  };
});
