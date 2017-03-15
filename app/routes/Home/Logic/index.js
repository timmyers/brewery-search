export const MAP_BOUNDS_CHANGED = 'MAP_BOUNDS_CHANGED';
export const MAP_BREWERY_HOVER_IN = 'MAP_BREWERY_HOVER_IN';
export const MAP_BREWERY_HOVER_OUT = 'MAP_BREWERY_HOVER_OUT';

export const mapBoundsChanged = bounds => ({
  type: MAP_BOUNDS_CHANGED,
  payload: bounds,
});

export const childMouseEntered = (childProps) => {
  const breweryID = childProps.brewery.breweryID;

  return {
    type: MAP_BREWERY_HOVER_IN,
    payload: breweryID,
  };
};

export const childMouseLeft = (childProps) => {
  const breweryID = childProps.brewery.breweryID;

  return {
    type: MAP_BREWERY_HOVER_OUT,
    payload: breweryID,
  };
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MAP_BOUNDS_CHANGED]: (state, action) => ({
    ...state,
    bounds: action.payload,
  }),
  [MAP_BREWERY_HOVER_IN]: (state, action) => ({
    ...state,
    hoveredBreweryID: action.payload,
  }),
  [MAP_BREWERY_HOVER_OUT]: state => ({
    ...state,
    hoveredBreweryID: null,
  }),
};

const initialState = {
  bounds: null,
  hoveredBreweryID: null,
};

export function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
