import {IonButton, IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar, useIonLoading} from "@ionic/react";
import React, {useRef, useState} from "react";
import {createWorker} from "tesseract.js";
import {Camera, CameraResultType} from "@capacitor/camera";
import {preprocessImage} from "../../helpers/preprocessImage";
import {TimeHelper} from "../../helpers/time.helper";
import * as tfTask from '@tensorflow-models/tasks';
import {ObjectDetectionResult} from "@tensorflow-models/tasks/dist/tasks/object_detection/common";

const Intro: React.FC = () => {
    const [loadingSpin, dismissLoading] = useIonLoading();
    const [lines, setLines] = useState<any>();
    const [obj, setObj] = useState<any>([]);
    const [imageScanned, setImageScanned] = useState<string>();
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [sizeC, setSixeC] = useState({width: 0, height: 0});
    const worker = createWorker({
        workerPath: '/tesseract/worker.min.js',
        langPath: '/tesseract/',
        corePath: '/tesseract/tesseract-core.wasm.js',
    });

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
                setSixeC({width: result.objects[index].boundingBox.width, height: result.objects[index].boundingBox.height});
                let canvas = canvasRef.current;
                let ctx = canvas.getContext('2d');
                await ctx.drawImage(imageRef.current, result.objects[index].boundingBox.originX, result.objects[index].boundingBox.originY, result.objects[index].boundingBox.width, result.objects[index].boundingBox.height, 0, 0, result.objects[index].boundingBox.width, result.objects[index].boundingBox.height);
                const dataUrl = canvas.toDataURL("image/jpeg");
                await worker.load();
                await worker.loadLanguage('vie');
                await worker.initialize('vie');
                const {data: {lines}} = await worker.recognize(dataUrl);
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
                    <IonTitle>BC Scan</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="ion-text-center">
                    <img src={imageScanned} ref={imageRef} alt="" style={{display: "none"}}/>
                    <img src={canvasRef.current?.toDataURL("image/jpeg")} alt=''/>
                    <canvas width={sizeC.width} height={sizeC.height} ref={canvasRef} style={{display: 'none'}}></canvas>
                    <br/>
                    <IonButton onClick={takePicture} className="btn">Scan</IonButton>
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
