import React from "react";
import {IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon} from "@ionic/react";
import {Route} from "react-router";
import Home from "../Home/Home";
import {Redirect} from "react-router-dom";
import ScanCard from "../ScanCard/ScanCard";
import {cloudUploadOutline, homeOutline, peopleOutline, scanOutline} from "ionicons/icons";

const MainTabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/tabs/home" render={() => <Home/>} exact/>
                <Route path="/tabs/scancard" render={() => <ScanCard/>} exact/>
                <Route path="/" exact><Redirect to="/tabs/home"/></Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/tabs/home">
                    <IonIcon icon={homeOutline}></IonIcon>
                    <IonLabel>Dashboard</IonLabel>
                </IonTabButton>
                <IonTabButton tab="contacts" href="/tabs/contacts">
                    <IonIcon icon={peopleOutline}></IonIcon>
                    <IonLabel>Contacts</IonLabel>
                </IonTabButton>
                <IonTabButton tab="scancard" href="/tabs/scancard">
                    <IonIcon icon={scanOutline}></IonIcon>
                    <IonLabel>Scan</IonLabel>
                </IonTabButton>
                <IonTabButton tab="export" href="/tabs/export">
                    <IonIcon icon={cloudUploadOutline}></IonIcon>
                    <IonLabel>Export</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default MainTabs;
