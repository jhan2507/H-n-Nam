import React, { Component } from 'react';
import Request from '../../common/network/http/Request';
import apiUrl from '../../constants/api';
import get from 'lodash/get';
import { connect } from 'react-redux';
import Table from 'antd/lib/table';
import { getCountContestantsBySearch } from '../../actions/statistic';

const columns = [
  {
    title: 'Mã thí sinh',
    dataIndex: '_code',
    key: '_code',
  },
  {
    title: 'Tên Thí Sinh',
    dataIndex: '_name',
    key: '_name',
  },
  {
    title: 'Email',
    dataIndex: '_mail',
    key: 'mail',
  },
  {
    title: 'Cuộc thi',
    dataIndex: '_contest_name',
    key: 'contest',
    render: (_contest_name) => (
      <div>
        {_contest_name.map((reptile) => (
          <li type="disc">{reptile}</li>
        ))}
      </div>
    ),
  },
];

class ContestantTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      searchContestant: '',
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { searchContestant } = this.props;
    if (prevProps.searchContestant !== searchContestant) {
      this.setState({
        pageIndex: 1,
        pageSize: 10,
      });
      this.getData();
    }
  }

  getData(pageIndex = 1, pageSize = 10) {
    this.props.dispatch(getCountContestantsBySearch(''));
    const { selectedMonth, searchContestant } = this.props;
    this.setState({ loading: true });
    return Request.get(
      apiUrl.getContestant,
      {
        month: selectedMonth,
        search: searchContestant,
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
      '',
      'Success',
      'Error',
    )
      .then((data) => {
        this.setState({
          data: get(data, 'users', []),
          loading: false,
          total: get(data, 'total', 0),
        });
        this.props.dispatch(getCountContestantsBySearch(this.state.total));
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
              this.getData(pageIndex, pageSize);
            },
            onShowSizeChange: (pageIndex, pageSize) => {
              this.setState({
                pageIndex: pageIndex,
                pageSize: pageSize,
              });
              this.getData(pageIndex, pageSize);
            },
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  searchContestant: state.statistic.searchContestant,
});
export default connect(mapStateToProps)(ContestantTable);
