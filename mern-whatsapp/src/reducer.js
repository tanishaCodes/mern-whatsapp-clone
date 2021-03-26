export const initialState = {
    // user is not logged in
    user: null,
};

// pushes user into the data layer when they enter their creditials
export const actionTypes = {
    SET_USER: 'SET_USER',
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case actionTypes.SET_USER:
        return {
            ...state,
            user: action.user,
        };

        default:
            return state;
    }
};

export default reducer;