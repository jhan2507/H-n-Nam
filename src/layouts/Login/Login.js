import React from 'react';
import { connect } from 'react-redux';
import { logoutAction, setCurrentUser } from '../../actions/user';
import { Redirect, withRouter } from 'react-router-dom';
import { Form, FormGroup, Label } from 'reactstrap';
import { Input } from 'antd';
import './Logintrue.scss';
import Request from '../../common/network/http/Request';
import apiUrls from '../../constants/api';
import routes from '../../constants/routes';
import logo from './images/logo1.png';
import message from 'antd/lib/message';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    data: [],
    loading: true,
    login: false,
    errors: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      data: [],
      loading: true,
      login: false,
      errors: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  validateForm() {
    let errors = {};

    let formIsValid = true;

    if (!this.state.email) {
      formIsValid = false;

      errors['email'] = '*Please enter your email-ID.';
    }

    if (typeof this.state.email !== 'undefined') {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      );

      if (!pattern.test(this.state.email)) {
        formIsValid = false;

        errors['email'] = '*Please enter valid Email.';
      }
    }

    if (!this.state.password) {
      formIsValid = false;

      errors['password'] = '*Please enter your password.';
    }

    if (typeof this.state.password !== 'undefined') {
      if (!this.state.password.match(/^[0-9]+$/)) {
        formIsValid = false;

        errors['password'] = '*Please enter secure and strong password.';
      }
    }

    this.setState({
      errors: errors,
    });

    return formIsValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      const { email, password } = this.state;

      const { dispatch, history } = this.props;

      this.setState({ login: true });
      Request.postLogin(apiUrls.doLogin, { email, password }, {}, 'Loading...')
        .then((result) => {
          if (result.message === 'success') {
            dispatch(setCurrentUser(result.data));
            history.push(routes.home);
            message.success({ content: 'Đăng nhập thành công', duration: 0 });
            setTimeout(() => {
              dispatch(logoutAction());
              history.push(routes.login);
            }, 10800000);
          } else {
            message.error({
              content: 'Tài khoản không tồn tại hoặc sai gmail hoặc mật khẩu',
            });
          }
          this.setState({
            loading: false,
          });
        })
        .catch((err) => {
          this.setState({ loading: false, login: false });
        })
        .finally(() => this.setState({ loading: false, login: false }));
    }
  }

  render() {
    const { user } = this.props;
    if (!!user) {
      return <Redirect to="/" />;
    }
    return (
      <div className="form-login">
        <div className="container-fluid logincon">
          <div className="row">
            <div className="col-md-6 col-sm-12 login-sec" align="center">
              <img src={logo} href="/" />
              <p className="text-login">Đăng nhập</p>
              <Form
                method="post"
                name="userRegistrationForm"
                onSubmit={this.onSubmit}
              >
                <FormGroup className="formGroup" align="left">
                  <Label className="label-login" for="exampleEmail">
                    Email
                  </Label>{' '}
                  <br />
                  <Input
                    type="email"
                    style={{
                      height: '50px',
                      width: '100%',
                      border: '1px solid #979797',
                      boxSizing: 'border-box',
                      borderRadius: '3px',
                    }}
                    name="email"
                    id="exampleEmail"
                    value={this.state.email}
                    onChange={this.handleChangeEmail}
                    placeholder="Email"
                  />
                  <div className="errorMsg">{this.state.errors.email}</div>
                </FormGroup>{' '}
                <FormGroup className="formGroup" align="left">
                  <Label className="label-login" for="examplePassword">
                    Mật khẩu
                  </Label>{' '}
                  <br />
                  <Input.Password
                    style={{
                      height: '50px',
                      width: '100%',
                      border: '1px solid #979797',
                      boxSizing: 'border-box',
                      borderRadius: '3px',
                    }}
                    type="password"
                    name="password"
                    id="examplePassword"
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    placeholder="Mật khẩu"
                  />
                  <div className="errorMsg">{this.state.errors.password}</div>
                </FormGroup>{' '}
                <br />{' '}
                <FormGroup className="formGroup">
                  {this.state.login === true ? (
                    <button type="submit" className="btn-login" disabled>
                      Đăng nhập
                    </button>
                  ) : (
                    <button type="submit" className="btn-login">
                      Đăng nhập
                    </button>
                  )}
                </FormGroup>
              </Form>
            </div>
            <div className="col-md-6 col-sm-12 banner-sec"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  userInfo: state.user.userInfo,
});

export default connect(mapStateToProps)(withRouter(LoginForm));
