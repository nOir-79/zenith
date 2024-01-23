// store.js
import { createStore } from 'redux';

// Action Types
const SET_PRODUCT_DATA = 'SET_PRODUCT_DATA';

// Action Creators
export const setProductData = (data) => ({
  type: SET_PRODUCT_DATA,
  payload: data,
});

// Reducer
const productReducer = (state = null, action) => {
  switch (action.type) {
    case SET_PRODUCT_DATA:
      return action.payload;
    default:
      return state;
  }
};

// Create Redux Store
const store = createStore(productReducer);

export default store;
