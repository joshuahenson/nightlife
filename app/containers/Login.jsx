import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {manualLogin, toggleLoginMode} from '../actions/users';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit() {
    const {manualLogin, fields: { email, password } } = this.props;
    manualLogin({
        email: email.value,
        password: password.value
    }, 'login');
  }
  render() {
    const { fields: { email, password }, error, resetForm, handleSubmit, submitting, toggleLoginMode } = this.props;
    return (
      <div>
        <div className="text-center">
          <h2>Log in with Email</h2>
          <div>
            If you don't yet have an account. &nbsp;
            <a onClick={toggleLoginMode}>
              Register Here
            </a>
          </div>
        </div>
        <form className="form-horizontal" onSubmit={handleSubmit(this.submit)}>
          <div className={'form-group' + (email.touched && email.error ? ' has-error' : '')}>
            <label htmlFor="emailInput" className="col-sm-2 control-label">Email</label>
            <div className={'col-sm-' + (email.touched && email.error ? '5' : '8')}>
              <input id="emailInput" type="text" className="col-sm-8 form-control" placeholder="Email" {...email} />
            </div>
            {email.touched && email.error && <div className="col-sm-3 help-block">{email.error}</div>}
          </div>
          <div className={'form-group' + (password.touched && password.error ? ' has-error' : '')}>
            <label htmlFor="pwInput" className="col-sm-2 control-label">Password</label>
            <div className={'col-sm-' + (password.touched && password.error ? '5' : '8')}>
              <input id="pwInput" type="password" className="col-sm-8 form-control" placeholder="Password" {...password} />
            </div>
            {password.touched && password.error && <div className="col-sm-3 help-block">{password.error}</div>}
          </div>
          <div className="text-center">
            {error && <p className="bg-danger">{error}</p>}
            <button type="submit" className="btn btn-primary btn-lg" style={{ margin: 10 }} disabled={submitting}>
              {submitting ? <i className="fa fa-circle-o-notch fa-spin" /> : <i className="fa fa-sign-in" />} Log In
            </button>
            <button type="reset" className="btn btn-default btn-lg" style={{ margin: 10 }} disabled={submitting} onClick={resetForm}>
              Clear Values
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  manualLogin: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};


const formConfig = {
  form: 'login',
  fields: [
    'email', 'password'
  ],
  validate
};

// reduxForm connects redux store/form to app
export default reduxForm(formConfig, null, {manualLogin, toggleLoginMode})(Login);
