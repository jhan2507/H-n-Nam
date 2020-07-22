import ResultTable from './result-table';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectType from './select-type';
import './style-account.scss';
import SearchForm from './search-form';
import ExportExcel from './export-excel';

class IndexDetailResult extends Component {
  render() {
    return (
      <div className="account-container">
        <div className="title-page">THÍ SINH THEO TỪNG ĐƠN VỊ</div>
        <div className="row">
          <div className="container-fluid">
            <div className="form-search">
              <SelectType />
              <SearchForm />
            </div>
            <div className="table-col" id="antd-table">
              <ResultTable />
            </div>
            <div className="export-button">
              <ExportExcel />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(IndexDetailResult);
