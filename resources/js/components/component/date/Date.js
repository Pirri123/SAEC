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

export default class Calendar extends React.Component {
  static defaultProps = {
    numberOfMonths: 2,
  };
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }
  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
    this.props.onChange(range);
  }
  handleResetClick() {
    this.setState(this.getInitialState());
  }
  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="RangeExample">
        <div className="Calendar__Space"/>
          <p className="Calendar__P">
            {!from && !to && 'Selecciona el inicio de la actividad'}
            {from && !to && 'Selecciona la fecha final para subir la actividad sin contar como entrega tardia: '}
            {from &&
             to &&
            `Seleccionado del  ${from.toLocaleDateString()} al
                               ${to.toLocaleDateString()}`}{' '}
            {from &&
             to && (
              <button className="Calendar__Reset" onClick={this.handleResetClick}> Reiniciar </button>
            )}
          </p>

          <div className="Calendar__Space"/>
          <div className="Calendar__Border">
          <DayPicker
            className="Selectable"
            numberOfMonths={this.props.numberOfMonths}
            months={MONTHS}
            weekdaysLong={WEEKDAYS_LONG}
            weekdaysShort={WEEKDAYS_SHORT}
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
          />
        </div>
      </div>
    );
  }
}
