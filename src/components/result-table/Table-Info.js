import React, { Component } from 'react';
import { Table, Modal } from 'antd';
import { Link } from 'react-router-dom';
import Request from '../../common/network/http/Request';
import apiUrl from '../../constants/api';
import get from 'lodash/get';
import { connect } from 'react-redux';
import './style.scss';
import { searchTotalEssay } from '../../actions/essay';
import apiUrls from '../../constants/api';

class TableInfo extends Component {
  columns = [
    {
      title: 'Mã thí sinh',
      dataIndex: 'user_code',
      key: 'user_code',
    },
    {
      title: 'Tên thí sinh',
      dataIndex: 'user_name',
      key: ' user_name',
      render: (data, item) => (
        <div style={{ float: 'left', fontSize: '14px' }}>{item.user_name}</div>
      ),
    },
    {
      title: 'Cuộc thi',
      dataIndex: 'contest_name',
      key: 'contest_name',
      render: (data, item) => (
        <div style={{ float: 'left', fontSize: '14px' }}>
          {item.contest_name}
        </div>
      ),
    },
    {
      title: 'Môn thi',
      dataIndex: 'exam_round_name',
      key: 'exam_round_name',
    },
    {
      title: 'Điểm',
      dataIndex: 'score',
      key: 'score',
      render: (data, item) => (
        <div className="table-number">
          {item.score === 0 && item.total_score === 0 ? (
            <i style={{ color: 'red', float: 'left' }}>Chưa có</i>
          ) : (
            item.score + '/' + item.total_score
          )}
        </div>
      ),
    },
    {
      title: 'Bài tự luận',
      dataIndex: 'exam_round_code',
      key: 'exam_round_code',
      render: ({}, item) => (
        <Link onClick={() => this.showModal(item)}>{'Chi tiết'}</Link>
      ),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      total: 0,
      visible: false,
      data1: [],
    };
    this.props.dispatch(searchTotalEssay(''));
  }

  componentDidMount = () => {
    this.getData();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { username, contest_code, exam_code } = this.props;
    if (
      prevProps.username !== username ||
      prevProps.contest_code !== contest_code ||
      prevProps.exam_code !== exam_code
    ) {
      this.getData(this.state.page, this.state.pageSize);
    }
  }

  getData = (page = 1, pageSize = 10) => {
    const { username, contest_code, exam_code } = this.props;
    this.setState({ loading: true });
    this.props.dispatch(searchTotalEssay(''));
    return Request.post(
      apiUrl.getEssayInfo,
      {
        page,
        pageSize,
        searchString: username,
        contest: contest_code,
        exam_round: exam_code,
      },
      {},
      'Loading...',
      'Success',
      'Error',
    )
      .then((data) => {
        this.setState({
          data: get(data, 'result', []),
          loading: false,
          total: get(data, 'total', 0),
          user_name: get(data, 'result.user_name', {}),
        });
        this.props.dispatch(searchTotalEssay(this.state.total));
      })
      .catch(() => {
        this.setState({ loading: false });
      })
      .finally(() => this.setState({ loading: false }));
  };

  showModal = (item) => {
    this.setState({
      visible: true,
    });
    this.getDataView(item.user_code, item.exam_round_code);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.getDataView('', '');
  };

  getDataView = (userCode, examCode) => {
    return Request.post(
      apiUrls.viewEssay,
      {
        userId: userCode,
        examId: examCode,
      },
      {},
      'Loading...',
      'Success',
      'Error',
    )
      .then((data1) => {
        this.setState({
          data1: get(data1, 'result', []),
          loading: false,
          examName: get(data1, 'result.0.exam_name', ''),
          contestName: get(data1, 'result.0.contest_name', ''),
          userName: get(data1, 'result.0.user_name', ''),
          userCode: get(data1, 'result.0.user_code', ''),
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const {
      data,
      loading,
      total,
      page,
      data1,
      examName,
      contestName,
      userName,
      userCode,
    } = this.state;
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={data}
          loading={loading}
          bordered
          rowKey="user_code"
          pagination={{
            current: page,
            total,
            onChange: (page, pageSize) => {
              this.setState({
                page,
                pageSize,
              });
              this.getData(page, pageSize);
            },
          }}
          locale={{
            emptyText: this.props.contest ? (
              ''
            ) : (
              <div className="text-center" style={{ fontSize: '16px' }}>
                Không có thí sinh nào có bài luận
              </div>
            ),
          }}
        />
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          className="container modal-style"
        >
          <div className="container view-detail">
            <div className="row mt-20">
              <br />
              <br />
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div
                  className="col-xs-5 col-sm-5 col-md-5 col-lg-5"
                  style={{ float: 'left' }}
                >
                  <h5 style={{ color: 'black' }}>
                    Tên thí sinh:&ensp;{userName}
                  </h5>
                </div>
                <div
                  className="col-xs-7 col-sm-7 col-md-7 col-lg-7"
                  style={{ float: 'left' }}
                >
                  <h5 style={{ color: 'black' }}>
                    Mã thí sinh:&ensp;{userCode}
                  </h5>
                </div>
              </div>
              <br />
              <br />

              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                <div>
                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 fl-l-detail">
                    <h6 style={{ color: 'black' }}>Môn thi:&ensp;{examName}</h6>
                  </div>

                  <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 fl-l-detail">
                    <h6 style={{ color: 'black' }}>
                      Cuộc thi:&ensp;{contestName}
                    </h6>
                  </div>
                </div>
                <br />
                <hr />
              </div>

              <div className="container detail-essay">
                {data1.map((q) => (
                  <div className="essay-detail">
                    <strong>Câu hỏi :</strong>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: q.question,
                      }}
                    />
                    <div className="answer-detail">
                      <strong>Câu trả lời: </strong>
                      <br />
                      <div>
                        {q.answer === null ? (
                          <i style={{ color: 'red', fontSize: '16px' }}>
                            (Thí sinh không có câu trả lời)
                          </i>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: q.answer,
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <br />
                    <br />
                  </div>
                ))}
              </div>
            </div>
            <br />
            <br />
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.essay.username,
    totalEssay: state.essay.totalEssay,
    exam_code: state.essay.exam_code,
    contest_code: state.essay.contest_code,
  };
};
export default connect(mapStateToProps)(TableInfo);
