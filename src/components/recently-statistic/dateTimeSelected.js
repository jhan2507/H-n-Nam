import { DatePicker } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';
import { getEndDate, getStartDate } from '../../actions/statistic';
import { connect } from 'react-redux';

const { RangePicker } = DatePicker;

class DateTimeSelected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: [moment('01/04/2020'), moment(moment(), 'DD/MM/YYYY')],
    };
  }

  render() {
    const end = moment();
    this.props.dispatch(
      getStartDate(moment(this.state.inputValue[0]).format('DD/MM/YYYY')),
    );
    this.props.dispatch(
      getEndDate(moment(this.state.inputValue[1]).format('DD/MM/YYYY')),
    );
    return (
      <div>
        <RangePicker
          defaultValue={[moment('01/04/2020'), moment(end, 'DD/MM/YYYY')]}
          onChange={(date) =>
            this.setState(
              {
                inputValue: date,
              },
              () => {},
            )
          }
          locale="vi"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(DateTimeSelected);
