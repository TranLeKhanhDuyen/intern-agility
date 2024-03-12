 import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface IUserManageProps {
}


const UserManage: React.FC<IUserManageProps> = () => {
  useEffect(() => {
  }, []);


    return (
      <div>
        <div className="text-center">Manage users</div>
        <div className='users-container'>
          <div className='title'>Manage users </div>
          <div className='table'>
            
          </div>
        </div>

      </div>
    );

}

const mapStateToProps = (state: any) => {
  return {
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
