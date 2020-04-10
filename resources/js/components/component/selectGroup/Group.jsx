import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const TaskList = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  width: 100%;
  height: 5vh;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

const Name = styled.p`
  float: left;
  color: black;
`;

const Matricula = styled.p`
  float: right;
  color: #369ADF;
`;

class Group extends Component {
  render(){
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided,snapshot) => (
          <TaskList
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
          <Name> {this.props.task.content} </Name>
          <Matricula> {this.props.task.major} </Matricula>
          </TaskList>
        )}
      </Draggable>
    );
  }
}

export default Group;
