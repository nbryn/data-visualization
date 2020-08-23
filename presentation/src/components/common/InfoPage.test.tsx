import React from 'react';
import {render, screen} from '@testing-library/react';

import InfoPage from './InfoPage';

export const column = [
    'Registration Date',
    'Currency',
    'Last Meeting',
    'Box Balance',
    'Amount Per Share',
    'Total Meetings',
    'Total Loans',
    'Total Shares',
    'Owner',
    'Admin',
];

const data = [
    '10/10',
    'ETB',
    '12/12',
    65847,
    23532,
    2,
    2532532,
    64354654,
    'Niklas',
    'Tester',
    [{name: 'Test'}, {name: 'Tester'}, {name: 'Test2'}],
];
const title = 'TesterTitle';
const columns = [
    {
        dataField: 'name',
        text: 'Members',
    },
];

beforeEach(() => {
    render(<InfoPage data={data} title={title} columns={columns} column1={column} />);
});

describe('InfoPage.test.jsx', () => {
    describe('renders correctly', () => {
        it('renders the correct title', () => {
            expect(screen.getByText(title)).toBeTruthy();
        });
        it('renders the correct data', () => {
            expect(screen.getByText(column[0].toString())).toBeTruthy();
            expect(screen.getByText(data[0].toString())).toBeTruthy();
        });
        it('renders the correct data', () => {
            expect(screen.getByText(column[1].toString())).toBeTruthy();
            expect(screen.getByText(data[1].toString())).toBeTruthy();
        });
        it('renders the correct data', () => {
            expect(screen.getByText(column[2].toString())).toBeTruthy();
            expect(screen.getByText(data[2].toString())).toBeTruthy();
        });
        it('renders the correct data', () => {
            expect(screen.getByText(column[7].toString())).toBeTruthy();
            expect(screen.getByText(data[7].toString())).toBeTruthy();
        });
        it('renders the correct data', () => {
            expect(screen.getByText(column[8].toString())).toBeTruthy();
            expect(screen.getByText(data[8].toString())).toBeTruthy();
        });
    });
});
