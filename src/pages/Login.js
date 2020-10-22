
import React, { useState, useEffect } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { nonSecuredPollingApi } from '../apis/pollingApi';
import { setToken, getToken } from '../util/CookieUtil';
import history from '../history';


const LoginForm = () => {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        if (getToken() !== undefined && getToken() !== null) {
            history.push('/');
        }
    }, []);

    const handleSubmit = (e, formData) => {
        e.preventDefault();
        let body = {
            userName,
            password
        }

        nonSecuredPollingApi().post('/login', body).then(resp => {
            setToken(resp.data.token);
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
            history.push('/');
        });
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form onSubmit={handleSubmit} size='large'>
                    <Segment stacked>
                        <Form.Input
                            value={userName}
                            fluid icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            onChange={(e) => setUserName(e.target.value)} />
                        <Form.Input
                            value={password}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button color='teal' fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
}



export default LoginForm