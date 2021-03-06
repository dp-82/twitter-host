import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './Tweets.css'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';

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


const Home = () => {
    const username = sessionStorage.getItem('username');
    if (username === null) {
        window.location.href = '/';
    }
    document.title="Home"+" / Twitter";
    const [tweets, setTweets] = useState([]);
    //get tweets
    useEffect(() => {
        const username = sessionStorage.getItem('username');
        let formData = new FormData();
        formData.append('username', username);
        formData.append('type', 'Tweets');
        axios({
            method: 'post',
            url: baseUrl+'tweets.php',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then(function (response) {
            console.log(response.data);
            setTweets(response.data);
        }).catch(function (response) {
            console.log(response)
        });
    }, []);

    return (
        <>
            <h5 className="nothing">Home</h5>
            <div className="tweets">
                {
                    tweets.filter((data) => data.username !== username).map((data) =>
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
        </>
    )
}

export default Home
