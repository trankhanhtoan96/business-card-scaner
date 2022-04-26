import React from "react";
import {IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel} from "@ionic/react";
import {Route} from "react-router";
import Home from "../Home/Home";
import {Redirect} from "react-router-dom";

const MainTabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/tabs/home" render={() => <Home/>} exact/>
                <Route path="/" exact><Redirect to="/tabs/home"/></Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/tabs/home">
                    <IonLabel>Dashboard</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default MainTabs;
