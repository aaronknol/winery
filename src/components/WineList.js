import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Wine from './Wine';
import { formatPrice } from '../utilities';

function WineList (props) {

    // useEffect( () => {
    //     var video = document.querySelector('video');
    //     video.setAttribute('playsinline', '');
    //     video.setAttribute('autoplay', '');
    //     video.setAttribute('muted', '');
    //     video.style.width = '600px';
    //     video.style.height = '600px';

    //     /* Setting up the constraint */
    //     var facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
    //     var constraints = {
    //         audio: false,
    //         video: {
    //             facingMode: facingMode
    //         }
    //     };

    //     const canvas = document.getElementById('canvas');
    //     const context = canvas.getContext('2d');
    //     const captureButton = document.getElementById('capture');

    //     // const constraints = {
    //     //     video: true,
    //     // };

    //     captureButton.addEventListener('click', () => {
    //         // Draw the video frame to the canvas.
    //         context.drawImage(video, 0, 0, canvas.width, canvas.height);
    //     });

    //     /* Stream it to video element */
    //     navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
    //         video.srcObject = stream;
    //     });
    // });

    return (
        <Fragment>
        <Link to='/add'>Add</Link>

        <table>
            <thead>
                <tr>
                    <th>
                        <button type="button" onClick={ (e) => {props.sortWines('name', 'lowest')} }>
                            Name
                        </button>
                    </th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>
                        <button type="button" onClick={ (e) => {props.sortWines('rating', 'highest')} }>
                            Rating
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(props.wines).map(key => (
                        <Wine 
                            key={props.wines[key].key} 
                            index={key} 
                            wine={props.wines[key]}
                            render={ () => (
                                <tr>
                                    <td>{props.wines[key].name}</td>
                                    <td>{props.wines[key].type}</td>
                                    <td>{formatPrice(props.wines[key].price)}</td>
                                    <td>{props.wines[key].rating}</td>
                                    <td>
                                        <Link to={`/edit/${key}`}>Edit</Link>
                                    </td>
                                    <td>
                                        <button type="button" onClick={ () => props.deleteWine(props.wines[key].key) }>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                        )}>
                        </Wine>
                    ))
                }
            </tbody>
        </table>

        <video></video>
        <button id="capture" type="button">Take photo</button>
        <canvas id="canvas"></canvas>
        
        </Fragment>
    );
};

export default WineList;