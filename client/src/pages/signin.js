import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Button, LinearProgress, Card, CardContent} from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';

import MainIcon from '../ressources/images/MainIcon.png';
import styles from '../exports/signinFormStyles';

class SigninPage extends Component {

    constructor() {

        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    onSubmit = event => {

        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.setState({
            loading: true
        });
        
        axios.post('/signin', userData)
            .then(result => {

                localStorage.setItem('FBAuthToken', `Bearer ${result.data.token}`);

                this.setState({
                    loading: false
                });
                this.props.history.push('/'); //redirect to '/'
            })
            .catch(e => {
                this.setState({
                    errors: e.response.data,
                    loading: false
                });
            });
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

        return (
            
            <Grid container className={classes.container}>
                <Grid item sm className={classes.form}>
                    <Card className={classes.card} className="loginCard">

                    {loading && (<LinearProgress/>)}

                    <CardContent className={classes.content}>
                        <img src={MainIcon} className={classes.image}/>

                        <Typography variant="h2" className={classes.pageTitle}>Login</Typography>

                        <form noValidate onSubmit={this.onSubmit}>
                            <TextField id="email" name="email" type="email" label="Email" className={classes.textField} value={this.state.email}
                            onChange={this.onChange} fullWidth helperText={errors.email} error={errors.email ? true : false}/>

                            <TextField id="password" name="password" type="password" label="Password" className={classes.textField} value={this.state.password} 
                            onChange={this.onChange} fullWidth helperText={errors.password} error={errors.password ? true : false}/> 
                        
                            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                                signin 
                            </Button> <br/>
                        </form> <br/>

                        <small>Dont have an Account? Sign up <Link className={classes.link} to="/signup" color="secondary">here</Link></small>

                    </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

SigninPage.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SigninPage);
