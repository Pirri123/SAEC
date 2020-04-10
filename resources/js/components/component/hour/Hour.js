import React from 'react';
import Select from 'react-select';

const options = [
{ value: '7:00', label: '7:00' },
{ value: '7:30', label: '7:30' },
{ value: '8:00', label: '8:00' },
{ value: '8:30', label: '8:30' },
{ value: '9:00', label: '9:00' },
{ value: '9:30', label: '9:30' },
{ value: '10:00', label: '10:00' },
{ value: '10:30', label: '10:30' },
{ value: '11:00', label: '11:00' },
{ value: '11:30', label: '11:30' },
{ value: '12:00', label: '12:00' },
{ value: '12:30', label: '12:30' },
{ value: '13:00', label: '13:00' },
{ value: '13:30', label: '13:30' },
{ value: '14:00', label: '14:00' },
{ value: '14:30', label: '14:30' },
{ value: '15:00', label: '15:00' },
{ value: '15:30', label: '15:30' },
{ value: '16:00', label: '16:00' },
{ value: '16:30', label: '16:30' },
{ value: '17:00', label: '17:00' },
{ value: '17:30', label: '17:30' },
{ value: '18:00', label: '18:00' },
{ value: '18:30', label: '18:30' },
{ value: '19:00', label: '19:00' },
{ value: '19:30', label: '19:30' },
{ value: '20:00', label: '20:00' },
{ value: '20:30', label: '20:30' },
{ value: '21:00', label: '21:00' },
{ value: '21:30', label: '21:30' },
{ value: '22:00', label: '22:00' }
];

class Time extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selectedOptionBegin: this.props.selectedOptionBegin,
      selectedOptionEnd: this.props.selectedOptionEnd
    };
  }

    render() {
      const { selectedOption } = this.state;

      return (
        <div>
          <div className="Calendar__Space"/>

          <div className="Hour">
            <p className="Hour__P"> Hora de inicio de la actividad: </p>
            <Select className="Hour__Select" defaultValue={options[0]} value={selectedOption} onChange={this.props.onChangeBegin} options={options} />
          </div>

          <div className="Hour__Space"/>

          <div className="Hour">
            <p className="Hour__P"> Hora del fin de la actividad: </p>
            <Select className="Hour__Select" defaultValue={options[0]} value={selectedOption} onChange={this.props.onChangeEnd} options={options} />
          </div>

          <div className="Calendar__Space"/>
        </div>
      );
    }
}

export default Time;
