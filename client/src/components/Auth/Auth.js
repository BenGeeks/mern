import React, { useState } from 'react';
import { Container, Paper, Button, Grid, Typography, Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { googleLogin } from '../../redux/actions/user';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(true);
  const [isSignup, setIsSignup] = useState(true);

  const handleSubmit = () => {
    console.log('HANDLE SUBMIT HAS BEEN TRIGGERED!');
  };

  const handleChange = () => {
    console.log('HANDLE CHANGE HAS BEEN TRIGGERED');
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    const data = { result, token };

    try {
      dispatch(googleLogin(data));
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log('GOOGLE LOGIN FAILED!');
  };

  return (
    <Container className={classes.main} maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5"> {isSignup ? 'Sign Up' : 'Sign In'} </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={() => setShowPassword(!showPassword)}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
              />
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          {!isSignup && (
            <GoogleLogin
              clientId="709253862280-ufs746tat01gq4a0uv72ufb8ufr5sta9.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Sign In with Google
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          )}

          <Button
            fullWidth
            onClick={() => {
              setIsSignup(!isSignup);
              setShowPassword(false);
            }}
          >
            {isSignup ? 'Already have an account? Sign In' : "Don't have an account yet? Sign Up"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
