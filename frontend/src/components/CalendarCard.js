import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css';

const CalendarCard = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl mt-4">
      <Calendar
        className="react-calendar"
        tileClassName="text-center"
      />
    </div>
    );
};

export default CalendarCard;
