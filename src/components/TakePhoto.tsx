import React, { Fragment, useEffect, useState } from 'react';

export interface IProps {
    setWineImage: (img: string) => void,
    className: string
}

const TakePhoto:React.FunctionComponent<IProps> = (props: IProps) => {
    const theVideo = React.useRef<HTMLVideoElement>(null);
    const theCanvas = React.useRef<HTMLCanvasElement>(null);
    const [videoWidth, setVideoWidth] = useState(640);
    const [videoHeight, setVideoHeight] = useState(480);

    const takePhotoHandler = () => {
        if ( theCanvas.current !== null  && theVideo.current !== null ) {
            const theContext = theCanvas.current.getContext('2d');

            if (theContext) {
                theContext.drawImage(theVideo.current, 0, 0, theCanvas.current.width, theCanvas.current.height);
            }
            const img = theCanvas.current.toDataURL("image/png");
            props.setWineImage(img);
        }
    };

    useEffect( () => {

        /* Setting up the constraint */
        var facingMode = "environment"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
        var constraints = {
            audio: false,
            video: {
                facingMode: facingMode
            }
        };
        var currentVideo:HTMLVideoElement;

        /* Stream it to video element */
        navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
            if (theVideo.current !== null) {
                currentVideo = theVideo.current;
                currentVideo.srcObject = stream;

                alert('width of stream is: ' + stream.getTracks()[0].getSettings().width);
                
                let width:number = stream.getTracks()[0].getSettings().width || 480;
                let height:number = stream.getTracks()[0].getSettings().height || 640;
                
                setVideoWidth(width);
                setVideoHeight(height);
            }
        });

        return function cleanup() {
            var stream = currentVideo.srcObject;
            if (stream !== null) {
                (stream as MediaStream).getTracks() // get all tracks from the MediaStream
                    .forEach( track => track.stop() )
            }
        }
    }, [theVideo]);

    return (
        <Fragment>
            <video ref={theVideo} playsInline autoPlay muted className="take-photo__video"></video>
            <button id="capture" type="button" onClick={takePhotoHandler} className="take-photo__button">Take photo</button>
            <canvas id="canvas" ref={theCanvas} width={videoWidth} height={videoHeight}></canvas>
        </Fragment>
    )
}

export default TakePhoto;