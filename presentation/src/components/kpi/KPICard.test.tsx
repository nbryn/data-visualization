import React from 'react';
import {render, screen} from '@testing-library/react';

import KPICard from './KPICard';

const value = 25649875;
const text = 'Tester';
const valueIcon = 'MockIcon';
const updateIcon = 'fa fa-refresh';
const updateIconText = 'Last Update';

const renderKPICard = (value: number | null) => {
   render(
      <KPICard
         value={value!}
         text={text}
         valueIcon={valueIcon}
         updateIcon={updateIcon}
         updateIconText={updateIconText}
      />
   );
};

describe('KPICard.test.jsx', () => {
   describe('spinner is working', () => {
      it('shows a spinner when loading', () => {
         renderKPICard(null);

         expect(screen.queryByRole('progressbar')).toBeTruthy();
      });
      it('does not show a spinner when loading is finished', () => {
         renderKPICard(12345);

         expect(screen.queryByRole('progressbar')).toBeFalsy();
      });
   });
   describe('chart is rendering correctly', () => {
      it('renders the correct value', () => {
         renderKPICard(value);

         expect(screen.getByText(value.toString())).toBeTruthy();
      });
      it('renders the correct text', () => {
         renderKPICard(value);

         expect(screen.getByText(text)).toBeTruthy();
      });
      it('renders the correct icon text', () => {
         renderKPICard(value);

         expect(screen.getByText(updateIconText)).toBeTruthy();
      });
   });
});
