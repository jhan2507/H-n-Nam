import React, { Component } from 'react';
import { Button } from 'antd';
import DownloadOutlined from '@ant-design/icons/lib/icons/DownloadOutlined';
import './style.scss';
import Request from '../../common/network/http/Request';
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
    this.exportExcel();
  }

  exportExcel = () => {
    this.setState({ loading: true });
    return Request.getAllTotal(
      apiUrl.exportExcel,
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
      <div className="export-excel">
        <Button
          className="excel"
          href={this.state.url}
          icon={<DownloadOutlined />}
        >
          Xuất excel
        </Button>
      </div>
    );
  }
}
export default ExportExcel;
