import React, { Fragment, useEffect } from 'react';

function TakePhoto (props) {
    const theVideo = React.useRef('theVideo');
    const theCanvas = React.useRef('theCanvas');

    const takePhotoHandler = () => {
        const theContext = theCanvas.current.getContext('2d');
        theContext.drawImage(theVideo.current, 0, 0, theCanvas.current.width, theCanvas.current.height);

        const img = theCanvas.current.toDataURL("image/png");
        props.setWineImage(img);
    };

    useEffect( () => {

        /* Setting up the constraint */
        var facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
        var constraints = {
            audio: false,
            video: {
                facingMode: facingMode
            }
        };

        /* Stream it to video element */
        navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
            theVideo.current.srcObject = stream;
        });
    }, [theVideo]);

    return (
        <Fragment>
            <video ref={theVideo} playsInline autoPlay muted></video>
            <button id="capture" type="button" onClick={takePhotoHandler}>Take photo</button>
            <canvas id="canvas" ref={theCanvas} width="400" height="300"></canvas>
        </Fragment>
    )
}

export default TakePhoto;