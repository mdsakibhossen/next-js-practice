// import { createSlice } from '@reduxjs/toolkit'

// const initialState = { user: { username: "", email: "", password: "" }, editMode: false, editableUserId: "" }

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {

//         changeInput(state, action) {
//             // console.log("state:", state,"action:",action);
//             // const { type, payload } = action

//             state.user[action.payload.property] = action.payload.value

//         },
//         editUser(state,action){
//             state.editMode = true
//             state.editableUserId = action.payload._id
//             state.user = action.payload
//         },
//         resetForm() {
//             // state = initialState; // Not Possible
//             return initialState;
//         }
//     },
// })

// export const { changeInput,editUser,resetForm } = userSlice.actions
// export const userReducer = userSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        username: "",
        email: "",
        password: ""
    },
    editMode: false,
    editableUserId: ""
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeInput(state, action) {
            const { property, value } = action.payload;
            state.user[property] = value;
        },
        editUser(state, action) {
            const { _id, username, email, password } = action.payload;
            state.editMode = true;
            state.editableUserId = _id;
            state.user = { username, email, password };
        },
        resetForm() {
            return initialState;
        }
    },
});

export const { changeInput, editUser, resetForm } = userSlice.actions;
export const userReducer = userSlice.reducer;
