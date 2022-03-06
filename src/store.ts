import create from "zustand";

const useStore = create<{ data: number[] }>(() => ({
  data: new Array(121).fill(0)
}));

export default useStore;
