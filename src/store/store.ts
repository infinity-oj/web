import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearState {
  bears: number;
  increase: (by: number) => void;
  increasePopulation: () => void;
}

const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
        increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      }),
      {
        name: "bear-storage",
      },
    ),
  ),
);

export default useBearStore;
