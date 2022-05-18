import {Redirect, Route} from "react-router-dom";
import {IonApp, IonRouterOutlet, setupIonicReact,} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";
import MainTabs from "./pages/Tabs/MainTabs";
import React from "react";
// import UIContext from "./context";

setupIonicReact({
    mode: "md",
});

const App: React.FC = () => {
    // const {testState} = React.useContext(UIContext);
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route exact path="/"><Redirect to='/tabs'></Redirect></Route>
                    <Route path="/tabs" render={() => <MainTabs/>}/>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
