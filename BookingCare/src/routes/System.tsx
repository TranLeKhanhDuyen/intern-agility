import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import UserManage from '../containers/System/UserManage';
// import ProductManage from '../containers/System/ProductManage';
// import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';

interface SystemProps {
  systemMenuPath: string; // Adjust the type accordingly
}

const System: React.FC<SystemProps> = ({ systemMenuPath }) => {
  return (
    <div className="system-container">
      <div className="system-list">
        <switch>
          <Route path="/system/user-manage" Component={UserManage} />
          {/* <Route path="/system/product-manage" component={ProductManage} /> */}
          {/* <Route
            path="/system/register-package-group-or-account"
            component={RegisterPackageGroupOrAcc}
          /> */}
          {/* <Route Component={() => <Redirect to={systemMenuPath} />} /> */}
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
