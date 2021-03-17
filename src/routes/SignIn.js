import React from 'react';
import { httpPost } from '../services/api';
import { setToken } from '../helpers/authToken';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../store/User';

class SignIn extends React.Component {


  state = {
    errors: {},
    username: '',
    password: '',
    loading: false
  };


  componentDidMount() {
    if (this.props.user.logged) this.props.history.push('/');
  }

  onInputChange = e => this.setState({[e.target.name]: e.target.value});
  handleSubmit = async e => {
    e.preventDefault();
    const errors = {};

    if (this.state.username.length < 3) errors.username = 'Поле является обязательным для заполнения';
    if (!this.state.password.length) errors.username = 'Поле является обязательным для заполнения';

    if (Object.keys(errors).length) return this.setState({errors});

    const {status, message} = await httpPost('login', {username:this.state.username, password: this.state.password});

    if (status === 'ok') {
      if (message.token) {
        setToken(message.token);
        this.props.updateUser({logged: true});
        this.props.history.push('/');
      }
    } else {
      this.setState({errors: message});
    }

  };

  render() {

    return (
        <div className={'sign-in-container'}>
          <form className={'sign-in-form'}  onSubmit={this.handleSubmit}>
            <div className="form-item">
              <label htmlFor="username" className={this.state.errors.username ? 'error' : ''}>Имя {  this.state.errors.username ? '(' + this.state.errors.username + ')' : null}</label>
              <input type="text" name={'username'} id={'username'} value={this.state.username} onChange={this.onInputChange}/>
            </div>
            <div className="form-item">
              <label htmlFor="password" className={this.state.errors.password ? 'error' : ''}>Пароль {  this.state.errors.password ? '(' + this.state.errors.password + ')' : null}</label>
              <input type="password" name={'password'} id={'password'} value={this.state.password} onChange={this.onInputChange}/>
            </div>
            <button type={'submit'} className={Object.keys(this.state.errors).length ? 'error' : ''}>{this.state.loading ? '...' : 'Войти'}</button>
          </form>
        </div>
    )

  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};
export default withRouter(connect(mapStateToProps, {updateUser})(SignIn));