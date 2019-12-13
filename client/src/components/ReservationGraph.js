import React, { Component } from 'react';
import PropType from 'prop-types';
import CalendarHeatmap from 'reactjs-calendar-heatmap';
import moment from 'moment';

class ReservationGraph extends Component {
    render() {
        const dateArray = [];
        const nameArray = [];
        const detailDateArray = [];
        const valueArray = [];
        const usernameArray = [];

        this.props.data.map(data => {
            dateArray.push(data.starttime.substring(0, 10));
        });

        this.props.data.map(data => {
            nameArray.push(data.place);
        });

        this.props.data.map(data => {
            detailDateArray.push(data.starttime);
        });

        this.props.data.map(data => {
            valueArray.push(moment(data.endtime, "YYYY/MM/DD HH:mm").diff(moment(data.starttime, "YYYY/MM/DD HH:mm")) / 1000);
        });

        this.props.data.map(data => {
            usernameArray.push(data.username);
        });

        let data = [];
        for (let i = 0; i < dateArray.length; i++) {
            console.log("i : " + i);
            let check = true;
            for (let j = 0; j < i; j++) {
                if (dateArray[i] === dateArray[j]) {
                    check = false;
                    
                    console.log('j: ' + j);
                    

                    const total = data[j].total;
                    data[j].total = total + valueArray[i];

                    data[j].details.push({
                        "name": nameArray[i],
                        "date": detailDateArray[i],
                        "value": valueArray[i]
                    });
                    console.log('data[j].total: ' + data[j].total);
                    break;
                }
            }
            if (check) {
                data.push({
                    "date": dateArray[i],
                    "total": valueArray[i],
                    "details": [{
                        "name": nameArray[i],
                        "date": detailDateArray[i],
                        "value": valueArray[i]
                    }]
                });
            }
        }

        return (
            <div>
                <CalendarHeatmap
                    data={data}
                    overview='year'
                    color='red'
                >
                </CalendarHeatmap>
            </div>
        );
    }
}

ReservationGraph.PropType = {
    data: PropType.array
}

ReservationGraph.PropType = {
    data: []
};

export default ReservationGraph;