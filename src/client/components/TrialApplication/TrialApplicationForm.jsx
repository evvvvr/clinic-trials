import { browserHistory } from 'react-router';
import HttpStatus from 'http-status-codes';
import React from 'react';

import api from '../../api';

function mapFormDataToAPIInput(data) {
  return {
    gender: data.gender,
    firstName: data.firstName,
    lastName: data.firstName,
    email: data.email,
    phone: data.phone,
    age: Number(data.age),
    zip: data.zip,
  };
}

class TrialApplicationForm extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: '',
        zip: '',
        isTermsAccepted: false,
      },
      validationResult: {
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

  onCheckboxChange(e) {
    const data = this.state.data;

    data[e.target.name] = e.target.checked;
    this.setState({
      data,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const applicationData = mapFormDataToAPIInput(this.state.data);
    api.submitTrialApplication(applicationData, (error, response) => {
      if (!error && response.statusCode === HttpStatus.CREATED) {
        browserHistory.push('/success');
      } else {
        this.setState({
          errorSubmitting: 'Sorry, something went wrong while sending your application. Please, try again.',
        });
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label htmlFor="gender">Gender</label>
          <select name="gender" value={this.state.data.gender} required onChange={this.onChange}>
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
            required
            pattern="^\S(.*\S)?$"
            title="Should not contain leading and trailing spaces and
             more than one space in-beetwen characters"
            onChange={this.onChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={this.state.data.lastName}
            required
            pattern="^\S(.*\S)?$"
            title="Should not contain leading and trailing spaces and
             more than one space in-beetwen characters"
            onChange={this.onChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={this.state.data.email}
            required
            onChange={this.onChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={this.state.data.phone}
            required
            pattern="^\+?(\d){7,12}$"
            title="Must be from 7 to 12 digits, optionally starting with a '+'"
            onChange={this.onChange}
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            min="1"
            max="99"
            value={this.state.data.age}
            required
            onChange={this.onChange}
          />
        </div>
        <div>
          <label htmlFor="zip">ZIP</label>
          <input
            type="text"
            name="zip"
            value={this.state.data.zip}
            required
            pattern="^(\d){3,5}$"
            title="Must be from 3 to 5 digits"
            onChange={this.onChange}
          />
        </div>
        <div>
          <label htmlFor="isTermsAccepted">I have read and accept terms &amp; conditions</label>
          <input
            type="checkbox"
            name="isTermsAccepted"
            checked={this.state.data.isTermsAccepted}
            required
            onChange={this.onCheckboxChange}
          />
        </div>
        <div>
          <input type="submit" value="Apply" />
          <div>
            {this.state.errorSubmitting}
          </div>
        </div>
      </form>
    );
  }
}

export default TrialApplicationForm;
