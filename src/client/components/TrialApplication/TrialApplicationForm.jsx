import { browserHistory } from 'react-router';
import HttpStatus from 'http-status-codes';
import React from 'react';

import api from '../../api';

const InitialState = {
  data: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    zip: '',
    isTermsAccepted: false,
  },
};

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

    this.state = InitialState;
  }

  onChange(e) {
    const data = this.state.data;

    data[e.target.name] = e.target.value;
    this.setState({
      data,
      errorSubmitting: '',
    });
  }

  onCheckboxChange(e) {
    const data = this.state.data;

    data[e.target.name] = e.target.checked;
    this.setState({
      data,
      errorSubmitting: '',
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({
      isSubmitting: true,
    });

    const applicationData = mapFormDataToAPIInput(this.state.data);
    api.submitTrialApplication(applicationData, (error, response) => {
      if (!error && response && response.statusCode === HttpStatus.CREATED) {
        browserHistory.push('/success');
      } else if (response && response.statusCode === HttpStatus.CONFLICT) {
        this.setState({
          errorSubmitting: 'Sorry, application with this email already exists.',
          isSubmitting: false,
        });
      } else {
        this.setState({
          errorSubmitting: 'Sorry, something went wrong while sending your application. Please, try again.',
          isSubmitting: false,
        });
      }
    });
  }

  render() {
    const submitBtnText = this.state.isSubmitting ? 'Submitting...' : 'Apply';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="applicationForm__section">
          <label htmlFor="gender" className="applicationForm__inputCaption">Gender</label>
          <select
            name="gender"
            value={this.state.data.gender}
            required
            className="applicationForm__input"
            onChange={this.onChange}
          >
            <option value="" />
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div className="applicationForm__section">
          <label htmlFor="firstName" className="applicationForm__inputCaption">First Name</label>
          <input
            type="text"
            name="firstName"
            value={this.state.data.firstName}
            required
            pattern="^\S(.*\S)?$"
            title="Should not contain leading and trailing spaces and
             more than one space in-beetwen characters"
            maxLength="255"
            className="applicationForm__input"
            onChange={this.onChange}
          />
        </div>
        <div className="applicationForm__section">
          <label htmlFor="lastName" className="applicationForm__inputCaption">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={this.state.data.lastName}
            required
            pattern="^\S(.*\S)?$"
            title="Should not contain leading and trailing spaces and
             more than one space in-beetwen characters"
            maxLength="255"
            className="applicationForm__input"
            onChange={this.onChange}
          />
        </div>
        <div className="applicationForm__section">
          <label htmlFor="email" className="applicationForm__inputCaption">Email</label>
          <input
            type="email"
            name="email"
            value={this.state.data.email}
            required
            maxLength="255"
            className="applicationForm__input"
            onChange={this.onChange}
          />
        </div>
        <div className="applicationForm__section">
          <label htmlFor="phone" className="applicationForm__inputCaption">Phone</label>
          <input
            type="text"
            name="phone"
            value={this.state.data.phone}
            required
            pattern="^\+?(\d){7,12}$"
            title="Must be from 7 to 12 digits, optionally starting with a '+'"
            size="13"
            maxLength="13"
            className="applicationForm__input"
            onChange={this.onChange}
          />
        </div>
        <div className="applicationForm__section">
          <label htmlFor="age" className="applicationForm__inputCaption">Age</label>
          <input
            type="number"
            name="age"
            min="1"
            max="99"
            value={this.state.data.age}
            required
            className="applicationForm__input"
            onChange={this.onChange}
          />
        </div>
        <div className="applicationForm__section">
          <label htmlFor="zip" className="applicationForm__inputCaption">ZIP</label>
          <input
            type="text"
            name="zip"
            value={this.state.data.zip}
            required
            pattern="^(\d){3,5}$"
            title="Must be from 3 to 5 digits"
            onChange={this.onChange}
            size="5"
            maxLength="5"
            className="applicationForm__input"
          />
        </div>
        <div className="applicationForm__section">
          <input
            type="checkbox"
            name="isTermsAccepted"
            checked={this.state.data.isTermsAccepted}
            required
            onChange={this.onCheckboxChange}
          />
          <label
            htmlFor="isTermsAccepted"
            className="applicationForm__checkboxCaption"
          >
            I have read and accept terms &amp; conditions
          </label>
        </div>
        <div className="applicationForm__submitSection">
          <input
            type="submit"
            value={submitBtnText}
            disabled={this.state.isSubmitting}
            className="applicationForm__submitButton"
          />
          <div className="applicationForm__submissionError">
            {this.state.errorSubmitting}
          </div>
        </div>
      </form>
    );
  }
}

export default TrialApplicationForm;
