import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

interface IHomeProps {
  isLoggedIn: boolean;
}

const Home= ({ isLoggedIn }: IHomeProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const linkToRedirect = isLoggedIn ? "/system/user-manage" : "/login";
    navigate(linkToRedirect);
  }, [isLoggedIn, navigate]);

  return null;
};

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Home);

