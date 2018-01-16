import React from 'react';
import ReactDOM from 'react-dom';

import { Login } from './Login';

describe('<Login />', () => {
  it('renders without crashing', () => {
    expect(shallow(<Login />)).toBeTruthy();
  });

  it('should dispatch action when submitting form', () => {
    const email = 'a@a.com';
    const password = 'password';
    const tryLogin = jest.fn();
    const comp = shallow(<Login tryLogin={tryLogin} />);

    comp
      .find('input[name="email"]')
      .simulate('change', { target: { name: 'email', value: email } });
    comp
      .find('input[name="password"]')
      .simulate('change', { target: { name: 'password', value: password } });
    comp.find('form').simulate('submit', { preventDefault: () => true });

    expect(tryLogin).toHaveBeenCalledWith(email, password);
  });
});
