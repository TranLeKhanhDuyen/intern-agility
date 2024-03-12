import { locationHelperBuilder } from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/Redirect';

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state: any) => state.user.isLoggedIn,
  wrapperDisplayName: 'UserIsAuthenticated',
  redirectPath: '/login'
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  // Want to redirect the user when they are authenticated
  authenticatedSelector: (state: any) => !state.admin.isLoggedIn,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  redirectPath: (state: any, ownProps: any) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false
});
