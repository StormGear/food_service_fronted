import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const initialAuthState = {
    isAuthenticated: false,
    user: null,
  }

  const authStateReducer = (state, action) => {
    switch (action.type) {
        case 'signup':
            return { ...state, user: action.value }
        case 'login':
            return { ...state, user: action.value }
        case 'logout':
            return { ...state, user: null }
        default:
            return state
    }
  }

export const AuthProvider = ({ children }) => {
    const [authState, dispatchAuthState] = useReducer(authStateReducer, initialAuthState)
  
    const login = (user) => {
     dispatchAuthState({ type: 'login', value: user })
    };
  
    const logout = () => {
        dispatchAuthState({ type: 'logout' })
    };

    const signup = (user) => {
        dispatchAuthState({ type: 'signup', value: user })
    }
  
    return (
      <AuthContext.Provider value={{ authState, login, logout, signup }}>
        {children}
      </AuthContext.Provider>
    );
  };