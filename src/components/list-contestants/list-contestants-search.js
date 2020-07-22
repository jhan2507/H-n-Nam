import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchByContestants } from '../../actions/statistic';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import './style-list-contestants.scss';

class ListContestantsSearch extends Component {
  onSearch = (event) => {
    event.preventDefault();
    const searchContestant = event.target.elements.searchContestant.value;
    this.props.dispatch(searchByContestants(searchContestant));
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedMonth: 0,
      searchContestant: '',
      countContestant: 0,
    };
    this.props.dispatch(searchByContestants(''));
  }

  render() {
    return (
      <div>
        <form className="search-form" action="" onSubmit={this.onSearch}>
          <Input
            className="txt-input"
            placeholder="Nhập tên, mã, email thí sinh"
            name="searchContestant"
          />
          <Button className="button-search" htmlType="submit">
            {' '}
            Tìm kiếm{' '}
          </Button>
        </form>
        {this.props.searchContestant === '' ? (
          <div />
        ) : (
          <div className="search-total">
            Số bản ghi tìm được với tên/mã "<b>{this.props.searchContestant}</b>
            " là:
            <b> {this.props.countContestant.toLocaleString()}</b>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchContestant: state.statistic.searchContestant,
  countContestant: state.statistic.countContestant,
});
export default connect(mapStateToProps)(ListContestantsSearch);
