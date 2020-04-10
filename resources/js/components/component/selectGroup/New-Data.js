const newData = {
  activities: [
    { name: "Actividad " + 1, date: "Fecha: 14/2/19", hour: "Hora: 10:00 am - 11:30 am", group: "Grupo: Matemáticas 3", status:"Status: Terminada" }
  ]

  students: [
    { id:'student-1', content: 'Luis Fernando Flores Luna', major: 'ITC' },
    { id:'student-2', content: 'Benny A. Ruiz Jimenez', major: 'ITC' },
    { id:'student-3', content: 'Jesus Enrique Librado Polanco', major: 'ITC' },
    { id:'student-4', content: 'Carlos Amador', major: 'ITC' },
    { id:'student-5', content: 'Angel Ruiz', major: 'ITC' },
    { id:'student-6', content: 'Marinat Del Valle Real', major: 'IBT' },
    { id:'student-7', content: 'Jesus Gonzalez', major: 'ITC' },
    { id:'student-8', content: 'Humberto Espinoza', major: 'ITC' },
    { id:'student-9', content: 'Luis Fernando Flores Luna', major: 'ITC' },
    { id:'student-10', content: 'Benny A. Ruiz Jimenez', major: 'ITC' },
    { id:'student-11', content: 'Jesus Enrique Librado Polanco', major: 'ITC' },
    { id:'student-12', content: 'Carlos Amador', major: 'ITC' },
    { id:'student-13', content: 'Angel Ruiz', major: 'ITC' },
    { id:'student-14', content: 'Marinat Del Valle Real', major: 'IBT' },
    { id:'student-15', content: 'Jesus Gonzalez', major: 'ITC' },
    { id:'student-16', content: 'Humberto Espinoza', major: 'ITC' },
  ],
  teams: {
    { id:'column-1', title:'Estudiantes', studentsIds:students},
    { id:'column-2', title:'Equipo 1', studentsIds:[]},
    { id:'column-3', title:'Equipo 2', studentsIds:[]},
    { id:'column-4', title:'Equipo 3', studentsIds:[]},
    { id:'column-5', title:'Equipo 4', studentsIds:[]},
    { id:'column-6', title:'Equipo 5', studentsIds:[]},
    { id:'column-7', title:'Equipo 6', studentsIds:[]},
  },
  teamsOrder: teams,
};

export default newData;
