/* Handle use-query-params  
source : https://github.com/alexluong/gatsby-packages/issues/41#issuecomment-1006873657 */

import React from "react";
import { navigate } from "gatsby";
import { QueryParamProvider } from "use-query-params";

const generatePath = (location) => {
  return location.pathname + location.search;
};

const history = {
  push: (location) => {
    navigate(generatePath(location), { replace: false, state: location.state });
  },
  replace: (location) => {
    navigate(generatePath(location), { replace: true, state: location.state });
  },
};

// Wrapper
export const wrapPageElement = ({ element, props }) => (
  <QueryParamProvider history={history} location={props.location}>
    {element}
  </QueryParamProvider>
);

// If the pathname hasn't changed on an update, such as changing a query parameter
// then the page should not scroll to top.
export const shouldUpdateScroll = ({ prevRouterProps, routerProps }) => {
  return prevRouterProps?.location?.pathname !== routerProps.location.pathname;
};
