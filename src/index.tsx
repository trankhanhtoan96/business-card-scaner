import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import {UIProvider} from "./context";
import {SplashScreen} from "@capacitor/splash-screen";
import {StatusBar, Style} from "@capacitor/status-bar";


SplashScreen.show({
    autoHide: false
});
StatusBar.setStyle({style: Style.Light});
ReactDOM.render(
    <React.StrictMode>
        <UIProvider>
            <App/>
        </UIProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
serviceWorkerRegistration.unregister();
reportWebVitals();
