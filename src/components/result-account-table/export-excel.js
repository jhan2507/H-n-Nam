import React, { Component } from 'react';
import Request from '../../common/network/http/Request';
import { connect } from 'react-redux';
import DownloadOutlined from '@ant-design/icons/lib/icons/DownloadOutlined';
import Button from 'antd/lib/button';
import apiUrl from '../../constants/api';
import get from 'lodash/get';

class ExportExcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({ loading: true });
    return Request.get(
      apiUrl.exportResultByName,
      {},
      'Waiting....',
      'Success',
      'Error',
    )
      .then((data) => {
        this.setState({
          loading: false,
          url: get(data, 'downloadExcelUrl', ''),
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

  render() {
    return (
      <Button
        icon={<DownloadOutlined />}
        size="large"
        type="button"
        href={this.state.url}
      >
        Xuất excel
      </Button>
    );
  }
}

const mapStateToProps = (state) => ({
  // input: state.info.input,
});
export default connect(mapStateToProps)(ExportExcel);
