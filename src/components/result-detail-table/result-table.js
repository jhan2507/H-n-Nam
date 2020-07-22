import { Table } from 'antd';
import React, { Component } from 'react';
import Request from '../../common/network/http/Request';
import apiUrls from '../../constants/api';
import get from 'lodash/get';
import { connect } from 'react-redux';
import moment from 'moment';

const columns = [
  {
    title: 'Môn thi',
    dataIndex: 'exam_round',
    key: 'exam_round',
    render: (exam_round) => <div className="td-table-text">{exam_round}</div>,
  },
  {
    title: 'Thời gian bắt đầu',
    dataIndex: 'start_time',
    key: 'start_time',
    render: (start_time) =>
      moment.unix(start_time).format('hh:mm:ss A DD/MM/YYYY '),
  },
  {
    title: 'Thời gian kết thúc',
    key: 'finished_time',
    dataIndex: 'finished_time',
    render: (finished_time) =>
      moment.unix(finished_time).format('hh:mm:ss A DD/MM/YYYY'),
  },
  {
    title: 'Điểm',
    key: 'score',
    dataIndex: 'score',
    render: (data, item) => (
      <div className="td-table-number">
        {item.score == null ? (
          <div style={{ textAlign: 'left', fontSize: 14 }}>
            Chưa cập nhập kết quả thi
          </div>
        ) : (
          item.score + '/' + item.total_score
        )}
      </div>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'violation_status',
    key: 'violation_status',
    render: (data, item) => (
      <div className="td-table-text">
        {item.violation_status === '0' ? 'Hoàn thành bài thi' : 'Trượt'}
        <div className="td-table-item">
          Số lần vi phạm: {item.violation}/{item.violation_limit}
        </div>
      </div>
    ),
  },
];

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      index: 1,
      size: 10,
      total: 0,
      contestId: 0,
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { contestId } = this.props;
    if (prevProps.contestId !== contestId) {
      this.setState({
        index: 1,
        size: 10,
      });
      this.getData();
    }
  }

  getData = (index = 1, size = 10) => {
    const { userId, contestId } = this.props;
    this.setState({
      loading: true,
    });
    return Request.get(
      apiUrls.getDetailResult,
      {
        contestId: contestId,
        index: index,
        size: size,
        userId: userId,
      },
      '',
      'Success',
      'Error',
    )
      .then((data) => {
        this.setState({
          data: get(data, 'result.results', []),
          loading: false,
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { data, loading, total, index, size } = this.state;
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          borderedm
          rowKey="contests.contest_iid"
          pagination={{
            current: index,
            size,
            total,
            onShowSizeChange: (index, size) => {
              this.setState({
                index,
                size,
              });
              this.getData(index, size);
            },
            onChange: (index, size) => {
              this.setState({
                index,
                size,
              });
              this.getData(index, size);
            },
          }}
          locale={{
            emptyText: this.props.oid ? '' : 'Chọn cuộc thi để xem báo cáo',
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contestId: state.info.contestId,
});
export default connect(mapStateToProps)(ResultTable);
