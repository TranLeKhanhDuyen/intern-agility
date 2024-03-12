// import { locationHelperBuilder } from 'redux-auth-wrapper/history3/locationHelperBuilder';
// import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/Redirect';

// const locationHelper = locationHelperBuilder();

// export const userIsAuthenticated = connectedRouterRedirect({
//   authenticatedSelector: (state: any) => state.user.isLoggedIn,
//   wrapperDisplayName: 'UserIsAuthenticated',
//   redirectPath: '/login'
// });

// export const userIsNotAuthenticated = connectedRouterRedirect({
//   authenticatedSelector: (state: any) => !state.admin.isLoggedIn,
//   wrapperDisplayName: 'UserIsNotAuthenticated',
//   redirectPath: (state: any, ownProps: any) =>
//     locationHelper.getRedirectQueryParam(ownProps) || '/',
//   allowRedirectBack: false
// });
