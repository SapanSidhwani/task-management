import { create } from 'zustand';

const useSelectedUser = create((set) => ({
    selectedUser: {},
    setSelectedUser: (user) => set({ selectedUser: user }),
}));

export default useSelectedUser;