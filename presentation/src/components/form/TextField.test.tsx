import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import MaterialUITextField from '@material-ui/core/TextField';

import '../../setupTests';
import TextField from './TextField';

let wrapper: ShallowWrapper;
const label = 'Email Address';
const id = 'Password';
const value = 'Email';
const size = 'small';
const margin = 'normal';

const mockValidate = jest.fn();
const mockFormField = jest.fn();
const mockOnChange = jest.fn();

beforeEach(() => {
    wrapper = shallow(
        <TextField
            label={label}
            id={id}
            value={value}
            size={size}
            margin={margin}
            formField={mockFormField({handleValidation: mockValidate})}
            onChange={mockOnChange}
        />
    );
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('TextField.test.jsx', () => {
    it('renders one material ui <TextField /> component', () => {
        expect(wrapper.find(MaterialUITextField)).toHaveLength(1);
    });
    it('renders correct label text', () => {
        expect(wrapper.props().label).toEqual(label);
    });
    it('stores correct id', () => {
        expect(wrapper.props().id).toEqual(id);
    });
    it('stores correct value', () => {
        expect(wrapper.props().value).toEqual(value);
    });
    it('stores correct size', () => {
        expect(wrapper.props().size).toEqual(size);
    });
    it('stores correct margin', () => {
        expect(wrapper.props().margin).toEqual(margin);
    });
    it('it calls validation handler on input', () => {
        wrapper.find(MaterialUITextField).simulate('input', {
            target: {value: 'Jamii'},
        });

        expect(mockFormField).toHaveBeenCalled();
    });
    it('it calls onChange', () => {
        wrapper.find(MaterialUITextField).simulate('change', {
            target: {value: 'Jamii'},
        });

        expect(mockOnChange).toHaveBeenCalled();
    });
});
