import React from 'react';
import 'antd/dist/antd.css';
import './SideMenu.scss';
import { Menu } from 'antd';
import {
  AreaChartOutlined,
  FileDoneOutlined,
  SwapRightOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logowhite from './images/logo-white1.png';
import routes from '../../constants/routes';
import { withRouter } from 'react-router';

const { SubMenu } = Menu;

class MenuSide extends React.Component {
  render() {
    return (
      <div className="side-menu">
        <div className="logo-white" align="center">
          <Link to={routes.home}>
            <img className="logo-img" src={logowhite} alt={''} />
          </Link>
        </div>
        <Menu
          onClick={this.handleClick}
          className="side-menu-bar"
          mode="inline"
          defaultSelectedKeys={this.props.location.pathname}
          defaultOpenKeys={['sub1']}
        >
          <SubMenu
            className="subme"
            key="sub1"
            icon={<AreaChartOutlined className="iconme" />}
            title={<span className="spanme">Thống kê</span>}
          >
            <Menu.Item className="itemme" key={routes.generalStatistic}>
              <SwapRightOutlined
                className="iconme"
                style={{ marginLeft: '-20px' }}
              />
              <Link className="link-menuitem" to={routes.generalStatistic}>
                Thống kê chung
              </Link>
            </Menu.Item>
            <Menu.Item className="itemme" key={routes.recentlyStatistic}>
              <SwapRightOutlined
                className="iconme"
                style={{ marginLeft: '-20px' }}
              />
              <Link className="link-menuitem" to={routes.recentlyStatistic}>
                Thí sinh đã thi gần đây
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            className="subme"
            key="sub2"
            icon={<FileDoneOutlined className="iconme" />}
            title={<span className="spanme">Kết quả thi</span>}
          >
            <Menu.Item className="itemme" key={routes.getAccount}>
              <SwapRightOutlined
                className="iconme"
                style={{ marginLeft: '-20px' }}
              />
              <Link className="link-menuitem" to={routes.getAccount}>
                Thí sinh
              </Link>
            </Menu.Item>
            <Menu.Item className="itemme" key={routes.resultTable}>
              <SwapRightOutlined
                className="iconme"
                style={{ marginLeft: '-20px' }}
              />
              <Link className="link-menuitem" to={routes.resultTable}>
                Bài luận
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default withRouter(MenuSide);
