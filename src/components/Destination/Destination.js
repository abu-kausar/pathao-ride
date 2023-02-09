import React, { useState } from 'react';
// import { UserContext } from '../../App';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';

const Destination = () => {
//     const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [roadDirection, setRoadDirection] = useState({
        isDefinedDirection: false,
    })

    const handleBlur = (event) => {
        if (event.target.name === 'fromLocation') {
            const fromLocation = event.target.value;
            const newUser = { ...roadDirection }
            newUser[event.target.name] = fromLocation;
            setRoadDirection(newUser);
            console.log(newUser);
        }
        if (event.target.name === 'toLocation') {
            const toLocation = event.target.value;
            const newUser = { ...roadDirection }
            newUser[event.target.name] = toLocation;
            setRoadDirection(newUser);
            console.log(newUser);
        }
    }

    const handleSetRoute = () => {
        const newUser = { ...roadDirection }
        newUser.isDefinedDirection = true;
        setRoadDirection(newUser);
    }

    return (

        <div class="container">
            <div class="row justify-content-center mt-2">
                {
                    roadDirection.isDefinedDirection &&
                    <h3>
                        <div class="alert alert-success text-center" role="alert">
                            Congratulations!! Your Selected Route is: {roadDirection.fromLocation} - {roadDirection.toLocation}
                        </div>
                    </h3>
                }

                <div class="col-4 m-2">
                    <MDBContainer fluid>

                        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                            <MDBCol col='12'>

                                <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                                    <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                                        <h2 className="fw-bold mb-2 text-center">Select Route</h2>

                                        <br />

                                        <input onBlur={handleBlur} className="mb-4 border border-secondary rounded" type="text" name='fromLocation' label="from" placeholder='departure location' />
                                        <input onBlur={handleBlur} className="mb-4 border border-secondary rounded" type="text" name='toLocation' label="to" placeholder='destination location' />

                                        {
                                            !roadDirection.isDefinedDirection &&  <Button onClick={handleSetRoute} variant="primary">Confirm Route</Button>
                                        }
                                        
                                    </MDBCardBody>

                                </MDBCard>

                            </MDBCol>
                        </MDBRow>

                    </MDBContainer>
                </div>
                <div class="col-6 m-2">
                    <MDBContainer fluid>

                        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                            <MDBCol col='12'>

                                <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                                    <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                                        <img src={require("..//..//images/Map.png")} alt="" />

                                    </MDBCardBody>
                                </MDBCard>

                            </MDBCol>
                        </MDBRow>

                    </MDBContainer>
                </div>
            </div>
        </div>

    );
};

export default Destination;
