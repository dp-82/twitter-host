import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './Tweets.css'
import {Link} from 'react-router-dom'
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { FaUserCircle } from 'react-icons/fa';

const ERR_CON = "Connecting to MySQL failed";
const ERR_QUERY = "Query Execution Failed";

const baseUrl = 'http://15.207.66.46/';

const getDateDisplayFormatString = (timestamp) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'];
    const [fullDate, fullTime] = timestamp.split(' ');
    const [year, month, date] = fullDate.split('-');
    const [hours, minutes, seconds] = fullTime.split(':');
    const cur_date = new Date();
    const tweet_date = new Date(year, month - 1, date, hours, minutes, seconds);
    let dif_seconds = (cur_date - tweet_date) / 1000;
    let dif_minutes = dif_seconds / 60;
    let dif_hours = dif_minutes / 60;
    let display = '';
    if (parseInt(dif_seconds) < 60) {
        display += parseInt(dif_seconds) + 's';
    } else if (parseInt(dif_minutes) < 60) {
        display += parseInt(dif_minutes) + 'm';
    } else if (parseInt(dif_hours) < 24) {
        display += parseInt(dif_hours) + 'h';
    } else if (cur_date.getFullYear() === year) {
        display += monthNames[parseInt(month) - 1] + ' ' + date;
    } else {
        display += monthNames[parseInt(month) - 1] + ' ' + date + ',' + year;
    }
    return display;
}

const AnotherUserProfile = (props) => {
    let username = sessionStorage.getItem('username');
    if (username === null) {
        window.location.href = '/';
    }
    username = props.reqUserProfile;

    const [profileData, setProfileData] = useState({});
    const [tweets, setTweets] = useState([]);
    // const [show, setShow] = useState(false);

    //get profile information
    useEffect(() => {
        // const username = sessionStorage.getItem('username');
        let formData = new FormData();
        formData.append('username', username);
        formData.append('type', 'Profile');
        axios({
            method: 'post',
            url: baseUrl + 'profileInfo.php',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then(function (response) {
            setProfileData(response.data);
            console.log(response.data);
        }).catch(function (response) {
            console.log(response)
        });
    }, [profileData]);

    //get tweets
    useEffect(() => {
        const username = sessionStorage.getItem('username');
        let formData = new FormData();
        formData.append('username', username);
        formData.append('type', 'Tweets');
        axios({
            method: 'post',
            url: baseUrl + 'tweets.php',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then(function (response) {
            console.log(response.data);
            setTweets(response.data);
        }).catch(function (response) {
            console.log(response)
        });
    }, [tweets]);


    return (
        <div className="divProfile">
            <h5 className="nothing">Profile</h5>
            <Card style={{ border: 'none', padding: '1%' }}>
                {/* <Card.Img src="logo.png" style={{ height: "5rem", width: "5rem" }} /> */}
                <IconContext.Provider value={{ style: { fontSize: '75px', color: "rgb(34, 72, 112)", paddingLeft: '2%'} }}>
                    <div>
                        <FaUserCircle />
                    </div>
                </IconContext.Provider>
                <Card.Body style={{backgroundColor:'',paddingTop:'0.5%',paddingBottom:'0.5%'}}>
                    <Card.Title style={{fontSize:'20px'}}>{profileData.name}</Card.Title>
                    <Card.Subtitle style={{ fontFamily: 'monospace' , fontSize:'15px'}}>{'@' + profileData.username}</Card.Subtitle>
                    <Card.Text>
                        <div>
                            <h6 style={{ display: 'inline', fontFamily: 'monospace',fontSize:'14px' }}>{profileData.phone}</h6>
                            <h6 style={{ float: 'right', display: 'inline', fontFamily: 'monospace',fontSize:'14px' }}>{profileData.mail}</h6>
                            <br/>
                            <h6 style={{ display: 'inline' , fontSize:'17px'}}>{profileData.Followings}</h6>&nbsp;
                        <h6 style={{ display: 'inline', fontWeight: '300' , fontSize:'17px'}}>Following</h6>&nbsp;&nbsp;&nbsp;
                        <h6 style={{ display: 'inline', fontSize:'17px' }}>{profileData.Followers}</h6>&nbsp;
                        <h6 style={{ display: 'inline', fontWeight: '300',fontSize:'17px' }}>Followers</h6>
                        </div>
                    </Card.Text>
                    {/* <Button variant="info" style={{ float: 'right' }}>Edit Details</Button> */}
                </Card.Body>
            </Card>
            <h5 className="nothing" style={{borderTop:'1px solid aqua'}}>Tweets</h5>
            <div className="tweets" style={{ height: 'calc(68vh)' }}>
                {
                    tweets.filter((data) => data.username === username).map((data) =>
                    <Link to={'/post-' + data.tid} style={{ textDecoration: "None", color: "inherit" }} key={data.tid}>
                            <Container style={{ borderBottom: '0.5px solid aqua' }}>
                                <Row>
                                    <Col sm='1' style={{ padding: '2%', paddingTop: '1%' }}>
                                        <IconContext.Provider value={{ style: { fontSize: '40px', color: "rgb(34, 72, 112)" } }}>
                                            <div>
                                                <FaUserCircle />
                                            </div>
                                        </IconContext.Provider>
                                    </Col>
                                    <Col style={{ textAlign: 'start', padding: '1%' }}>
                                        <Row>
                                            <Col>
                                                <div>
                                                    <h6 style={{ float: 'left' }}>{data.name}</h6>
                                                    <h6 style={{ fontFamily: 'monospace', padding: '0.7%',fontSize:'14px' }}>{'@' + data.username}</h6>
                                                </div>

                                            </Col>
                                            <Col sm={2} style={{ padding: '1%' }}><h6 style={{ textAlign: 'end', fontFamily: 'monospace',fontSize:'14px' }}>{getDateDisplayFormatString(data.timestamp)}</h6></Col>

                                        </Row>
                                        <Row>
                                            <p style={{ wordBreak: 'break-all', whiteSpace: 'normal', fontWeight: 'normal' , fontSize:'16px'}}>{data.tweet}</p>
                                        </Row>
                                    </Col>

                                </Row>

                            </Container>
                        </Link>
                    )
                }

            </div>
        </div>
    )
}

export default AnotherUserProfile
