import {IonButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar} from "@ionic/react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination} from "swiper";

import "./Intro.css";

import "@ionic/react/css/ionic-swiper.css";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Intro: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="end">
                        <IonButton className="skip-button">SKIP</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding intro" fullscreen>
                <div className="img-holder ion-text-center animate__animated animate__bounce">
                    <img src="assets/imgs/phone.svg"/>
                </div>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={true}
                    pagination={true}
                >
                    <SwiperSlide>
                        <div className="slide-content ion-text-center ion-padding-horizontal">
                            <h4 className="sm-title ion-text-wrap">
                                Welcome, Manage your expenses
                            </h4>
                            <p className="sm-detail ion-text-wrap">
                                easily manage your expenses by your mobile
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-content ion-text-center ion-padding-horizontal">
                            <h4 className="sm-title ion-text-wrap">
                                Welcome, Manage your expenses
                            </h4>
                            <p className="sm-detail ion-text-wrap">
                                easily manage your expenses by your mobile
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-content ion-text-center ion-padding-horizontal">
                            <h4 className="sm-title ion-text-wrap">
                                Welcome, Manage your expenses
                            </h4>
                            <p className="sm-detail ion-text-wrap">
                                easily manage your expenses by your mobile
                            </p>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div className="btns-holder ion-text-center">
                    <IonButton routerLink="/login" className="btn">Login</IonButton>
                    <IonButton routerLink="signup" id="signup" className="btn">
                        Signup
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Intro;
