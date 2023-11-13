import { createSlice } from '@reduxjs/toolkit'
import { kdTree } from 'kd-tree-javascript';

function distance(a, b) {
  return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
}

export var treePoints = new kdTree([], distance, ["x", "y"]);

const initialState = {
  items: [],
  lastId: 0,
  selectedId: null,
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
        rate: 'level7'
      }
      state.items.push(newRoad);
      state.lastId++;

      for (let point of newRoad.points) {
        treePoints.insert(point);
      }
    },
    deleteSelectedRoad: (state) => {
      const roadToDelete = state.items.findIndex((road) => road.id === state.selectedId);
      state.items.splice(roadToDelete, 1);
    },
    selectRoad: (state, action) => {
      state.selectedId = action.payload;
    },
    updateSelectedRoad: (state, action) => {
      const indexRoad = state.items.findIndex((road) => road.id === state.selectedId);
      state.items.splice(indexRoad, 1);
      state.items.push(action.payload);
    }
  },
})

export const { addRoad, deleteSelectedRoad, selectRoad, updateSelectedRoad } = roadsSlice.actions;

export default roadsSlice.reducer;