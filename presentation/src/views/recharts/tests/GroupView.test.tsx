import * as redux from 'react-redux';
import React from 'react';

import {render, screen} from '../../../test-utils';
import GroupView from '../GroupView';

const mockUpdateGroupView = jest.fn();
const mockDispatch = jest.fn(() => mockUpdateGroupView());

jest.spyOn(redux, 'useDispatch').mockImplementation().mockReturnValue(mockDispatch);

const totalGroups = 'Total Groups';
const groupsPerCountry = 'Groups Per Country';

afterEach(() => {
   jest.clearAllMocks();
});

describe('GroupView.test.jsx', () => {
   describe('calls the correct functions', () => {
      it('calls dispatch on mount', () => {
         render(<GroupView />);

         expect(mockDispatch).toHaveBeenCalled();
      });
      it('calls updateGroupView on mount', () => {
         render(<GroupView />);

         expect(mockUpdateGroupView).toHaveBeenCalled();
      });
   });
   describe('renders the correct text', () => {
      it(`renders the text ${totalGroups}`, () => {});
      render(<GroupView />);

      expect(screen.getAllByText(totalGroups)).toBeTruthy();
   });
   it(`renders the text ${groupsPerCountry}`, () => {
      render(<GroupView />);

      expect(screen.getAllByText(groupsPerCountry)).toBeTruthy();
   });
});
