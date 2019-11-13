/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
// Initial state
// Actions
import {
    START_DATA_LOADING,
    DATA_LOADED, 
    SEARCH_LOADED, 
    SET_SEARCH_RESULT_INDEX, 
    MORE_DATA_LOADED,
    CLEAR_DATA,
    CLEAR_SEARCH,
    SET_SKIP,
    RESET_SKIP,
    SET_SCROLLED,
} from './GridsActionTypes'
import { getMessages, getMembers } from '../../data';

const initialState = {
    isLoading: true,
    data: [],
    skip: 0,
    hasScrolled: false,
    searchResults: [],
    searchResultIndex: -1,
};
const LOAD_STORIES_NUMBER_AT_A_TIME = 10;

const searchCall = (dispatch, search) => {
    const store = require('../../redux/store').store.getState().grids.data;
    const rt = store.filter(item => {
        const keep = item.email && item.email.toLowerCase().includes(search.toLowerCase())
        return keep;
    }
    )
    dispatch(searchResultsLoaded(rt));
}

const contentCall = (dispatch, skip = 0, limit = LOAD_STORIES_NUMBER_AT_A_TIME) => {
    getMessages()
        .then((mes)=> {
            getMembers()
                .then((mem)=> {
                    const accum = [];
                    const chatLog = mes.map((message) => {
                        // merge message with member details
                        const filteredMemberArr = mem.filter((memberItem) => {
                            if (message.userId === memberItem.id) {
                                delete memberItem.id;
                                return true;
                            } else {
                                return false;
                            }
                        });
                        accum.push(filteredMemberArr.length ? {
                            ...filteredMemberArr[0],
                            ...message
                        } : message);
                    });
                    dispatch(dataLoaded(accum));
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });    
}

function startDataLoading() {
    return { type: START_DATA_LOADING };
}

function searchResultsLoaded(searchResults) {
    return {
        type: SEARCH_LOADED,
        searchResults,
    }
}

function setSearchResultIndex(email) {
    return {
        type: SET_SEARCH_RESULT_INDEX,
        email,
    }
}

function dataLoaded(data) {
    return {
        type: DATA_LOADED,
        data,
    };
}

function moreDataLoaded(data) {
    return {
        type: MORE_DATA_LOADED,
        data,
    };
}

function setSkip() {
    return {
        type: SET_SKIP,
    }
}

function resetSkip() {
    return {
        type: RESET_SKIP,
    }
}

function clearData() {
    return { type: CLEAR_DATA };
}

function setScrolled(hasScrolled) {
    return { type: SET_SCROLLED, hasScrolled }
}

export function clearSearchResultsLoaded() {
    return {
        type: CLEAR_SEARCH,
    }
}

export function onScroll() {
    return dispatch => {
        dispatch(setScrolled());
    };
}

export function loadsearchResultsData(search) {
    return dispatch => {
        // Every fresh load, reset skips
        dispatch(startDataLoading());
        searchCall(dispatch, search);
    };
}

export function changeSearchResult(email) {
    return dispatch => {
        dispatch(setSearchResultIndex(email));
    }
}

export function loadData(index, tabs) {
    return dispatch => {
        // Every fresh load, reset skips
        dispatch(resetSkip());
        dispatch(startDataLoading());
        // Connect to the API here
        contentCall(dispatch, 0, LOAD_STORIES_NUMBER_AT_A_TIME, index, tabs);
    };
}

export function loadMoreData(skip, hasScrolled, isLoading, index, tabs) {
    return dispatch => {
        if (!isLoading) {
            // If loading more and hasn't scrolled, and is 
            // currently loading, don't load anything more
            if (!hasScrolled) {
                dispatch(moreDataLoaded([]));
            } else {
                dispatch(startDataLoading());
                dispatch(setSkip());
                // Connect to the API here
                contentCall(dispatch, skip, LOAD_STORIES_NUMBER_AT_A_TIME, index, tabs);
            }
        }

    };
}

export function refreshData(index) {
    return dispatch => {
        dispatch(clearData());
        contentCall(dispatch, 0, LOAD_STORIES_NUMBER_AT_A_TIME, index);
    };
}

// Reducer
export default function GridsStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case START_DATA_LOADING:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case DATA_LOADED:
            return Object.assign({}, state, {
                isLoading: false,
                data: action.data,
            });
        case CLEAR_SEARCH:
            return Object.assign({}, state, {
                searchResults: [],
            });
        case SEARCH_LOADED:
            return Object.assign({}, state, {
                isLoading: false,
                searchResults: action.searchResults,
            });
        case SET_SEARCH_RESULT_INDEX:
            return Object.assign({}, state, {
                searchResultIndex: action.email,
            });
        case MORE_DATA_LOADED:
            return Object.assign({}, state, {
                isLoading: false,
                data: [...state.data, ...action.data],
            });
        case CLEAR_DATA:
            return Object.assign({}, state, {
                data: [],
            });
        case RESET_SKIP:
            return { ...state, skip: 0 }
        case SET_SKIP:
            return { ...state, skip: state.skip + 10 }
        case SET_SCROLLED:
            return { ...state, hasScrolled: true }
        default:
            return state;
    }
}