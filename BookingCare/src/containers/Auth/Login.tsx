import { ChangeEvent, useState } from 'react';
import './Login.css';
import handleLoginAPi from '../../services/userService';
import { Dispatch } from 'redux';
import { userLoginSuccess } from '@src/stores/actions/userAction';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../stores/actions'

interface ILoginProps {
  userLoginSuccess: (userInfo: string) => void;
}

interface ILoginState {
  username: string;
  password: string;
  isShowPassword: boolean;
  errMessage: string,
}


const Login: React.FC<ILoginProps> = (props) => {
  const [state, setState] = useState<ILoginState>({
    username: '',
    password: '',
    isShowPassword: false,
    errMessage: '',
  });

  const handleOnChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      username: event.target.value
    });
  };

  const handleOnChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      password: event.target.value
    });
  };

  const handleLogin = async () => {
    setState({
      ...state,
      errMessage: '' // clear error code
    });

    try {
      const response = await handleLoginAPi(state.username, state.password);
      const data: { errCode: number; message: string; user: any } = response.data; // access data property
      console.log("check data:", data);

      if (data && data.errCode !== 0) {
        setState({
          ...state,
          errMessage: data.message
        });
      }
      if (data && data.errCode === 0) {
        props.userLoginSuccess(data.user)
        console.log(userLoginSuccess)
        console.log("Login successfully");
      }

    } catch (error: any) {
      if (error.response && error.response.data) {
        setState({
          ...state,
          errMessage: error.response.data.message
        });
      }
      console.log("Error during login:", error);
    }
  };

  const handleShowHidePassword = () => {
    setState({
      ...state,
      isShowPassword: !state.isShowPassword
    });
  };

  return (
    <>
      <div className='login-background'>
        <div className='login-container'>
          <div className='login-content '>
            <div className='login-title text-5xl text-bold'>Login</div>
            <div className='form-input'>
              <label>Username</label>
              <input
                type='text'
                className='username text-field'
                placeholder='Enter your username'
                value={state.username}
                onChange={(event) => handleOnChangeUsername(event)}
              />
              <label>Password</label>
              <div className='password-container'>
                <input
                  className='password text-field'
                  type={state.isShowPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  value={state.password}
                  onChange={(event) => handleOnChangePassword(event)}
                />
                <span
                  className={`eye cursor ${state.isShowPassword ? 'hide-eye' : 'show-eye'
                    }`}
                  onClick={handleShowHidePassword}
                ></span>
              </div>
            </div>

            <div className="col-12" style={{ color: "red" }}>
              {state.errMessage}
            </div>

            <button
              className='login-button text-bold cursor'
              onClick={handleLogin}
            >
              Login
            </button>
            <span className='forgot-password'>Forgot your password?</span>
            <span className='option-text'>Or Login with: </span>
            <div className='afternative-login'>
              <a href='#' className='login-google'></a>
              <a href='#' className='login-facebook'></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispactchToProps = (dispatch: Dispatch) => {
  return {
    navigate: (path: string) => dispatch(push(path)),
    userLoginSuccess: (userInfo: any) => dispatch(actions.userLoginSuccess(userInfo))
  }
}

export default connect(mapDispactchToProps)(Login)
