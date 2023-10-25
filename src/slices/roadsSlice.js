import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  lastId: 0
}

export const roadsSlice = createSlice({
  name: 'roads',
  initialState,
  reducers: {
    addRoad: (state, action) => {
      const newRoad = {
        id: state.lastId, 
        name: `#${state.lastId} road`,
        points: action.payload,
      }
      state.items.push(newRoad);
      state.lastId++;
    },
    deleteRoad: (state, action) => {
      // const roadToDelete = state.items.find((road) => road.id === action.payload);
      state.items.splice(action.payload, 1);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addRoad, deleteRoad } = roadsSlice.actions;

export default roadsSlice.reducer;