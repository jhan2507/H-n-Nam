import { Select } from 'antd';
import React, { Component } from 'react';
import Request from '../../common/network/http/Request';
import apiUrls from '../../constants/api';
import get from 'lodash/get';
import {
  getAccountCode,
  getOrganizations,
  getUsername,
  selectContest,
} from '../../actions/info';
import { connect } from 'react-redux';

const { Option } = Select;

class SelectContest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      userId: 0,
      username: '',
      organizations: 0,
    };
    this.props.dispatch(selectContest(0));
    this.props.dispatch(getUsername(''));
    this.props.dispatch(getOrganizations(''));
    this.props.dispatch(getAccountCode(''));
  }

  handleClick = (contestId) => {
    this.props.dispatch(selectContest(contestId));
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    const { userId } = this.props;
    return Request.get(
      apiUrls.getContetstByUid,
      {
        userId: userId,
      },
      '',
      'Success',
    )
      .then((data) => {
        this.setState({
          data: get(data, 'result.contests', []),
          loading: false,
          name: get(data, 'result.contests.0.user_name', ''),
          organizations: get(data, 'result.contests.0.organization', ''),
          code: get(data, 'result.contests.0.user_code', ''),
          contest_iid: get(data, 'result.contests.0.contest_iid', ''),
        });
        // this.props.dispatch(selectContest(this.state.contest_iid));
        this.props.dispatch(getUsername(this.state.name));
        this.props.dispatch(getOrganizations(this.state.organizations));
        this.props.dispatch(getAccountCode(this.state.code));
      })
      .catch(() => {
        this.setState({ loading: false });
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { data } = this.state;
    return (
      <div className="select-contest-container">
        <span className="title">Cuộc thi&nbsp; </span>
        <Select
          onChange={this.handleClick}
          showSearch
          style={{ width: 430 }}
          placeholder="Chọn cuộc thi"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {data.map((item) => (
            <Option value={item.contest_iid} key={item.contest_iid}>
              {item.contest_name}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(SelectContest);
