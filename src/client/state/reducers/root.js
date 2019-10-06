import { combineReducers } from 'redux';
import blog from './blog';
import links from './links';

export default combineReducers({
    blog,
    links
});