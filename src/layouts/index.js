import React from 'react';
import 'antd/dist/antd.css';
import './style.scss';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import routes from '../constants/routes';
import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import SideMenu from './SideMenu';
import PopoverMenu from './PopoverMenu';

const { Header, Sider, Content } = Layout;

class LayoutAll extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { route, location, userInfo } = this.props;
    if (isEmpty(userInfo) && location.pathname !== routes.login) {
      return <Redirect to={routes.login} />;
    }
    return (
      <>
        <div align="center" className="notification">
          Trang Web này không khả dụng với giao diện điện thoại bạn vui lòng tải
          ứng dụng sau:
          <a
            className="notification-link"
            href="https://apps.apple.com/vn/app/vinschool-teachers/id1275338591?l=v"
          >
            https://apps.apple.com/vn/app/vinschool-teachers/id1275338591?l=v
          </a>
        </div>
        <Layout className="layoutall">
          {location.pathname !== routes.login ? (
            <>
              <Sider
                className={this.state.collapsed ? 'unsider' : 'sider'}
                trigger={null}
                collapsedWidth="0"
                collapsible
                collapsed={this.state.collapsed}
              >
                <SideMenu />
              </Sider>
            </>
          ) : null}
          <Layout
            className={this.state.collapsed ? 'unsite-layout' : 'site-layout'}
          >
            {location.pathname !== routes.login ? (
              <>
                <Header
                  className="head-style"
                  style={{
                    padding: 0,
                    height: '40px',
                    display: 'flex',
                    backgroundColor: '#fff',
                    position: 'fixed',
                  }}
                  id="head"
                >
                  {React.createElement(
                    this.state.collapsed
                      ? MenuUnfoldOutlined
                      : MenuFoldOutlined,
                    {
                      className: 'trigger',
                      onClick: this.toggle,
                    },
                  )}
                  <div className="spacer" />
                  <div
                    className={
                      this.state.collapsed ? 'unpopover-menu' : 'popover-menu'
                    }
                  >
                    <PopoverMenu />
                  </div>
                </Header>
              </>
            ) : null}

            {location.pathname !== routes.login ? (
              <Content
                className="site-layout-background content-class"
                style={{
                  padding: '64px 24px 0 24px',
                  backgroundColor: '#E5E5E5',
                }}
              >
                {renderRoutes(route.routes)}
              </Content>
            ) : (
              <Content
                className={
                  this.state.collapsed ? 'uncontentlogin' : 'contentlogin'
                }
              >
                {renderRoutes(route.routes)}
              </Content>
            )}
          </Layout>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = (state, props) => ({
  userInfo: state.user.userInfo,
});

export default connect(mapStateToProps)(LayoutAll);
