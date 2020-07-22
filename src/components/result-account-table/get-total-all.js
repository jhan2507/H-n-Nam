import React, { Component } from 'react';
import Request from '../../common/network/http/Request';
import apiUrls from '../../constants/api';
import get from 'lodash/get';
import { connect } from 'react-redux';

class GetTotalAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      size: 10,
      totalAccount: 0,
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { oid } = this.props;
    if (prevProps.oid !== oid) {
      this.getData();
    }
  }

  getData = () => {
    const { oid } = this.props;
    this.setState({
      loading: true,
      totalAccount: '',
    });
    return Request.get(
      apiUrls.getUserByOrganization,
      {
        input: '',
        index: 1,
        size: 1,
        oid: oid,
      },
      '',
      'Success',
      'Error',
    )
      .then((data) => {
        this.setState({
          loading: false,
          totalAccount: get(data, 'result.total', 0),
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { totalAccount } = this.state;
    return <div className="total-account">{totalAccount.toLocaleString()}</div>;
  }
}

const mapStateToProps = (state) => ({
  oid: state.info.oid,
});
export default connect(mapStateToProps)(GetTotalAll);
