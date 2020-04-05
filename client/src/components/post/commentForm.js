import React, { Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField } from '@material-ui/core';

import { createComment } from '../../redux/actions/dataActions';

const styles = {};


class CommentForm extends Component {

    state = {
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors });
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    doSubmit = event => {
        event.preventDefault();
        this.props.createComment(this.props.postId, { body: this.state.body });
    }

    render() {

        const { classes, authenticated } = this.props;
        const errors = this.state.errors;

        const commentForm = authenticated ? (

            <Grid item sm={12} style={{ textAlign: 'center' }}>
                
                <hr className={classes.visibleSeperator}/>

                <form onSubmit={this.doSubmit}>
                    <TextField name="body" tyle="text" label="comment a post" error={errors.comment ? true : false} helperText={errors.comment}
                    value={this.state.body} onChange={this.onChange} fullWidth className={classes.textField}/>

                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
            </Grid>
        ) : null

        return commentForm;
    }
}

CommentForm.propTypes = {
    createComment: PropTypes.func.isRequired, 
    ui: PropTypes.object.isRequired, 
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapState = state => ({
    ui: state.ui, 
    authenticated: state.user.authenticated
})

export default connect(mapState, { createComment })(withStyles(styles)(CommentForm));
