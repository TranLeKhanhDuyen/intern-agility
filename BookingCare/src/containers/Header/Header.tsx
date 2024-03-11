import React from 'react';
import { connect } from 'react-redux';
import Navigator from '@components/Navigator/index';
import { adminMenu } from './menuApp';

import './Header.css';

interface INavigatorProps {
  menus: {
    name: string;
    menus: {
      name: string;
      subMenus: {
        name: string;
        link: string;
      }[];
    }[];
  }[];
}

interface IlistNavigatorProps {
  items: INavigatorProps[]
}

const Header = ({items}: IlistNavigatorProps) => {
  return (
    <div className="header-container">
      <div className="header-tabs-container">
      <Navigator menus={adminMenu} />
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

export default connect(mapStateToProps)(Header);
