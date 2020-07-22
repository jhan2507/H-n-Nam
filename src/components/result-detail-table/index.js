import React from 'react';
import './style.scss';
import ResultTable from './result-table';
import SelectCotest from './select-cotest';
import get from 'lodash/get';
import { connect } from 'react-redux';
import routes from '../../constants/routes';
import { Link } from 'react-router-dom';
import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined';

class IndexResultDetail extends React.Component {
  render() {
    const { match, name, organizations, code } = this.props;
    const userId = get(match, 'params.id', '');
    return (
      <div className="result-container">
        <div className="title-page">ĐIỂM THI CHI TIẾT TỪNG MÔN</div>
        <div className="row">
          <div className="container-fluid">
            <div className="info-form">
              <Link to={routes.getAccount}>
                <ArrowLeftOutlined />
              </Link>
              <div className="info-text">
                <div className="info">
                  <span className="info-name">
                    Tên thí sinh: <b>{name}</b>
                  </span>
                  <span className="info-code">
                    Mã thí sinh: <b>{code}</b>
                  </span>
                </div>
                Đơn vị: <b>{organizations}</b>
              </div>
            </div>
            <div className="select-component">
              <SelectCotest userId={userId} />
            </div>

            <div className="col" id="antd-table">
              <ResultTable userId={userId} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.info.name,
  organizations: state.info.organizations,
  code: state.info.code,
});
export default connect(mapStateToProps)(IndexResultDetail);
