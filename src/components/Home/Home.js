import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="row row-cols-1 row-cols-md-4 g-4 m-5">
            <div className="col">
                <div className="card panda-card h-100 shadow">
                    <div className="card-body">
                        <img src={require("..//..//images/bike.png")} className="card-img-top" alt="..." />
                        <h3 className="card-title">BIKE</h3>
                    </div>
                    <div className="card-footer panda-card-footer">
                        <Link to="/destination">
                            <button className="btn card-button">Go</button>
                        </Link>

                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card panda-card h-100 shadow">
                    <div className="card-body">
                        <img src={require("..//..//images/bus.png")} className="card-img-top" alt="..." />
                        <h3 className="card-title">BUS</h3>
                    </div>
                    <div className="card-footer panda-card-footer">
                        <Link to="/destination">
                            <button className="btn card-button">Go</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card panda-card h-100 shadow">
                    <div className="card-body">
                        <img src={require("..//..//images/car.png")} className="card-img-top" alt="..." />
                        <h3 className="card-title">CAR</h3>
                    </div>
                    <div className="card-footer panda-card-footer">
                        <Link to="/destination">
                            <button className="btn card-button">Go</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card panda-card h-100 shadow">
                    <div className="card-body">
                        <img src={require("..//..//images/train.png")} className="card-img-top" alt="..." />
                        <h3 className="card-title">TRAIN</h3>
                    </div>
                    <div className="card-footer panda-card-footer">
                        <Link to="/destination">
                            <button className="btn card-button">Go</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;