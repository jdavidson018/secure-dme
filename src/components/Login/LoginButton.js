import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const classes = useStyles();

  return (
    <div>
      {user && <div>{user.name}</div>}
      {!isAuthenticated && (
        <Button
          href="#"
          color="primary"
          variant="outlined"
          className={classes.link}
          onClick={() => loginWithRedirect({redirect_uri:"http://localhost:3000/admin"})}
        >
          Signup/Login
        </Button>
      )}
    </div>
  );
};

export default LoginButton;
