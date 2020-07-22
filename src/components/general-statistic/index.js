import React from 'react';
import SelectMonth from './select-month';
import PieCharts from './pie-chart';
import './style-general.scss';
import PieChart3 from './pie-chart-3';
import TableData from './table-data';

class IndexGeneral extends React.Component {
  render() {
    return (
      <div className="general-container">
        <div className="row">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <SelectMonth />
              </div>
            </div>
            <div className="row" id="row-chart">
              <div className="col" id="pie">
                <PieCharts />
              </div>
              <div className="col " id="pie">
                <PieChart3 />
              </div>
            </div>
            <div className="col" id="row-table">
              <TableData />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexGeneral;
