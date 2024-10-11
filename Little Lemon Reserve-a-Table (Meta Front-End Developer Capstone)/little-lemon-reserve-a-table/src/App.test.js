import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import {initializeTimes, updateTimes} from './App';
import ReserveATable from './Pages/ReserveATable';

test('Renders the "Submit" button for the first page of the reservation form', () => {
  const reserveInfo = {
    resDate: "2024-10-11",
    setResDate: jest.fn(),
    availableTimes: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
    setAvailableTimes: jest.fn(),
    resTime: "17:00",
    setResTime: jest.fn(),
    resGuests: 1,
    setResGuests: jest.fn(),
    resSeating: "No Preference",
    setResSeating: jest.fn(),
    resOccasion: "nothing",
    setResOccasion: jest.fn(),
    resComments: "",
    setResComments: jest.fn()
  };

  render(
    <BrowserRouter>
      <ReserveATable reserveInfo={reserveInfo}/>
    </BrowserRouter>
  );
  const submitButton = screen.getByText(/Submit Reservation/i);
  expect(submitButton).toBeInTheDocument();
});

test('initializeTimes works', () => {
  expect(initializeTimes())
    .toStrictEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
});

test('updateTimes works', () => {
  expect(updateTimes(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]))
    .toStrictEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
});