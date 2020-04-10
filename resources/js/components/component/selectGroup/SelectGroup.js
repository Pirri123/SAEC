import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'Grupo 1', label: 'Grupo 1' },
  { value: 'Grupo 2', label: 'Grupo 2' },
  { value: 'Grupo 3', label: 'Grupo 3' },
  { value: 'Grupo 4', label: 'Grupo 4' },
  { value: 'Grupo 5', label: 'Grupo 5' },
  { value: 'Grupo 6', label: 'Grupo 6' },
  { value: 'Grupo 7', label: 'Grupo 7' },
];


class Grupo extends React.Component {

  state = {
      selectedOptionGroup: null,
    }

    handleChange = (selectedOption) => {
      this.setState({selectedOption});
    }

    render() {
      const { selectedOption } = this.state;
      return (
        <div>
          <div className="Calendar__Space"/>
          <div className="Hour">
            <p className="Hour__P"> Selecciona el grupo: </p>
            <Select className="Hour__Select" defaultValue={this.props.options[0]} value={selectedOption} onChange={this.props.onChangeGroup} options={this.props.options} />
          </div>
          <div className="Calendar__Space"/>
        </div>
      );
    }
}

export default Grupo;
