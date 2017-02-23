import { setDispatch } from './socket';
import saga from './sagas';
import { reducer } from './reducers';

let APISaga = saga;

export { APISaga, setDispatch, reducer };