import React, { Component } from 'react';
import './ReservationItem.css';
import PropType from 'prop-types';
import moment, { invalid } from 'moment';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class ReservationItem extends Component {
    state = {
        isUpdate: false,
        place: '',
        starttime: '',
        endtime: '',
        username: '',
        editStarttime: '',
        editEndtime: ''
    }

    handleStartTimeChange = (e) => {
        this.setState({
            editStarttime: e
        });
    }

    handleEndTimeChange = (e) => {
        this.setState({
            editEndtime: e
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleUpdate = () => {
        const checkPlace = this.state.place;
        const checkUserName = this.state.username;

        console.log(this.state.editStarttime === "");

        if (checkPlace === this.props.place && this.state.editStarttime === "" && this.state.editEndtime === "" && checkUserName === this.props.username) {
            console.log('check');
            this.setState({
                ...this.state,
                isUpdate: false,
                place: this.props.place,
                starttime: this.props.starttime,
                endtime: this.props.endtime,
                username: this.props.username
            })
            Swal.fire({
                icon: 'warning',
                title: '変更事項はありません。'
            });
        }

        else {
            const checkStartTime = moment(this.state.editStarttime, "ddd MMM DD YYYY HH:mm:ss").format("YYYY/MM/DD HH:mm");
            const checkEndTime = moment(this.state.editEndtime, "ddd MMM DD YYYY HH:mm:ss").format("YYYY/MM/DD HH:mm");
            const checkStartTimeFormat = moment(checkStartTime, "YYYY/MM/DD HH:mm").format("YYYY/MM/DD HH:mm") === checkStartTime;
            const checkEndTimeFormat = moment(checkEndTime, "YYYY/MM/DD HH:mm").format("YYYY/MM/DD HH:mm") === checkEndTime;
            const timeDiff = moment(checkEndTime, "YYYY/MM/DD HH:mm").diff(moment(checkStartTime, "YYYY/MM/DD HH:mm"));

            if (checkPlace === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR！',
                    text: '場所を入力してください。'
                });
                return;
            }

            if (!checkStartTimeFormat) {
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR！',
                    text: '開始時間の形式を確認してください。'
                });
                return;
            }

            if (!checkEndTimeFormat) {
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR！',
                    text: '終了時間の形式を確認してください。'
                });
                return;
            }

            if (checkUserName === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR！',
                    text: '申請者を入力してください。'
                });
                return;
            }

            if (timeDiff <= 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR！',
                    text: '終了時間は開始時間より遅れなければなりません。'
                });
            }
            else {
                this.setState({
                    ...this.state,
                    isUpdate: false
                })
                const { brdno, index } = this.props;
                const contents = this.state;
                this.props.onEdit(brdno, index, contents);
            }
        }
    }

    toggleEdit = (event) => {
        this.setState({
            ...this.state,
            isUpdate: true,
            place: this.props.place,
            starttime: this.props.starttime,
            endtime: this.props.endtime,
            username: this.props.username
        })
    }

    handleCancel = () => {
        this.setState({
            ...this.state,
            isUpdate: false,
            place: this.props.place,
            starttime: this.props.starttime,
            endtime: this.props.endtime,
            username: this.props.username
        })
    }

    handleRemove = () => {
        Swal.fire({
            icon: 'warning',
            title: '予約キャンセル',
            text: '本当にキャンセルしますか?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'YES'
        }).then((result) => {
            if (result.value) {
                const { brdno, index } = this.props;
                this.props.onRemove(brdno, index);
            }
        });
    }

    componentWillMount() {
        this.setState({
            ...this.state,
            place: this.props.place,
            starttime: this.props.starttime,
            endtime: this.props.endtime,
            username: this.props.username
        })
    }

    render() {
        const { index, place, starttime, endtime, username } = this.props;
        const { isUpdate } = this.state;
        const { editStarttime, editEndtime } = this.state;
        return (
            <tr>
                <td>
                    {index + 1}
                </td>
                <td>
                    {isUpdate ?
                        <select className="placeSelect" name="place" onChange={this.handleChange}>
                            {this.props.placeData.map((place, i) => {
                                return (
                                    place.place === this.state.place ?
                                        <option key={i} value={place.place} select="true" defaultValue>{place.place}</option>
                                        : <option key={i} value={place.place}>{place.place}</option>)
                            })}
                        </select>
                        : place
                    }
                </td>
                <td>
                    {isUpdate ?
                        <DatePicker
                            className="datePicker"
                            placeholderText={starttime}
                            todayButton="Today"
                            selected={editStarttime}
                            onChange={this.handleStartTimeChange}
                            maxDate={editEndtime}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={10}
                            timeCaption="time"
                            dateFormat="yyyy/MM/dd HH:mm"
                            withPortal
                        />
                        : starttime
                    }
                </td>
                <td>
                    {isUpdate ?
                        <DatePicker
                            className="datePicker"
                            placeholderText={endtime}
                            todayButton="Today"
                            selected={editEndtime}
                            onChange={this.handleEndTimeChange}
                            minDate={editStarttime}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={10}
                            timeCaption="time"
                            dateFormat="yyyy/MM/dd HH:mm"
                            withPortal
                        />
                        : endtime
                    }
                </td>
                <td>
                    {isUpdate ?
                        <input name="username" value={this.state.username} onChange={this.handleChange} />
                        : username
                    }
                </td>
                <td>
                    {isUpdate ?
                        <button className="completeBtn" onClick={this.handleUpdate}>完了</button> :
                        <button className="editBtn" onClick={this.toggleEdit}>修正</button>
                    }
                </td>
                <td>
                    {isUpdate ?
                        <button onClick={this.handleCancel}>キャンセル</button> :
                        <button onClick={this.handleRemove}>削除</button>
                    }
                </td>
            </tr>
        );
    }
}

ReservationItem.PropType = {
    onEdit: PropType.func,
    onRemove: PropType.onRemove,
    brdno: PropType.number,
    index: PropType.number,
    starttime: PropType.string,
    endtime: PropType.string,
    username: PropType.string
}

ReservationItem.PropType = {
    onEdit: (brdno, index, contents) => {
        console.log('Error! Edit function not defined.');
    },
    onRemove: (brdno, index) => {
        console.log('Error! Remove function not defined.');
    }
};

export default ReservationItem;