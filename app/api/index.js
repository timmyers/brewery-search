import { setDispatch } from './socket';
import saga from './sagas';
import { reducer } from './reducers';

const APISaga = saga;

export { APISaga, setDispatch, reducer };
