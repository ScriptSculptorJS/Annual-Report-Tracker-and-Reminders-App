import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  businessName: string
  entities: []
}

export const useInfoStore = create<User>() (persist((set, get) => ({
  businessName: '',
  entities: [],
  updateEntities: (newEntitiesArray: []) => {
    set({ entities: newEntitiesArray})
  },
  storage: createJSONStorage(() => sessionStorage)
})))