import React from 'react';
import SelectType from './select-type';
import './style-recently.scss';
import Request from '../../common/network/http/Request';
import apiUrl from '../../constants/api';
import { connect } from 'react-redux';
import DownloadOutlined from '@ant-design/icons/lib/icons/DownloadOutlined';
import Button from 'antd/lib/button';
import get from 'lodash/get';
import RecentlySearchForm from './recently-search-form';
import RecentlyTable from './recently-table';

class IndexRecently extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.getDataSave();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentType !== this.props.currentType) {
      this.getDataSave();
    }
  }

  getDataSave = () => {
    this.setState({ loading: true });
    return Request.getAllTotal(
      apiUrl.getDataSave,
      {
        type: this.props.currentType,
      },
      'Waiting....',
      'Success',
      'Error',
    )
      .then((data) => {
        this.setState({
          loading: false,
          url: get(data, 'link', ''),
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
      <div className="recently-container">
        <div className="title-page">THỐNG KÊ THÍ SINH ĐÃ THI GẦN ĐÂY</div>
        <div className="row">
          <div className="container-fluid">
            <SelectType />
            <div className="recently-form-search">
              <RecentlySearchForm />
            </div>
            <div className="col" id="row-table-recently">
              <RecentlyTable />
            </div>
            <div className="button-export">
              <Button
                type="button"
                href={this.state.url}
                icon={<DownloadOutlined />}
                size="large"
              >
                Xuất excel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentType: state.statistic.currentType,
});

export default connect(mapStateToProps)(IndexRecently);
