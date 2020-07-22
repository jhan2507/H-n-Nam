import React from 'react';
import Table from 'antd/lib/table';
import Request from '../../common/network/http/Request';
import apiUrl from '../../constants/api';
import get from 'lodash/get';
import { connect } from 'react-redux';

const columns = [
  {
    title: 'Đơn vị',
    dataIndex: 'name',
    key: 'oid',
    render: (name) => <div className="nameOrg">{name}</div>,
  },
  {
    title: 'Thí sinh thi thật',
    dataIndex: 'privates',
    key: 'privates',
  },
  {
    title: 'Thí sinh thi thử',
    dataIndex: 'publics',
    key: 'publics',
  },

  {
    title: 'Thí sinh thi cả hai',
    dataIndex: 'both',
    key: 'both',
  },
  {
    title: 'Thí sinh thi bị đánh dấu bài',
    dataIndex: 'violation',
    key: 'violation',
  },
  {
    title: 'Tổng (Thử + Thật - Cả hai) ',
    dataIndex: 'total',
    key: 'total',
  },
];

class TableData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      pageIndex: 1,
      pageSize: 5,
      totalSize: 0,
    };
  }

  componentDidMount() {
    this.getAllTotal();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentMonth } = this.props;
    if (prevProps.currentMonth !== currentMonth) {
      this.setState({
        pageIndex: 1,
        pageSize: 5,
      });
      this.getAllTotal(1, 5);
    }
  }

  getAllTotal(pageIndex = 1, pageSize = 5) {
    this.setState({ loading: true });
    return Request.getAllTotal(
      apiUrl.getDataTable,
      {
        pageIndex: pageIndex,
        pageSize: pageSize,
        month: this.props.currentMonth,
      },
      '',
      'Success',
      'Error',
    )
      .then((data) => {
        this.setState({
          data: get(data, 'result', []),
          loading: false,
          totalSize: get(data, 'totalSize', 0),
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      })
      .finally(() =>
        this.setState({
          loading: false,
        }),
      );
  }

  render() {
    const { data, loading, pageIndex, pageSize, totalSize } = this.state;
    if (!data) return null;
    else {
      return (
        <Table
          columns={columns}
          loading={loading}
          dataSource={data}
          size="large"
          pagination={{
            current: pageIndex,
            total: totalSize,
            pageSize: pageSize,
            onChange: (pageIndex, pageSize) => {
              this.setState({
                pageIndex: pageIndex,
                pageSize: pageSize,
              });
              this.getAllTotal(pageIndex, pageSize);
            },
            onShowSizeChange: (pageIndex, pageSize) => {
              this.setState({
                pageIndex: pageIndex,
                pageSize: pageSize,
              });
              this.getAllTotal(pageIndex, pageSize);
            },
          }}
          bordered
        />
      );
    }
  }
}

const mapStateToProps = (state) => ({
  currentMonth: state.statistic.currentMonth,
});

export default connect(mapStateToProps)(TableData);
