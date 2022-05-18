import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonLoading, IonBackButton} from "@ionic/react";
import React, { useRef, useState} from "react";
import {createWorker} from "tesseract.js";
import {Camera, CameraResultType} from "@capacitor/camera";
import * as tfTask from '@tensorflow-models/tasks';
import {camera} from "ionicons/icons";

const Intro: React.FC = () => {
    const [loadingSpin, dismissLoading] = useIonLoading();
    const [lines, setLines] = useState<any>();
    const [imageScanned, setImageScanned] = useState<string>();
    const [imageScannedDisplay, setImageScannedDisplay] = useState<string>();
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [sizeC, setSizeC] = useState({width: 0, height: 0});

    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.DataUrl
        });
        if (image.dataUrl) {
            loadingSpin('Loading', null, "circles");
            setLines(null);
            setImageScanned(image.dataUrl);
            let i = new Image();
            i.src = image.dataUrl;
            i.onload = async () => {
                //detect object and crop with canvas
                const tfmodel = await tfTask.ObjectDetection.CustomModel.TFLite.load({
                    model: '/tensorflowjs/lite-model_ssd_mobilenet_v1_1_metadata_2.tflite'
                });
                const result = await tfmodel.predict(i!);
                console.log(result);
                let index = 0;
                for (const [key, value] of Object.entries(result.objects)) {
                    if (value.className == 'person') index = parseInt(key, 10);
                    else break;
                }
                setSizeC({width: result.objects[index].boundingBox.width, height: result.objects[index].boundingBox.height});
                let canvas = canvasRef.current;
                let ctx = canvas.getContext('2d');
                await ctx.drawImage(imageRef.current, result.objects[index].boundingBox.originX, result.objects[index].boundingBox.originY, result.objects[index].boundingBox.width, result.objects[index].boundingBox.height, 0, 0, result.objects[index].boundingBox.width, result.objects[index].boundingBox.height);
                const dataUrl = canvas.toDataURL("image/jpeg");
                setImageScannedDisplay(dataUrl);

                //detect text
                const worker = createWorker({
                    workerPath: '/tesseract/worker.min.js',
                    langPath: '/tesseract/',
                    corePath: '/tesseract/tesseract-core.wasm.js',
                });
                await worker.load();
                await worker.loadLanguage('vie');
                await worker.initialize('vie');
                const a=new Date().getTime();
                const {data: {lines}} = await worker.recognize(dataUrl);
                const b=new Date().getTime();
                console.log('detect', b-a);
                await worker.terminate();
                let tmp = [];
                lines.forEach((value, index) => {
                    if (value.confidence >= 50) tmp.push(value);
                });
                setLines(tmp);
                console.log(lines);
                dismissLoading();
            };
        }
    };
    return (
        <IonPage>
            <IonHeader className="ion-no-border ion-text-center">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/"/>
                    </IonButtons>
                    <IonTitle>BC Scan</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={takePicture}>
                            <IonIcon className="fav" icon={camera} slot="end"/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="ion-text-center" style={{paddingLeft: "5%", paddingRight: "5%"}}>
                    <img src={imageScanned} ref={imageRef} alt="" style={{display: "none"}}/>
                    {imageScannedDisplay ? (<img src={imageScannedDisplay} alt=""/>) : (<small>Scan card or typing information to add contact</small>)}
                    <canvas width={sizeC.width} height={sizeC.height} ref={canvasRef} style={{display: "none"}}></canvas>
                </div>
                <ol>
                    {lines && Object.values<any>(lines).map(item => {
                        return (<li>{item.text}</li>);
                    })}
                </ol>
            </IonContent>
        </IonPage>
    );
};

export default Intro;
