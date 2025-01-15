import React, { useState, useEffect } from 'react';
import { Spinner, Alert, Card } from 'react-bootstrap';
import MapView from './MapView';
import { FaPhone, FaMapMarker } from "react-icons/fa";

const CenterView = (props) => {

    const [center, setCenter] = useState(null);
    const [error, setError] = useState(null);
    const [loadingCenter, setLoadingCenter] = useState(false);

    useEffect(() => {
        setCenter(props.center);
        setError(null);
    setLoadingCenter(false);
    }, [props.center]);

  
    
    // return a view of the recycling center showing the map and the details of the center sectioned using cards
    return (
        <div>
            {loadingCenter ? (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : error ? (
                <Alert variant="danger">
                    Error: {error}
                </Alert>
            ) : center ? (
                <div>
                    {/* <h2>{center.address}</h2> */}
                    <div className="map">
                        {/* Map component to show the location of the center */}
                       {props.center ? ( <MapView centers={[props.center]} mapCenter={[props.center.latitude,props.center.longitude]} />) : null}
                    </div>
                    <div className="center-details">
                        <Card>
                            <Card.Body>
                                <Card.Title className='text-success'>{"Information"}</Card.Title>
                                <Card.Text><FaMapMarker className='text-warning'/> &nbsp; {props.center.address}</Card.Text>
                                <Card.Text><FaPhone className='text-warning'/> &nbsp; {props.center.phone}</Card.Text>
                                <Card.Text className='small badge badge-primary text-success p-2' style={{outline:"green solid 3px"}} >{"20KM from your location"}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            ) : (
                <Alert variant="info">
                    No center data available
                </Alert>
            )}
        </div>
    )
}

export default CenterView;
