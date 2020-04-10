import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const WEEKDAYS_LONG = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
];

const WEEKDAYS_SHORT = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

export default class FinalDate extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: null,
    };
  }
  handleDayClick(day, { selected }) {
    this.setState({
      selectedDay: selected ? null : day,
    });
    this.props.onChange(selected ? null : day);
  }
  render() {
    return (
      <div className="RangeExample">
        <div className="Calendar__Space"/>
          <p className="Calendar__P">
            {this.state.selectedDay
              ? "Seleccionado el " + this.state.selectedDay.toLocaleDateString()
              : 'Selecciona el dia que cerrara completamente la actividad: '}
          </p>
        <div className="Calendar__Space"/>
        <div className="Calendar__Border">
          <DayPicker selectedDays={this.state.selectedDay} onDayClick={this.handleDayClick} months={MONTHS} weekdaysLong={WEEKDAYS_LONG} weekdaysShort={WEEKDAYS_SHORT} numberOfMonths={2}/>
        </div>
      </div>
    );
  }
}
