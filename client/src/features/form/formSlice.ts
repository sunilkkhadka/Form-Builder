import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ItemPayload = {
  id: string;
  text: string;
  draftText: string;
  isDropped: boolean;
};

interface FormState {
  items: ItemPayload[];
  selectedItemId: string | null;
}

const initialState: FormState = {
  items: [],
  selectedItemId: null,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ItemPayload>) => {
      state.items.push({
        id: action.payload.id,
        text: action.payload.text,
        draftText: action.payload.text,
        isDropped: action.payload.isDropped,
      });
      state.selectedItemId = action.payload.id;
    },
    selectItem: (state, action: PayloadAction<{ id: string }>) => {
      state.selectedItemId = action.payload.id;
    },
    updateText: (
      state,
      action: PayloadAction<{ id: string; draftText: string }>
    ) => {
      const { id, draftText } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.draftText = draftText;
      }
    },
    saveText: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      if (id === state.selectedItemId) {
        state.selectedItemId = null;
        const existingItem = state.items.find((item) => item.id === id);
        if (existingItem) {
          existingItem.text = existingItem.draftText;
        }
      }
    },
    removeField: (state, action: PayloadAction<{ id: string }>) => {
      const currentItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (currentItem) {
        const filteredItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.items = filteredItems;
      }
    },
    cancelEdit: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      if (id === state.selectedItemId) {
        state.selectedItemId = null;
        const existingItem = state.items.find((item) => item.id === id);
        if (existingItem) {
          existingItem.draftText = existingItem.text;
        }
      }
    },
  },
});

export const {
  add,
  updateText,
  removeField,
  selectItem,
  saveText,
  cancelEdit,
} = formSlice.actions;

export default formSlice.reducer;
