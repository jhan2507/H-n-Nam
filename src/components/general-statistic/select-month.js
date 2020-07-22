import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { selectMonthChart, totals } from '../../actions/statistic';
import Request from '../../common/network/http/Request';
import apiUrls from '../../constants/api';
import get from 'lodash/get';
import moment from 'moment';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

const { Option } = Select;

class SelectMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      totalBoth: 0,
      totalPrivate: 0,
      totalPublic: 0,
      totalFailed: 0,
      monthOfDetail: moment().month() + 1,
      currentMonth: moment().month() + 1,
    };
  }

  componentDidMount() {
    this.getTotal();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentMonth } = this.props;
    if (prevProps.currentMonth !== currentMonth) {
      this.setState({
        total: 0,
        totalBoth: 0,
        totalPrivate: 0,
        totalPublic: 0,
        totalFailed: 0,
      });
      this.getTotal();
    }
  }

  componentWillUnmount() {
    this.props.dispatch(selectMonthChart(moment().month() + 1));
    // this.props.dispatch(
    //   totals(0, 0, 0, 0, 0),
    // );
  }

  getTotal = () => {
    this.setState({ loading: true, total: '' });
    return Request.get(
      apiUrls.getTotal,
      {
        month: this.props.currentMonth,
      },
      '',
      'Success',
      'Error',
    )
      .then((data) => {
        this.setState({
          total: get(data, 'result.total', 0),
          totalPrivate: get(data, 'result.privates', 0),
          totalPublic: get(data, 'result.publics', 0),
          totalBoth: get(data, 'result.both', 0),
          totalFailed: get(data, 'result.violation', 0),
          currentMonth: moment().month() + 1,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  handleClick = (month) => {
    this.setState({
      pageIndex: 1,
      monthOfDetail: month,
    });
    this.props.dispatch(selectMonthChart(month));
  };

  render() {
    const { monthOfDetail } = this.state;
    const {
      total,
      totalPrivate,
      totalPublic,
      totalFailed,
      totalBoth,
    } = this.state;
    this.props.dispatch(
      totals(total, totalPublic, totalPrivate, totalBoth, totalFailed),
    );
    return (
      <div className="select-month-container">
        <div className="row">
          <div className="col-4" />
          <div className="col" id="total">
            <h3>
              Tổng thí sinh tham gia thi:{' '}
              <b> {this.state.total.toLocaleString()}</b>
              <div>
                <Link to={`${routes.getContestant}${monthOfDetail}`}>
                  <i>(Bấm để xem chi tiết)</i>{' '}
                </Link>
              </div>
            </h3>
          </div>
          <div className="col">
            <Select
              className="month"
              defaultValue={this.state.currentMonth}
              size="large"
              onChange={this.handleClick}
            >
              {moment.months().map((item, index) => (
                <Option value={index + 1} key={index + 1}>
                  {item[0].toUpperCase() + item.slice(1)}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentMonth: state.statistic.currentMonth,
  total: state.statistic.total,
});

export default connect(mapStateToProps)(SelectMonth);
