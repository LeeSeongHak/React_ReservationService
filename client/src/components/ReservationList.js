import React, { Component } from 'react';
import ReservationItem from './ReservationItem';
import ReservationGraph from './ReservationGraph';
import './ReservationList.css';
import PropType from 'prop-types';

class ReservationList extends Component {
    state = {
        mode: 'board'
    }


    handleButton = () => {
        const { mode } = this.state;

        if (mode === 'board') {
            this.setState({
                mode: 'graph'
            })
        }
        else {
            this.setState({
                mode: 'board'
            })
        }
    }

    render() {
        const reservationList = this.props.data.map(
            (data, i) => (
                <ReservationItem
                    key={i}
                    index={i}
                    {...data}
                    placeData={this.props.placeData}
                    onEdit={this.props.onEdit}
                    onRemove={this.props.onRemove}
                />
            )
        );

        const { mode } = this.state;
        return (
            <div>
                {mode === 'board' ?
                    <div>
                        {this.props.entireData === [] ? '' :
                            <button className="modeBtn" onClick={this.handleButton}>Graph</button>
                        }
                        <table border="1" className="ReservationList">
                            <tbody>
                                <tr align="center">
                                    <td className="brdno">No.</td>
                                    <td className="place">場所</td>
                                    <td className="starttime" >開始時間</td>
                                    <td className="endtime" >修了時間</td>
                                    <td className="username">申請者</td>
                                    <td className="update">修正</td>
                                    <td className="delete">削除</td>
                                </tr>
                                {reservationList}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div>
                        <button className="modeBtn" onClick={this.handleButton}>Board</button>
                        <ReservationGraph data={this.props.entireData} />
                    </div>
                }
            </div>
        );
    }
}

ReservationList.PropType = {
    data: PropType.array,
    entireData: PropType.array,
    onEdit: PropType.func,
    onRemove: PropType.onRemove
}

ReservationList.defaultProps = {
    data: [],
    entireData: [],
    onEdit: (brdno, index, contents) => {
        console.log('Error! Edit function not defined.');
    },
    onRemove: (brdno, index) => {
        console.log('Error! Remove function not defined.');
    }
};

export default ReservationList;