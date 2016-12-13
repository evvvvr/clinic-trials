import { browserHistory } from 'react-router';
import HttpStatus from 'http-status-codes';
import React from 'react';

import api from '../../api';

class TrialApplicationForm extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: '',
        zip: '',
      },
    };
  }

  onChange(e) {
    const data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({
      data,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    api.submitTrialApplication(this.state.data, (error, response) => {
      if (!error && response.statusCode === HttpStatus.CREATED) {
        browserHistory.push('/success');
      } else {
        this.setState({
          errorSubmitting: true,
        });
      }
    });
  }

  render() {
    let errorSubmittingMessage = <div />;

    if (this.state.errorSubmitting) {
      errorSubmittingMessage = (
        <div>
          Sorry, something went wrong while sending your application. Please, try again.
        </div>
      );
    }

    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label htmlFor="gender">Gender</label>
          <select name="gender" value={this.state.data.gender} onChange={this.onChange}>
            <option value="" />
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={this.state.data.firstName}
            onChange={this.onChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={this.state.data.lastName}
            onChange={this.onChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={this.state.data.email} onChange={this.onChange} />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" value={this.state.data.phone} onChange={this.onChange} />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            min="1"
            max="99"
            value={this.state.data.age}
            onChange={this.onChange}
          />
        </div>
        <div>
          <label htmlFor="zip">ZIP</label>
          <input type="text" name="zip" value={this.state.data.zip} onChange={this.onChange} />
        </div>
        <div>
          <label htmlFor="isTermsAccepted">I have read and accept terms &amp; conditions</label>
          <input
            type="checkbox"
            name="isTermsAccepted"
            value={this.state.data.acceptTerms}
            onChange={this.onChange}
          />
          {errorSubmittingMessage}
          <input type="submit" value="Apply" />
        </div>
      </form>
    );
  }
}

export default TrialApplicationForm;
