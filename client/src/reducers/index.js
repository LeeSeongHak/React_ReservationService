import * as types from '../actions/ActionTypes';

const initialState = {
    post: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        data: []
    },
    entirelist: {
        status: 'INIT',
        entiredata: []
    },
    placelist: {
        status: 'INIT',
        data: []
    },
    edit: {
        status: 'INIT',
        error: -1
    },
    remove: {
        status: 'INIT',
        error: -1
    }
}

export default function board(state = initialState, action) {
    switch (action.type) {
        /* BOARD POST */
        case types.BOARD_POST:
            return {
                ...state,
                post: {
                    ...state.post,
                    status: 'WAITING',
                    error: -1
                }
            };
        case types.BOARD_POST_SUCCESS:
            return {
                ...state,
                post: {
                    ...state.post,
                    status: 'SUCCESS'
                }
            };
        case types.BOARD_POST_FAILURE:
            return {
                ...state,
                post: {
                    ...state.post,
                    status: 'FAILURE',
                    error: action.error
                }
            };
        /* BOARD LIST */
        case types.BOARD_LIST:
            return {
                ...state,
                list: {
                    ...state.list,
                    status: 'WAITING'
                }
            };
        case types.BOARD_LIST_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    status: 'SUCCESS',
                    data: action.data
                }
            }
        case types.BOARD_LIST_FAILURE:
            return {
                ...state,
                list: {
                    ...state.list,
                    status: 'FAILURE'
                }
            };
        /* BOARD ENTIRE LIST */
        case types.BOARD_ENTIRELIST:
            return {
                ...state,
                entirelist: {
                    ...state.entirelist,
                    status: 'WAITING'
                }
            };
        case types.BOARD_ENTIRELIST_SUCCESS:
            return {
                ...state,
                entirelist: {
                    ...state.entirelist,
                    status: 'SUCCESS',
                    entiredata: action.entiredata
                }
            }
        case types.BOARD_ENTIRELIST_FAILURE:
            return {
                ...state,
                entirelist: {
                    ...state.entirelist,
                    status: 'FAILURE'
                }
            };
        /* BOARD PLACELIST */
        case types.BOARD_PLACELIST:
            return {
                ...state,
                placelist: {
                    ...state.placelist,
                    status: 'WAITING'
                }
            };
        case types.BOARD_PLACELIST_SUCCESS:
            return {
                ...state,
                placelist: {
                    ...state.placelist,
                    status: 'SUCCESS',
                    data: action.data
                }
            }
        case types.BOARD_PLACELIST_FAILURE:
            return {
                ...state,
                placelist: {
                    ...state.placelist,
                    status: 'FAILURE'
                }
            };
        /* BOARD EDIT */
        case types.BOARD_EDIT:
            return {
                ...state,
                edit: {
                    ...state.edit,
                    status: 'WAITING',
                    error: -1,
                    data: undefined
                }
            };
        case types.BOARD_EDIT_SUCCESS:
            const editBefore = state.list.data.slice(0, action.index);
            const editAfter = state.list.data.slice(action.index + 1);
            return {
                ...state,
                edit: {
                    ...state.edit,
                    status: "SUCCESS"
                },
                list: {
                    ...state.list,
                    data: [...editBefore, action.data, ...editAfter]
                }
            };
        case types.BOARD_EDIT_FAILURE:
            return {
                ...state,
                edit: {
                    ...state.edit,
                    status: "FAILURE",
                    error: action.error
                }
            };
        /* BOARD REMOVE */
        case types.BOARD_REMOVE:
            return {
                ...state,
                remove: {
                    ...state.remove,
                    status: 'WAITING',
                    error: -1
                }
            };
        case types.BOARD_REMOVE_SUCCESS:
            const removeBefore = state.list.data.slice(0, action.index);
            const removeAfter = state.list.data.slice(action.index + 1);
            return {
                ...state,
                list: {
                    ...state.list,
                    data: [...removeBefore, ...removeAfter]
                },
                remove: {
                    ...state.remove,
                    status: 'SUCCESS'
                }

            };
        case types.BOARD_REMOVE_FAILURE:
            return {
                ...state,
                remove: {
                    ...state.remove,
                    status: 'FAILURE',
                    error: action.error
                }
            };
        default:
            return state;
    }
}