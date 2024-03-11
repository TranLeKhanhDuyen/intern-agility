import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';

interface HomeProps {
  isLoggedIn: boolean;
}

const Home = ({ isLoggedIn }: HomeProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const linkToRedirect = isLoggedIn ? '/system/user-manage' : '/login';
    navigate(linkToRedirect);

    // return () => linkToRedirect;
  }, [isLoggedIn, navigate]);
  // }, [isLoggedIn, navigate]);

  return <div>Redirecting...</div>;
};

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.admin.isLoggedIn,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
