import React from 'react';
import { Select } from 'antd';
import Request from '../../common/network/http/Request';
import apiUrls from '../../constants/api';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { selectOrg } from '../../actions/info';
import GetTotalAll from './get-total-all';

const { Option } = Select;

class SelectType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAccount: 0,
      data: [],
      loading: true,
      total: 0,
    };
    this.props.dispatch(selectOrg(0));
  }

  handleClick = (oid) => {
    this.props.dispatch(selectOrg(oid));
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    return Request.get(apiUrls.getOrganization, {}, 'Loading...', 'Success')
      .then((data) =>
        this.setState({
          data: get(data, 'result.organizations', []),
          loading: false,
        }),
      )
      .catch(() => {
        this.setState({ loading: false });
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { data } = this.state;
    return (
      <div className="select-type-container">
        <b>
          <div className="select-type-body">
            <div className="title">
              Tổng số thí sinh của &nbsp;
              <Select
                onChange={this.handleClick}
                style={{ width: 300 }}
                showSearch
                placeholder="Chọn đơn vị"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                defaultValue="0"
                className="title"
              >
                <Option value="0" key="0">
                  Tất cả các đơn vị
                </Option>
                {data.map((item) => (
                  <Option value={item.oid} key={item.oid}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              &nbsp;là:
              <div>
                <GetTotalAll />
              </div>
            </div>
          </div>
        </b>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  total: state.info.total,
});

export default connect(mapStateToProps)(SelectType);
