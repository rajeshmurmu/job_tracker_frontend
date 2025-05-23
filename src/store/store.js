import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

const userStore = (set) => ({
  user: null,
  setUser: (data) => set(() => ({ user: data })),
  resetUser: () => set(() => ({ user: null })),
});

const useUserStore = create(
  devtools(
    persist(userStore, {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    })
  )
);

const applicationStore = (set) => ({
  applications: null,
  setApplication: (data) => set(() => ({ applications: data })),
  resetApplication: () => set(() => ({ applications: null })),
});

export const useApplicationStore = create(
  devtools(
    persist(applicationStore, {
      name: "applications",
      storage: createJSONStorage(() => localStorage),
    })
  )
);

export default useUserStore;
