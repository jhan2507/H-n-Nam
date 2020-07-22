import React, { Component } from 'react';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { connect } from 'react-redux';
import { getInput } from '../../actions/info';

class SearchForm extends Component {
  onSearch = (event) => {
    event.preventDefault();
    const input = event.target.elements.input.value;
    this.props.dispatch(getInput(input));
  };

  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      input: '',
    };
  }

  render() {
    return (
      <div className="search-text-form">
        <div className="text">Tìm kiếm thí sinh:</div>
        <form className="input-component" action="" onSubmit={this.onSearch}>
          <Input
            className="txt-input"
            placeholder="Nhập tên, mã, email thí sinh"
            name="input"
          />
          <Button className="button-search" htmlType="submit">
            Tìm kiếm
          </Button>
        </form>
        {this.props.input === '' ? (
          <div />
        ) : (
          <div className="search-total">
            Số bản ghi tìm được với tên/mã/email "<b>{this.props.input}</b>" là:
            <b> {this.props.total.toLocaleString()}</b>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  total: state.info.total,
  input: state.info.input,
});
export default connect(mapStateToProps)(SearchForm);
