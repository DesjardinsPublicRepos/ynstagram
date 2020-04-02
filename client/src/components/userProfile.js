import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { withStyles } from '@material-ui/core/styles';
import { Button, Typography, Paper } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import LocationIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardIcon from '@material-ui/icons/ExitToApp';

import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';

import styles from '../styles/userProfile';
import EditUserDetails from './editUserDetails';
import WrappedButton from './wrappedButton';

class userProfile extends Component {

    onImageChange = event => {

        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }

    imageButtonClicked = () => {
        const element = document.getElementById('imageInput'); //replace this
        element.click();
    }

    doLogout = () => {
        this.props.logoutUser();
    }

    render() {

        const { 
            classes, 
            user: { 
                loading, 
                authenticated, 
                credentials: { handle, createdAt, imageUrl, bio, website, location }
            }
        } = this.props;

        return !loading ? (authenticated ? (

            <Paper className={classes.paper}>
                <div className={classes.profile}>

                    <div className="image-wrapper">
                        <img src={imageUrl} alt="" className="profile-image"/>
                    </div><hr/>

                    <input type="file" id="imageInput" hidden="hidden" onChange={this.onImageChange}/>
                    <WrappedButton title="Edit profile picture" onClick={this.imageButtonClicked} btnClassName="button">
                        <EditIcon color="primary"/>
                    </WrappedButton>
                    <div className="profile-details">

                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant='h5'>
                            {handle}
                        </MuiLink><hr/>

                        {bio && <Typography variant="body2">{bio}</Typography>}<hr/>

                        {location && (
                            <Fragment>
                                <LocationIcon color="primary"/>
                                <span>{location}</span>
                                <hr/>
                            </Fragment>
                        )}

                        {website && (
                            <Fragment>
                                <LinkIcon color="primary"/>
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                            </Fragment>
                        )}
                        
                        <CalendarIcon color="primary"/>{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>

                    <WrappedButton title="logout" onClick={this.doLogout}>
                        <KeyboardIcon color="primary"/>
                    </WrappedButton>

                    <EditUserDetails/>
                </div>
            </Paper>

        ) : (

            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No Profile found, please log in again.
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/signin">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                        Sign up
                    </Button>
                </div>
            </Paper>

        )) : (<p>loading...</p>)
    }
}

userProfile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapState = state => ({
    user: state.user
});

const mapActions = { logoutUser, uploadImage };

export default connect(mapState, mapActions)(withStyles(styles)(userProfile));