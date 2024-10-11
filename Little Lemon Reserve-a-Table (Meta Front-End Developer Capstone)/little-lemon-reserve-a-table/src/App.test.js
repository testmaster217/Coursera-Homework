import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {initializeTimes, updateTimes} from './App';
import ReserveATable from './Pages/ReserveATable';
import ConfirmReservation from './Pages/ConfirmReservation';

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

test('First part of the reservation form can be submitted', () => {
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
  const reserveUserInfo = {
    resFirstName: "",
    setResFirstName: jest.fn(),
    resLastName: "",
    setResLastName: jest.fn(),
    resPhone: "",
    setResPhone: jest.fn(),
    resEmail: "",
    setResEmail: jest.fn(),
    resCCName: "",
    setResCCName: jest.fn(),
    resAddress: "",
    setResAddress: jest.fn(),
    resAddress2: "",
    setResAddress2: jest.fn(),
    resCity: "",
    setResCity: jest.fn(),
    resState: "AL",
    setResState: jest.fn(),
    resZip: "",
    setResZip: jest.fn(),
    resCCNum: "",
    setResCCNum: jest.fn(),
    resExpDate: "",
    setResExpDate: jest.fn(),
    res3Digit: "",
    setRes3Digit: jest.fn()
  }

  render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ReserveATable reserveInfo={reserveInfo}/>}/>
        <Route path='/reserve-page-2' element={<ConfirmReservation reserveUserInfo={reserveUserInfo}/>}/>
      </Routes>
    </BrowserRouter>
  );

  const submitButton = screen.getByText(/Submit Reservation/i);
  fireEvent.click(submitButton);

  const newHeader = screen.getByText(/Confirm your Reservation/i);
  expect(newHeader).toBeInTheDocument();
});