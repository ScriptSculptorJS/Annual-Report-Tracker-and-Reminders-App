import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  businessName: string
  entities: []
}

export const useInfoStore = create<User>() (persist((set) => ({
  businessName: '',
  updateBusinessName: (newBusinessName: string) => {
    set({ businessName: newBusinessName})
  },
  entities: [],
  updateEntities: (newEntitiesArray: []) => {
    set({ entities: newEntitiesArray})
  },
  storage: createJSONStorage(() => sessionStorage)
})))