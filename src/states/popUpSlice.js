import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pop: false,
  type: "info",
  // color: "blue",
  message: "This is PopUp",
};

export const popUpSlice = createSlice({
  name: "popUp",
  initialState,
  reducers: {
    POP_NOW: (state, action) => {
      state.pop = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
      // if (action.payload.type)
      //   switch (action.payload.type) {
      //     case "info": {
      //       state.color = "blue";
      //       break;
      //     }
      //     case "success": {
      //       state.color = "green";
      //       break;
      //     }
      //     case "error": {
      //       state.color = "red";
      //       break;
      //     }
      //     case "warning": {
      //       state.color = "yellow";
      //       break;
      //     }
      //   }
    },
    HIDE_POP_UP: (state) => {
      state.pop = false;
    },
  },
});

export const { POP_NOW, HIDE_POP_UP } = popUpSlice.actions;
export default popUpSlice.reducer;
