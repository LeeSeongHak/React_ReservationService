import React, { Component } from 'react';
import ReservationForm from '../components/ReservationForm';
import ReservationList from '../components/ReservationList';
import { connect } from 'react-redux';
import { boardPostRequest, boardListRequest, boardEntireListRequest, boardPlaceListRequest, boardEditRequest, boardRemoveRequest } from '../actions/index';
import Swal from 'sweetalert2';

class ReservationContainer extends Component {

    handlePost = (contents) => {
        return this.props.boardPostRequest(contents).then(
            () => {
                if (this.props.postStatus === 'SUCCESS') {
                    this.props.boardListRequest();
                    this.props.boardEntireListRequest();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: '申請完了！',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                else {
                    if (this.props.postError === 'Time Already Reservated') {
                        Swal.fire({
                            icon: 'error',
                            title: 'ERROR！',
                            text: 'もう予約された時間です。再入力してください。'
                        });
                    }
                }
            }
        );
    }

    handleEdit = (brdno, index, contents) => {
        return this.props.boardEditRequest(brdno, index, contents).then(
            () => {
                if (this.props.editStatus === "SUCCESS") {
                    this.props.boardListRequest();
                    this.props.boardEntireListRequest();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: '修正完了！',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                else {
                    if (this.props.editError === 'Time Already Reservated') {
                        Swal.fire({
                            icon: 'error',
                            title: 'ERROR！',
                            text: 'もう予約された時間です。再入力してください。'
                        });
                    }
                }
            }
        );
    }

    handleRemove = (brdno, index) => {
        return this.props.boardRemoveRequest(brdno, index).then(
            () => {
                if (this.props.removeStatus === "SUCCESS") {
                    Swal.fire(
                        '処理完了！',
                        '予約をキャンセルしました。',
                        'success'
                    )
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'ERROR！',
                        text: this.props.removeStatus
                    });
                }
            })
    }

    componentDidMount() {
        this.props.boardListRequest();
        this.props.boardEntireListRequest();
        this.props.boardPlaceListRequest();
    }

    render() {
        return (
            <div className="wrapper">
                <ReservationForm placeData={this.props.boardPlaceData} onPost={this.handlePost} />
                <ReservationList
                    data={this.props.boardData}
                    entireData={this.props.boardEntireData}
                    placeData={this.props.boardPlaceData}
                    onEdit={this.handleEdit}
                    onRemove={this.handleRemove}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        postStatus: state.post.status,
        boardData: state.list.data,
        boardEntireData: state.entirelist.entiredata,
        boardPlaceData: state.placelist.data,
        editStatus: state.edit.status,
        removeStatus: state.remove.status,
        postError: state.post.error,
        editError: state.edit.error
    };
}

const mapDispatchToProps = () => (dispatch) => {
    return {
        boardPostRequest: (contents) => {
            return dispatch(boardPostRequest(contents));
        },
        boardListRequest: () => {
            return dispatch(boardListRequest());
        },
        boardEntireListRequest: () => {
            return dispatch(boardEntireListRequest());
        },
        boardPlaceListRequest: () => {
            return dispatch(boardPlaceListRequest());
        },
        boardEditRequest: (place, brdno, index, contents) => {
            return dispatch(boardEditRequest(place, brdno, index, contents));
        },
        boardRemoveRequest: (brdno, index) => {
            return dispatch(boardRemoveRequest(brdno, index));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReservationContainer);