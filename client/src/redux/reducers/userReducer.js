import {createAction,createReducer} from '@reduxjs/toolkit'


export const loginRequest=createAction('loginRequest')
export const loginSuccess=createAction('loginSuccess')
export const loginFail=createAction('loginFail')

export const registerRequest=createAction('registerRequest')
export const registerSuccess=createAction('registerSuccess')
export const registerFail=createAction('registerFail')

export const clearError=createAction('clearError')
export const clearMessage=createAction('clearMessage')

const initialState={
    loading:false,
    isAuthenticated:false,
    user:null,
    message:'',
    error:null,
}

export const userReducer=createReducer(initialState,(builder)=>{
    builder
    .addCase(loginRequest,(state)=>{
        state.loading=true;
    })
    .addCase(loginSuccess,(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.user=action.payload.user;
        state.message=action.payload.message;
    })
    .addCase(loginFail,(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.error=action.payload;
    })


    .addCase(registerRequest,(state)=>{
        state.loading=true;
    })
    .addCase(registerSuccess,(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.user=action.payload.user;
        state.message=action.payload.message;
    })
    .addCase(registerFail,(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.error=action.payload
    })

    .addMatcher(
        (action)=>action.type===clearError.type,state=>{
        state.error=null;
    })
    .addMatcher(
        (action)=>action.type===clearMessage.type,state=>{
        state.message=null
    })
})