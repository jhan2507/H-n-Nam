import React, { Component } from 'react';
import { Modal, Table } from 'antd';
import Request from '../../common/network/http/Request';
import apiUrls from '../../constants/api';
import get from 'lodash/get';
import { getInput, getTotalAccount } from '../../actions/info';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import '../result-detail-table/style.scss';

const columns = [
  {
    title: 'Mã thí sinh',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'mail',
    key: 'mail',
  },
  {
    title: 'Đơn vị',
    dataIndex: 'organizations',
    key: 'organizations',
  },
  {
    key: 'code',
    render: (data, item) => (
      <Link to={`${routes.getContest}${item.user_iid}`}>Chi tiết</Link>
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
    };
    this.props.dispatch(getTotalAccount(0));
    this.props.dispatch(getInput(''));
  }

  componentDidMount = () => {
    this.getData();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { input, oid } = this.props;
    if (prevProps.input !== input || prevProps.oid !== oid) {
      this.setState({
        index: 1,
        size: 10,
      });
      this.getData();
    }
  }

  getData = (index = 1, size = 10) => {
    this.props.dispatch(getTotalAccount(''));
    const { input, oid } = this.props;
    this.setState({
      loading: true,
    });
    return Request.get(
      apiUrls.getUserByOrganization,
      {
        input: input,
        index: index,
        size: size,
        oid: oid,
      },
      '',
      'Success',
      'Error',
    )
      .then((data) => {
        this.setState({
          data: get(data, 'result.users', []),
          loading: false,
          total: get(data, 'result.total', 0),
        });
        this.props.dispatch(getTotalAccount(this.state.total));
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
          rowKey="users.user_iid"
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
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  oid: state.info.oid,
  input: state.info.input,
});
export default connect(mapStateToProps)(ResultTable);
