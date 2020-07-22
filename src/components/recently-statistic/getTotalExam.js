import React, { Component } from 'react';
import Request from '../../common/network/http/Request';
import apiUrl from '../../constants/api';
import get from 'lodash/get';
import { connect } from 'react-redux';
class GetTotalExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      pageIndex: 1,
      pageSize: 1,
      totalSize: 0,
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentType } = this.props;
    if (prevProps.currentType !== currentType) {
      this.getData();
    }
  }

  getData() {
    const { currentType } = this.props;
    this.setState({
      loading: true,
      totalSize: '',
    });
    return Request.get(
      apiUrl.getByTime,
      {
        search: '',
        index: 1,
        size: 1,
        type: currentType,
      },
      '',
      'Success',
      'Error',
    )
      .then((data) => {
        this.setState({
          loading: false,
          totalSize: get(data, 'totalSize', 0),
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { totalSize } = this.state;
    return <b>{' ' + totalSize.toLocaleString()}</b>;
  }
}
const mapStateToProps = (state) => ({
  currentType: state.statistic.currentType,
});
export default connect(mapStateToProps)(GetTotalExam);
