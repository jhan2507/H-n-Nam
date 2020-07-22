import React from 'react';
import { Select } from 'antd';
import './style-recently.scss';
import { types } from '../../constants/statistic';

import { selectType } from '../../actions/statistic/index';
import { connect } from 'react-redux';
import GetTotalExam from './getTotalExam';
import DateTimeSelected from './dateTimeSelected';

const { Option } = Select;

class SelectType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentType: 'day',
    };
    this.props.dispatch(selectType('day'));
  }

  handleClick = (type) => {
    this.props.dispatch(selectType(type));
  };

  render() {
    const { currentType } = this.state;
    return (
      <div className="select-type-month-container">
        <span className="title-recently">
          Số thí sinh đã tham gia trong&nbsp;
          <Select
            className="type"
            defaultValue={currentType}
            onChange={this.handleClick}
            size="large"
            style={{ width: 300 }}
          >
            {types.map(({ name, value }) => (
              <Option value={value} key={value}>
                {name}
              </Option>
            ))}
          </Select>
          &nbsp;là:
          <span>
            <GetTotalExam />
          </span>
        </span>
        <div>
          {this.props.currentType === 'fromto' ? (
            <div>
              <DateTimeSelected />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentType: state.statistic.currentType,
});

export default connect(mapStateToProps)(SelectType);
