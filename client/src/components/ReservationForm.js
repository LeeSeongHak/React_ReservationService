import React, { Component } from 'react';
import './ReservationForm.css';
import PropType from 'prop-types';
import moment from 'moment';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class ReservationForm extends Component {
    state = {
        brdno: "",
        place: "会議室1",
        startTime: "",
        endTime: "",
        userName: ""
    };

    handleStartTimeChange = (e) => {
        this.setState({
            startTime: e
        });
    }

    handleEndTimeChange = (e) => {
        this.setState({
            endTime: e
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handlePost = () => {
        const checkStartTime = moment(this.state.startTime, "ddd MMM DD YYYY HH:mm:ss").format("YYYY/MM/DD HH:mm");
        const checkEndTime = moment(this.state.endTime, "ddd MMM DD YYYY HH:mm:ss").format("YYYY/MM/DD HH:mm");
        const checkUserName = this.state.userName;
        const checkStartTimeFormat = moment(checkStartTime, "YYYY/MM/DD HH:mm").format("YYYY/MM/DD HH:mm") === checkStartTime;
        const checkEndTimeFormat = moment(checkEndTime, "YYYY/MM/DD HH:mm").format("YYYY/MM/DD HH:mm") === checkEndTime;
        const timeDiff = moment(checkEndTime, "YYYY/MM/DD HH:mm").diff(moment(checkStartTime, "YYYY/MM/DD HH:mm"));

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
            const contents = this.state

            this.props.onPost(contents).then(
                () => {
                    this.setState({
                        brdno: "",
                        place: "",
                        startTime: "",
                        endTime: "",
                        userName: ""
                    });
                }
            );
        }
    }

    render() {
        const { startTime, endTime, userName } = this.state;
        return (
            <div>
                <select className="placeSelect" name="place" onChange={this.handleChange}>
                    {this.props.placeData.map((place, i) => {
                        return (<option key={i} value={place.place}>{place.place}</option>)
                    })}
                </select>
                <DatePicker
                    className="datePicker"
                    placeholderText="Click to startTime"
                    todayButton="Today"
                    selected={startTime}
                    onChange={this.handleStartTimeChange}
                    maxDate={endTime}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={10}
                    timeCaption="time"
                    dateFormat="yyyy/MM/dd HH:mm"
                />
                ~
                <DatePicker 
                    className="datePicker"
                    placeholderText="Click to endTime"
                    todayButton="Today"
                    selected={endTime}
                    onChange={this.handleEndTimeChange}
                    minDate={startTime}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={10}
                    timeCaption="time"
                    dateFormat="yyyy/MM/dd HH:mm"
                />
                <label htmlFor="inp" className="inp">
                    <input name="userName" value={userName} onChange={this.handleChange} />
                    <span className="label">申請者</span>
                    <span className="border"></span>
                </label>
                <button className="writeBtn" onClick={this.handlePost}>申請</button>
            </div>
        );
    }
}

ReservationForm.PropType = {
    onPost: PropType.func
}

ReservationForm.PropType = {
    onPost: (contents) => {
        console.log('Error! Post function not defined.');
    }
};

export default ReservationForm;