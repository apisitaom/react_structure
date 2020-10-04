import React, { Component } from "react";
import { Switch, withRouter } from "react-router-dom";
import _balnkRoute from "./_balnkRoute";
import _externalRoute from "./_externalRoute";
import _internalRoute from "./_internalRoute";
import routes from '../../routes';
import CustomLoadable from '../Customloadable';

class RoutesComponent extends Component {
    render() {
        return (
            <Switch>
                {
                    routes._blankRoute.map((item) => (
                        <_balnkRoute 
                            key={item.path}
                            currentUser={this.currentUser}
                            permissionRequired={item.permissionRequired}
                            path={item.path}
                            component={CustomLoadable({loader: item.loader})}
                            exact={!!item.exact} 
                        />
                    ))
                }
                {
                    routes._internalRoute.map((item) => (
                        <_internalRoute 
                            key={item.path}
                            currentUser={this.currentUser}
                            permissionRequired={item.permissionRequired}
                            path={item.path}
                            component={CustomLoadable({loader: item.loader})}
                            exact={!!item.exact} 
                        />
                    ))
                }
                {
                    routes._externalRoute.map((item) => (
                        <_externalRoute 
                            key={item.path}
                            currentUser={this.currentUser}
                            permissionRequired={item.permissionRequired}
                            path={item.path}
                            component={CustomLoadable({loader: item.loader})}
                            exact={!!item.exact} 
                        />
                    ))
                }
            </Switch>
        )
    }
}

export default withRouter(RoutesComponent);
