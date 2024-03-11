 import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface IUserManageProps {
  // Define any props if needed
}


const UserManage: React.FC<IUserManageProps> = () => {
  useEffect(() => {
    // Add any logic needed when the component mounts
  }, []);


    return (
      <div>
        <div className="text-center">Manage users</div>
        <div className='users-container'>
          <div className='title'>Manage users </div>
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
