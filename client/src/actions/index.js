import * as types from './ActionTypes';
import axios from 'axios';
import moment from 'moment';

//post
export function boardPostRequest(contents) {
    return (dispatch) => {
        dispatch(boardPOST());

        const { place, startTime, endTime, userName } = contents;

        return axios.get('http://localhost:5000/api/insert', {
            params: {
                place,
                startTime,
                endTime,
                userName
            }
        })
            .then((response) => {
                if(response.data === 'Time Already Reservated'){
                    console.log(response.data);
                    dispatch(boardPostFailure('Time Already Reservated'))
                }
                else{
                    dispatch(boardPostSuccess());
                }
            }).catch((error) => {
                dispatch(boardPostFailure(error));
            })
    };
}

export function boardPOST() {
    return {
        type: types.BOARD_POST
    };
}

export function boardPostSuccess() {
    return {
        type: types.BOARD_POST_SUCCESS
    };
}

export function boardPostFailure(error) {
    return {
        type: types.BOARD_POST_FAILURE,
        error
    };
}


//read List
export function boardListRequest() {
    return (dispatch) => {
        dispatch(boardList());

        return axios.get('http://localhost:5000/api/list')
            .then((response) => {
                const data = response.data.data.rows;
                dispatch(boardListSuccess(data));
            }).catch((error) => {
                dispatch(boardListFailure());
            });
    };
}

export function boardList() {
    return {
        type: types.BOARD_LIST
    };
}

export function boardListSuccess(data) {
    return {
        type: types.BOARD_LIST_SUCCESS,
        data
    };
}

export function boardListFailure() {
    return {
        type: types.BOARD_LIST_FAILURE
    };
}


//read Entire List
export function boardEntireListRequest() {
    return (dispatch) => {
        dispatch(boardEntireList());

        return axios.get('http://localhost:5000/api/entirelist')
            .then((response) => {
                const entiredata = response.data.data.rows;
                dispatch(boardEntireListSuccess(entiredata));
            }).catch((error) => {
                dispatch(boardEntireListFailure());
            });
    };
}

export function boardEntireList() {
    return {
        type: types.BOARD_ENTIRELIST
    };
}

export function boardEntireListSuccess(entiredata) {
    return {
        type: types.BOARD_ENTIRELIST_SUCCESS,
        entiredata
    };
}

export function boardEntireListFailure() {
    return {
        type: types.BOARD_ENTIRELIST_FAILURE
    };
}


//read Place List
export function boardPlaceListRequest() {
    return (dispatch) => {
        dispatch(boardPlaceList());

        return axios.get('http://localhost:5000/api/placeList')
            .then((response) => {
                const data = response.data.data.rows;
                dispatch(boardPlaceListSuccess(data));
            }).catch((error) => {
                dispatch(boardPlaceListFailure());
            });
    };
}

export function boardPlaceList() {
    return {
        type: types.BOARD_PLACELIST
    };
}

export function boardPlaceListSuccess(data) {
    return {
        type: types.BOARD_PLACELIST_SUCCESS,
        data
    };
}

export function boardPlaceListFailure() {
    return {
        type: types.BOARD_PLACELIST_FAILURE
    };
}


//edit
export function boardEditRequest(brdno, index, contents) {
    return (dispatch) => {
        dispatch(boardEdit());

        const { place, username } = contents;
        const starttime = moment(contents.editStarttime, "ddd MMM DD YYYY HH:mm:ss").format("YYYY/MM/DD HH:mm");
        const endtime = moment(contents.editEndtime, "ddd MMM DD YYYY HH:mm:ss").format("YYYY/MM/DD HH:mm");

        return axios.get('http://localhost:5000/api/update', {
            params: {
                place,
                brdno,
                starttime, 
                endtime, 
                username
            }
        })
            .then((response) => {
                if(response.data === 'Time Already Reservated'){
                    dispatch(boardEditFailure('Time Already Reservated'));
                }
                else{
                dispatch(boardEditSuccess(index, response.data));
                }
            }).catch((error) => {
                dispatch(boardEditFailure(error));
            });
    };
}

export function boardEdit() {
    return {
        type: types.BOARD_EDIT
    };
}

export function boardEditSuccess(index, data) {
    return {
        type: types.BOARD_EDIT_SUCCESS,
        index,
        data
    };
}

export function boardEditFailure(error) {
    return {
        type: types.BOARD_EDIT_FAILURE,
        error
    };
}


//remove
export function boardRemoveRequest(brdno, index) {
    return (dispatch) => {
        dispatch(boardRemove());
        return axios.get('http://localhost:5000/api/delete', {
            params: {
                brdno
            }
        })
            .then((response) => {
                dispatch(boardRemoveSuccess(index));
            }).catch((error) => {
                dispatch(boardRemoveFailure(error));
            });
    };
}

export function boardRemove() {
    return {
        type: types.BOARD_REMOVE
    };
}

export function boardRemoveSuccess(index){
    return {
        type: types.BOARD_REMOVE_SUCCESS,
        index
    };
}

export function boardRemoveFailure(error){
    return {
        type: types.BOARD_REMOVE_FAILURE,
        error
    };
}