import React from 'react'
import './auth.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { FaTwitter } from 'react-icons/fa'
import { IconContext } from 'react-icons'

const SUCCESS_REGISTER = "User details are inserted";

const baseUrl = 'http://15.207.66.46/';

class Register extends React.Component {

    constructor(props){
        super(props)
        if (sessionStorage.getItem('username') != null) window.location.href = '/home';
        document.title="Sign up for Twitter / Twitter";
    }
    state = {
        username: "",
        password: "",
        name: "",
        phone: "",
        mail: ""
    }

    registerHandler(event) {
        event.preventDefault();

        if (this.state.username.trim() === "" || this.state.password.trim() === "" || this.state.name.trim() === "" || this.state.phone.trim() === "" || this.state.mail.trim() === "") {
            alert('please enter all required feilds');
            return;
        }
        if(this.state.username.trim().length>15){
            alert('username should be less than or equal to 15 characters');
            return;
        }
        if(this.state.name.trim().length>30){
            alert('name should be less than or equal to 30 characters');
            return;
        }
        if(this.state.phone.trim().length!=10){
            alert('phone number must be 10 characters');
            return;
        }
        let formData = new FormData();
        const username = this.state.username.trim();
        formData.append('username', this.state.username.trim());
        formData.append('password', this.state.password.trim());
        formData.append('name', this.state.name.trim());
        formData.append('phone', this.state.phone.trim());
        formData.append('mail', this.state.mail.trim());

        axios({
            method: 'post',
            url: baseUrl + 'index.php',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then(function (response) {
            if (response.data === SUCCESS_REGISTER) {
                sessionStorage.setItem('username', username);
                window.location.href = "/home";
            } else {
                alert(response.data);
            }
        }).catch(function (response) {
            console.log(response)
        });
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Row style={{ width: '100%', height: '100%' }}>
                    <Col></Col>
                    <Col style={{ width: '50%', padding: '2%' }}>
                        <IconContext.Provider value={{ style: { fontSize: '50px', color: "rgb(0, 123, 255)" } }}>
                            <div>
                                <FaTwitter />
                            </div>
                        </IconContext.Provider>
                        <h3 style={{ marginTop: '3%' }}>Sign up for Twitter</h3>
                        <Form style={{ width: "100%" }}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="phone" placeholder="Enter phone number" value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })} />
                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Form.Label>Mail</Form.Label>
                                <Form.Control type="mail" placeholder="Enter mail" value={this.state.mail} onChange={(e) => this.setState({ mail: e.target.value })} />
                            </Form.Group>
                            <br />
                            <Button onClick={(e) => this.registerHandler(e)} style={{ borderRadius: '2rem', backgroundColor: 'rgb(0, 123, 255)', width: '100%', height: '2.5rem' }}>Sign up</Button> <br />

                        </Form><br />
                        <Link to="/login" style={{ textDecoration: 'none' }}><h6 style={{textAlign:'center', fontWeight: 'normal' }}>Log in for Twitter</h6></Link>
                    </Col>
                    <Col></Col>
                </Row>

            </div>
            // <div className="login-auth">
            //     <img src="tiniLogo.png" alt="Logo" />
            //     <h1 style={{ marginRight: "1%" }}>Sign up for Twitter</h1>
            //     <input type="text" name="username" placeholder="enter username" id="username" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} /> <br />
            //     <input type="text" name="password" placeholder="enter password" id="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} /> <br />
            //     <input type="text" name="name" placeholder="enter name" id="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} /> <br />
            //     <input type="text" name="phone" placeholder="enter phone" id="phone" value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })} /> <br />
            //     <input type="text" name="mail" placeholder="enter mail" id="mail" value={this.state.mail} onChange={(e) => this.setState({ mail: e.target.value })} /> <br />
            //     <Button onClick={(e) => this.registerHandler(e)} variant="outline-dark">Register</Button><br />
            //     <h4>already has an account? <Link to="/login">Login</Link></h4>
            // </div>
        )
    }
}

export default Register
