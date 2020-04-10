import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Group from './Group';

const Container = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: auto;
  height: auto;
  flex-flow: row wrap;
  flex-direction: row;
`;

const ContainerGroup = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: auto;
  min-height: ${80/3}vh;;
  flex-flow: row wrap;
  flex-direction: row;
  font-size: 10px;
`;


const Grupos = styled.div`
  overflow-y: scroll;
  margin: 2%;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 13%;
  height: ${80/2.5}vh;
  flex-flow: column wrap;
  flex-direction: column;
`;

const Principal = styled.div`
  overflow-y: scroll;
  margin: 2%;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 40%;
  height: 80vh;
  flex-direction: column;
  flex-flow: column wrap;
`;

class InnerList extends Component{
  shouldComponentUpdate(nextProps){
    if (nextProps.tasks === this.props.tasks) {
      return false
    }
    return true;
  }

  render() {
    return (this.props.tasks.map((task, index) => <Group key={task.id} task={task} index={index} />));
  }
}

class Column extends Component {
  render() {
    if (this.props.column.title === 'Estudiantes') {
      return (
        <Principal>
          <h3 className="Group__Title">{this.props.column.title}</h3>
          <Droppable droppableId={this.props.column.id}>
            {(provided, snapshot) => (
              <Container
                ref={provided.innerRef}
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList tasks={this.props.tasks} />
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </Principal>
      );
    }else {
      return (
        <Grupos>
          <h3 className="Group__Title">{this.props.column.title}</h3>
          <Droppable droppableId={this.props.column.id}>
            {(provided, snapshot) => (
              <ContainerGroup
                ref={provided.innerRef}
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList tasks={this.props.tasks} />
                {provided.placeholder}
              </ContainerGroup>
            )}
          </Droppable>
        </Grupos>
      );
    }
  }
}

export default Column;
