import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import UserManage from '../containers/System/UserManage';
// import ProductManage from '../containers/System/ProductManage';
// import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';

interface ISystemProps {
  systemMenuPath: string; // Adjust the type accordingly
}

const System = ({ systemMenuPath }: ISystemProps) => {

  return (
    <div className="system-container">
      <div className="system-list">
        <switch>
          <Route path="/system/user-manage" Component={UserManage} />
        </switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
