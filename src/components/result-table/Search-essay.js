import React, { Component } from 'react';
import { Button, Input, Select } from 'antd';
import './style.scss';
import {
  searchContestCode,
  searchEssay,
  searchExam,
} from '../../actions/essay';
import { connect } from 'react-redux';
import Request from '../../common/network/http/Request';
import apiUrls from '../../constants/api';
import get from 'lodash/get';

class SearchEssay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataContest: [],
      loading: true,
      totalEssay: 0,
      dataExam: [],
    };
    this.props.dispatch(searchEssay(''));
    this.props.dispatch(searchExam('~'));
    this.props.dispatch(searchContestCode('~'));
  }

  onSearch = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const { exam } = this.state;
    this.props.dispatch(searchEssay(name));
    this.props.dispatch(searchExam(exam));
  };

  componentDidMount() {
    this.getData();
    this.getData1();
  }

  handleChangeContest = (contest_code) => {
    this.props.dispatch(searchContestCode(contest_code));
  };

  getData = () => {
    return Request.getAllTotal(
      apiUrls.searchContest,
      {},
      'Loading...',
      'Success',
      'Error',
    )
      .then((dataContest) => {
        this.setState({
          dataContest: get(dataContest, 'result', []),
          loading: false,
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      })
      .finally(() => this.setState({ loading: false }));
  };

  handleChangeExam = (exam_code) => {
    this.setState({ exam: exam_code });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { contest_code } = this.props;
    if (prevProps.contest_code !== contest_code) {
      this.getData1();
    }
  }

  getData1 = () => {
    const { contest_code } = this.props;
    return Request.getAllTotal(
      apiUrls.searchExam,
      {
        contest_code: contest_code,
      },
      'Loading...',
      'Success',
      'Error',
    )
      .then((dataExam) => {
        this.setState({
          dataExam: get(dataExam, 'result', []),
          loading: false,
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { Option } = Select;
    const { dataContest, dataExam } = this.state;
    return (
      <div className="search-container ">
        <form onSubmit={this.onSearch}>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="row">
                <div className="form-group mt-20 col-xs-4 col-sm-4 col-md-4 col-lg-4 ">
                  <div className="title-essay-total">Tìm kiếm:</div>
                  <Input
                    placeholder="Nhập tên/mã thí sinh/email ..."
                    name="name"
                  />
                </div>

                <div className="form-group mt-20 col-xs-5 col-sm-5 col-md-5 col-lg-5  ">
                  <div className="title-essay-total">Cuộc thi:</div>
                  <Select
                    onChange={this.handleChangeContest}
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Cuộc thi ..."
                    optionFilterProp="children"
                    defaultActiveFirstOption="false"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    defaultValue="~"
                  >
                    <Option value="~" key="0">
                      Tất cả cuộc thi
                    </Option>
                    {dataContest.map((item) => (
                      <Option value={item.code} key={item.code}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="form-group mt-20 col-xs-3 col-sm-3 col-md-3 col-lg-3">
                  <div className="title-essay-total">Môn thi: </div>
                  <Select
                    onChange={this.handleChangeExam}
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Môn thi ..."
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    defaultValue="~"
                  >
                    <Option value="~" key="0">
                      Tất cả môn thi
                    </Option>
                    {dataExam.map((item) => (
                      <Option value={item.code} key={item.code}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <div className="form-group mr-10 ">
                <div className="title-essay-total">
                  Số thí sinh có bài tự luận theo môn thi và cuộc thi:&ensp;
                  <label
                    style={{
                      color: 'red',
                      fontSize: '18px',
                    }}
                  >
                    <b>{this.props.totalEssay.toLocaleString('en')}</b>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <div className="text-center search ">
                <Button htmlType="submit">Tìm kiếm</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchValue: state.essay.username,
  totalEssay: state.essay.totalEssay,
  contest_code: state.essay.contest_code,
  exam_code: state.essay.exam_code,
});
export default connect(mapStateToProps)(SearchEssay);
