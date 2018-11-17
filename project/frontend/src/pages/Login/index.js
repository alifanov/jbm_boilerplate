import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm";
import { login } from "../../actions/auth";
import { authErrors, isAuthenticated } from "../../reducers";

const Login = props => {
  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="login-page">
        <LoginForm {...props} />
      </div>
    );
  }
};

const mapStateToProps = state => ({
  errors: authErrors(state),
  isAuthenticated: isAuthenticated(state)
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (username, password) => {
    dispatch(login(username, password));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
