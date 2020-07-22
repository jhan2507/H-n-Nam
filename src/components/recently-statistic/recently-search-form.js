import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInputBySearch } from '../../actions/statistic';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

class RecentlySearchForm extends Component {
  onSearch = (event) => {
    event.preventDefault();
    const search = event.target.elements.search.value;
    this.props.dispatch(getInputBySearch(search));
  };

  constructor(props) {
    super(props);
    this.state = {
      countExamTurn: 0,
      search: '',
    };
    this.props.dispatch(getInputBySearch(''));
  }

  render() {
    return (
      <div>
        <form className="search-form" action="" onSubmit={this.onSearch}>
          <Input
            className="txt-input"
            placeholder="Nhập tên, mã, email thí sinh"
            name="search"
          />
          <Button className="button-search" htmlType="submit">
            {' '}
            Tìm kiếm{' '}
          </Button>
        </form>
        {this.props.search === '' ? (
          <div></div>
        ) : (
          <div className="search-total">
            Số bản ghi tìm được với tên/mã "<b>{this.props.search}</b>" là:
            <b> {this.props.countExamTurn.toLocaleString()}</b>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  countExamTurn: state.statistic.countExamTurn,
  search: state.statistic.search,
});
export default connect(mapStateToProps)(RecentlySearchForm);
