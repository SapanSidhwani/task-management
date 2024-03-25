import Cookies from 'js-cookie';
import { create } from 'zustand';

const useToken = create((set) => ({
    token: Cookies.get('PHPSESSID'),
    setToken: (token) => set({ token }),
}));

export default useToken