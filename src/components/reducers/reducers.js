
export const initialAuthState = {
    isAuthenticated: false,
    user: null,
  }


export const authStateReducer = (state, action) => {
    switch (action.type) {
        case 'SIGNUP':
            return { isAuthenticated: true, user: action.payload }
        case 'LOGIN':
            return {  isAuthenticated: true, user: action.payload }
        case 'LOGOUT':
            return { isAuthenticated: false, user: null }
        case 'SET_USER':
            return { isAuthenticated: true, user: action.payload }
        default:
            return state
    }
  }

  export const initialState = {
    loading: false,
    success: false,
    error: null,
  };
  
  export const loadingReducer = (state, action) => {
    switch (action.type) {
      case 'LOADING':
        return { ...state, loading: true, success: false, error: null };
      case 'SUCCESS':
        return { ...state, loading: false, success: true, error: null };
      case 'ERROR':
        return { ...state, loading: false, success: false, error: action.payload };
      default:
        return state;
    }
  };