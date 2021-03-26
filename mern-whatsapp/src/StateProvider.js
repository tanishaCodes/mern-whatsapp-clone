import React, { createContext, useContext, useReducer } from 'react';

// creates the data layer where the data lives
export const StateContext = createContext();

// the data layer is the StateProvider; with a heirachle component
export const StateProvider = ({ reducer, initialState, children }) => (
    // sets up the data layer
    <StateContext.Provider value={useReducer (reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// pulls information from the data layer
export const useStateValue = () => useContext(StateContext);
