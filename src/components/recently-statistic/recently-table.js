import React, { Component } from 'react';
import Request from '../../common/network/http/Request';
import apiUrl from '../../constants/api';
import get from 'lodash/get';
import { connect } from 'react-redux';
import moment from 'moment';
import Table from 'antd/lib/table';
import { getCountExamTurnBySearch } from '../../actions/statistic';

const columns = [
  {
    title: 'Tên Thí Sinh',
    dataIndex: 'u',
    key: 'name',
    render: ({ name }) => name,
  },

  {
    title: 'Cuộc thi',
    dataIndex: '_contest',
    key: 'contest',
    render: ({ name }) => name,
  },

  {
    title: 'Ca thi',
    dataIndex: 'exam_shift',
    key: 'shift',
    render: ({ name }) => name,
  },
  {
    title: 'Môn',
    dataIndex: 'exam',
    key: 'subject',
    render: ({ name }) => name,
  },
  {
    title: 'Điểm',
    dataIndex: 'score',
    key: 'score',
    render: (score) => (
      <div className="score">
        {score === null
          ? 'Chưa chấm bài'
          : Math.round(parseFloat(score) * 1000) / 1000}
      </div>
    ),
  },
  {
    title: 'Thời gian kiểm tra',
    dataIndex: 'ts',
    key: 'date',
    render: (ts) => (
      <div className="ts">{moment.unix(ts).format('HH:MM:SS DD/MM/yyyy ')}</div>
    ),
  },
];

class RecentlyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      search: '',
      start_date: '',
      end_date: '',
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentType, search, start_date, end_date } = this.props;
    if (
      (prevProps.currentType !== currentType || prevProps.search !== search) &&
      currentType !== 'fromto'
    ) {
      this.getData();
    } else if (
      (prevProps.currentType !== currentType ||
        prevProps.search !== search ||
        prevProps.start_date !== start_date ||
        prevProps.end_date !== end_date) &&
      currentType === 'fromto'
    ) {
      this.getData(1, 10, start_date, end_date);
    }
  }

  getData(pageIndex = 1, pageSize = 10, start_date, end_date) {
    this.props.dispatch(getCountExamTurnBySearch(''));
    this.setState({ loading: true });
    const { search, currentType } = this.props;
    return Request.get(
      apiUrl.getByTime,
      {
        search: search,
        index: pageIndex,
        size: pageSize,
        type: currentType,
        startDate: start_date,
        endDate: end_date,
      },
      '',
      'Success',
      'Error',
    )
      .then((data) => {
        this.setState({
          data: get(data, 'result', []),
          loading: false,
          total: get(data, 'countExamTurn', 0),
        });
        this.props.dispatch(getCountExamTurnBySearch(this.state.total));
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
  }

  render() {
    const { data, loading, pageIndex, pageSize, total } = this.state;
    const { start_date, end_date } = this.props;
    return (
      <div>
        <Table
          columns={columns}
          loading={loading}
          dataSource={data}
          bordered
          rowKey="_id"
          pagination={{
            current: pageIndex,
            pageSize: pageSize,
            total: total,
            onChange: (pageIndex, pageSize) => {
              this.setState({
                pageIndex: pageIndex,
                pageSize: pageSize,
              });
              this.getData(pageIndex, pageSize, start_date, end_date);
            },
            onShowSizeChange: (pageIndex, pageSize) => {
              this.setState({
                pageIndex: pageIndex,
                pageSize: pageSize,
              });
              this.getData(pageIndex, pageSize, start_date, end_date);
            },
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  search: state.statistic.search,
  currentType: state.statistic.currentType,
  start_date: state.statistic.start_date,
  end_date: state.statistic.end_date,
});
export default connect(mapStateToProps)(RecentlyTable);
