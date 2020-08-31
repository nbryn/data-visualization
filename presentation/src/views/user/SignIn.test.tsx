import * as redux from 'react-redux';
import {fireEvent} from '@testing-library/react';
import React from 'react';

import {render, screen} from '../../test-utils';
import Signin from './Signin';

const mockEmail = 'test@test.com';
const mockPassword = 'passwordTester';

const mockLogin = jest.fn();
const mockDispatch = jest.fn(() => mockLogin());

jest.spyOn(redux, 'useDispatch').mockImplementation().mockReturnValue(mockDispatch);

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
   useHistory: () => ({
      push: mockHistoryPush,
   }),
}));

afterEach(() => {
   jest.clearAllMocks();
});

describe('Signin.test.jsx', () => {
   describe('calls the correct functions', () => {
      it('calls useDispatch on submit ', () => {
         render(<Signin />);

         fireEvent.change(screen.getByLabelText(/email/i), {target: {value: mockEmail}});
         fireEvent.change(screen.getByLabelText(/password/i), {target: {value: mockPassword}});

         fireEvent.submit(screen.getByRole('button'));

         expect(mockDispatch).toHaveBeenCalledTimes(1);
      });
      it('calls login on submit', () => {
         render(<Signin />);

         fireEvent.change(screen.getByLabelText(/email/i), {target: {value: mockEmail}});
         fireEvent.change(screen.getByLabelText(/password/i), {target: {value: mockPassword}});

         fireEvent.submit(screen.getByRole('button'));

         expect(mockLogin).toHaveBeenCalledTimes(1);
      });
      it('calls history on submit', async () => {
         render(<Signin />);

         fireEvent.change(screen.getByLabelText(/email/i), {target: {value: mockEmail}});
         fireEvent.change(screen.getByLabelText(/password/i), {target: {value: mockPassword}});

         await fireEvent.submit(screen.getByRole('button'));

         expect(mockHistoryPush).toHaveBeenCalledTimes(1);
      });
   });
   describe('text fields work correctly', () => {
      it('contains the correct email value', () => {
         render(<Signin />);

         const emailInput = screen.getByLabelText(/email/i);
         fireEvent.change(emailInput, {target: {value: mockEmail}});
         const emailHtml = emailInput.outerHTML;

         expect(emailHtml).toContain(mockEmail);
      });
      it('contains the correct password value', () => {
         render(<Signin />);

         const passwordInput = screen.getByLabelText(/password/i);
         fireEvent.change(passwordInput, {target: {value: mockPassword}});
         const passwordHtml = passwordInput.outerHTML;

         expect(passwordHtml).toContain(mockPassword);
      });
   });
   describe('spinner works correctly', () => {
      it('spinner is not showing when not loading ', () => {
         render(<Signin />);

         expect(screen.queryByRole('progressbar')).toBeFalsy();
      });
   });
});
