const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';
const ADD_IMAGE_DROP = 'ADD_IMAGE_DROP';

export const searchResult = result => ({
  type: ADD_SEARCH_RESULT,
  payload: result,
});

export const imageDrop = url => ({
  type: ADD_IMAGE_DROP,
  payload: url,
});

const initialState = {
  searchResult: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SEARCH_RESULT:
      return {
        ...state,
        searchResult: action.payload,
      };
    case ADD_IMAGE_DROP:
      return {
        ...state,
        imageURL: action.payload,
      };
    default:
      return state;
  }
}
