import { create } from 'zustand';

const useMobileView = create((set) => ({
  isMobileView: false,
  setMobileView: (value) => set({ isMobileView: value }),
}));

export default useMobileView;
