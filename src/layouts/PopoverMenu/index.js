import React from 'react';
import { Link } from 'react-router-dom';
import Popover from 'antd/lib/popover';
import Avatar from 'antd/lib/avatar';
import AntMenu from 'antd/lib/menu';
import LogoutOutlined from '@ant-design/icons/lib/icons/LogoutOutlined';
import { DownOutlined } from '@ant-design/icons';
import './style.scss';
import routes from '../../constants/routes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logoutAction } from '../../actions/user';
import { message } from 'antd';

class PopoverMenu extends React.Component {
  render() {
    const { history, dispatch, userInfo } = this.props;

    let roleorga;

    if (userInfo) {
      if (userInfo.role === 'admin') {
        roleorga = userInfo.name + ' (' + userInfo.role + ')';
      } else {
        roleorga = userInfo.name;
      }
    }

    return (
      <Popover
        content={
          <AntMenu>
            <AntMenu.Item key="account">
              <Link className="popover-antmenuitem" to={routes.home}>
                Tài khoản
              </Link>
            </AntMenu.Item>

            <AntMenu.Item key="admin">
              <Link className="popover-antmenuitem" to={routes.home}>
                Quản trị hệ thống
              </Link>
            </AntMenu.Item>
            <AntMenu.Item
              key="logout"
              onClick={() => {
                dispatch(logoutAction());
                history.push(routes.login);
                message.success('Đăng xuất thành công');
              }}
              icon={<LogoutOutlined />}
            >
              Đăng xuất
            </AntMenu.Item>
          </AntMenu>
        }
        trigger="click"
        placement="bottomRight"
        className="popover-class"
      >
        <div className="info-admin">
          <Avatar
            style={{ height: '30px', width: '30px' }}
            src="https://vsc-api.lotuslms.com/ufiles/2020/04/5df21af06ddb5e7ce61f8a83/5e880b10f8724009d04160d6.png"
          />
          &emsp;
          <b
            style={{
              maxHeight: '35px',
              fontSize: '12px',
              marginTop: '-18px',
              fontFamily: 'Google Sans',
            }}
          >
            {roleorga}
          </b>
          &emsp;
          <DownOutlined
            style={{
              paddingTop: '9px',
              // maxHeight: '40px',
              fontSize: '11px',
              width: '10.5px',
              height: '6px',
              cursor: 'pointer',
            }}
          />
        </div>
      </Popover>
    );
  }
}

const mapStateToProps = (state, props) => ({
  userInfo: state.user.userInfo,
});

export default connect(mapStateToProps)(withRouter(PopoverMenu));
