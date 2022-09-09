import { createSlice } from '@reduxjs/toolkit';
import { handleActionToGetGyms } from './gyms.action';

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {},
  reducers: {},
});
export default appointmentsSlice.reducer;
