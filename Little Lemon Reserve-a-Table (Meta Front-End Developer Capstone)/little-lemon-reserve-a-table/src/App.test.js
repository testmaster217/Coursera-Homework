import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import {initializeTimes, updateTimes, submitAPI} from './App';
import App from './App';
import ReserveATable from './Pages/ReserveATable';

beforeEach(() => {
  localStorage.removeItem("TableReservation-2024-10-11-17:00");
});

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

test('initializeTimes returns a non-empty array', () => {
  expect(initializeTimes().length).toBeGreaterThan(0);
});

test('updateTimes works', () => {
  let newDate = new Date("2024-10-11");
  newDate.setDate(newDate.getDate() + 1);

  expect(updateTimes(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"], {type: "changed_date", newDate: newDate})).toStrictEqual(["17:00", "17:30", "18:30", "19:00", "20:30", "21:00", "22:00", "23:30"]);
});

test('First part of the reservation form can be submitted', () => {
  render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  );

  const reserveButton = screen.getByText(/Reserve a Table/i)
  fireEvent.click(reserveButton);

  // !!! THIS ONLY WORKS BECAUSE EVERYTHING ON THE FIRST PAGE !!! //
  // !!! OF THE FORM HAPPENS TO BE VALID BY DEFAULT. UPDATE   !!! //
  // !!! THIS TEST CASE IF THAT CHANGES.                      !!! //
  const submitButton = screen.getByText(/Submit Reservation/i);
  fireEvent.click(submitButton);

  const newHeader = screen.getByText(/Confirm your Reservation/i);
  expect(newHeader).toBeInTheDocument();
});

test('Reservation data is written to local storage.', () => {
  submitAPI({
    resDate: "2024-10-11",
    resTime: "17:00",
    resGuests: 1,
    resSeating: "No Preference",
    resOccasion: "nothing",
    resComments: ""
  });
  console.log(localStorage.getItem("TableReservation-2024-10-11-17:00"));
  submitAPI({
    resDate: "2024-10-11",
    resTime: "17:00",
    resFirstName: "Collin",
    resLastName: "Vesel",
    resPhone: "",
    resEmail: "cvesel217@gmail.com",
    resCCName: "Collin vesel",
    resAddress: "318 S Clayton Ave.",
    resAddress2: "",
    resCity: "Maryville",
    resState: "MO",
    resZip: "64468",
    resCCNum: "0000 0000 0000 0000",
    resExpDate: "10/27",
    res3Digit: "000"
  });

  expect(JSON.parse(localStorage.getItem("TableReservation-2024-10-11-17:00"))).toStrictEqual({
    resDate: "2024-10-11",
    resTime: "17:00",
    resGuests: 1,
    resSeating: "No Preference",
    resOccasion: "nothing",
    resComments: "",
    resFirstName: "Collin",
    resLastName: "Vesel",
    resPhone: "",
    resEmail: "cvesel217@gmail.com",
    resCCName: "Collin vesel",
    resAddress: "318 S Clayton Ave.",
    resAddress2: "",
    resCity: "Maryville",
    resState: "MO",
    resZip: "64468",
    resCCNum: "0000 0000 0000 0000",
    resExpDate: "10/27",
    res3Digit: "000"
  });
});