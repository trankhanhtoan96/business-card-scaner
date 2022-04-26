import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar,} from "@ionic/react";
import {notifications } from "ionicons/icons";
import React  from "react";
import "react-circular-progressbar/dist/styles.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar >
          <IonTitle className="ion-text-center">Home</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/">
              <IonIcon className="fav" icon={notifications} slot="end" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="home">
          <h1 className="ion-text-center">Trần Khánh Toàn</h1>
      </IonContent>
    </IonPage>
  );
};

export default Home;
