import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

const userStore = (set) => ({
  user: {},
  setUser: (data) => set(() => ({ user: data })),
  resetUser: () => set(() => ({ user: {} })),
});

const useUserStore = create(
  devtools(
    persist(userStore, {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    })
  )
);

export default useUserStore;
