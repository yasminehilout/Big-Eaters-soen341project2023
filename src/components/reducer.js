const initialState = {
    isAuthenticated: false,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_AUTHENTICATED':
        return {
          ...state,
          isAuthenticated: action.payload,
        };
      default:
        return state;
    }
  };