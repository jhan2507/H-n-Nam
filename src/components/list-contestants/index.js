import React from 'react';
import './style-list-contestants.scss';
import ListContestantsSearch from './list-contestants-search';
import ContestantTable from './contestant-table';
import get from 'lodash/get';
import routes from '../../constants/routes';
import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

class ListContestant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    const { match } = this.props;
    let selectedMonth = get(match, 'params.month', '');
    const pattern = /^[0-9\b]+$/;
    if (!selectedMonth.match(pattern)) {
      return <Redirect to="/general-statistic" />;
    } else {
      selectedMonth = parseInt(selectedMonth);
      if (selectedMonth < 1 || selectedMonth > 12) {
        return <div className="containers">Vui lòng nhập tháng từ 1 ->12 </div>;
      } else {
        return (
          <div className="list-contestant-container">
            <div className="title-page">
              THỐNG KÊ SỐ THÍ SINH THI TRONG THÁNG {selectedMonth}
            </div>
            <div className="row">
              <div className="container-fluid">
                <div className="back-button">
                  <Link style={{ color: 'black' }} to={routes.generalStatistic}>
                    <ArrowLeftOutlined />{' '}
                  </Link>
                </div>
                <div className="list-contestant-form-search">
                  <ListContestantsSearch />
                </div>
                <div className="col" id="row-table-list-contestant">
                  <ContestantTable selectedMonth={selectedMonth} />
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = (state) => ({
  currentMonth: state.statistic.currentMonth,
});

export default connect(mapStateToProps)(ListContestant);
