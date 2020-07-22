import React, { Component } from 'react';
import TableInfo from './Table-Info';
import SearchEssay from './Search-essay';
import './style.scss';
import ExportExcel from './export-excel';

class Table extends Component {
  render() {
    return (
      <div className="essay-container">
        <h3 style={{ color: '#544d76' }}>DANH SÁCH THÍ SINH CÓ BÀI THI LUẬN</h3>
        <br />
        <div className="container-fluid">
          <div className="text-center">
            <div className="body">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <SearchEssay />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div>
                  <TableInfo />
                  <ExportExcel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
