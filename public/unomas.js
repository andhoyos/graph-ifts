AOS.init();
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    
    const victimasPorRol = data.reduce((acc, obj) => {
      const rol = obj.rol || 'Desconocido';
      acc[rol] = acc[rol] ? acc[rol] + 1 : 1;
      return acc;
    }, {});

    // Obtener las rol con mayor cantidad de víctimas
    const rolOrdenados = Object.keys(victimasPorRol).sort((a, b) => {
      return victimasPorRol[b] - victimasPorRol[a];
    });
    //Obtener rol
    const RolTop15 = rolOrdenados.slice(0, 4);

    const canvasRol = document.getElementById('chartRol');
    const ctxRol = canvasRol.getContext('2d');

    new Chart(ctxRol, {
      type: 'bar',
      data: {
        labels: RolTop15,
        datasets: [{
          label: 'Cantidad de Víctimas por rol',
          data: RolTop15.map(rol => victimasPorRol[rol]),
          backgroundColor: [
            'rgba(255, 0, 0, 0.7)',
        'rgba(0, 255, 0, 0.7)',
        'rgba(0, 0, 255, 0.7)',
        'rgba(128, 128, 128, 0.7)'
         ]
        }]
      },
      options: {
        plugins: {
          legend: {
              display: true,
              labels: {
                  color: '#e9edef'
              }
          },
          title: {
            display: true,
            text: 'Víctimas por Rol',
            padding: {
                top: 10,
                bottom: 20
            },
            font: {
              size: 20
          }
        }
      },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
          }
        },
        title: {
          display: true,
          text: 'Cantidad de Víctimas por Rol'
        }
      }
    });

     //Víctimas por sexo
    const victimasPorSexo = data.reduce((acc, obj) => {
        const sexo = obj.sexo || 'Desconocido';
        acc[sexo] = acc[sexo] ? acc[sexo] + 1 : 1;
        return acc;
      }, {});   
  
      // Ordenar los sexo de vehículos por cantidad de víctimas de mayor a menor
      const sexoOrdenados = Object.keys(victimasPorSexo).sort((a, b) => {
        return victimasPorSexo[b] - victimasPorSexo[a];
      });
    //Víctimas por sexo
    const sexoFiltrados = sexoOrdenados.filter(sexo => victimasPorSexo[sexo] > 100);
      //Obtener sexo
    const SexoTop = sexoOrdenados.slice(0, 2);

const canvasSexo = document.getElementById('chartSexo');
const ctxSexo = canvasSexo.getContext('2d');
  
new Chart(ctxSexo, {
    type:'doughnut',
    data: {
      labels: SexoTop,
      datasets: [{
        data: SexoTop.map(sexo => victimasPorSexo[sexo]),
        backgroundColor: [         
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 0, 0, 0.7)',
          'rgba(0, 255, 0, 0.7)',
          'rgba(0, 0, 255, 0.7)',
          'rgba(128, 128, 128, 0.7)' // Se agregó un color adicional para el décimo sexo de vehículo
        ],
        borderWidth:'1'
      }]
    },
    options: {
      plugins: {
        legend: {
            display: true,
            labels: {
                color: '#e9edef'
            }
        },
        title: {
          display: true,
          text: 'Víctimas por Sexo',
          padding: {
              top: 10,
              bottom: 20
          },
          font: {
            size: 20
        }
      }
    },
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Víctimas por Sexo',
        }
    }
  });
   //Víctimas por Edad
    const victimasPorEdad = data.reduce((acc, obj) => {
      const edad = obj.edad || 'Desconocido';
      acc[edad] = acc[edad] ? acc[edad] + 1 : 1;
      return acc;
    }, {});   

    // Ordenar los Edad de vehículos por cantidad de víctimas de mayor a menor
    const EdadOrdenados = Object.keys(victimasPorEdad).sort((a, b) => {
      return victimasPorEdad[b] - victimasPorEdad[a];
    });
  //Víctimas por Edad
  const EdadFiltrados = EdadOrdenados.filter(Edad => victimasPorEdad[Edad] > 100);
    //Obtener Edad
  const EdadTop = EdadOrdenados.slice(0, 15);

const canvasEdad = document.getElementById('chartEdad');
const ctxEdad = canvasEdad.getContext('2d');

new Chart(ctxEdad, {
  type: 'polarArea',
  data: {
    labels: EdadTop,
    datasets: [{
      data: EdadTop.map(edad => victimasPorEdad[edad]),
      backgroundColor: [         
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 0, 0, 0.7)',
        'rgba(0, 255, 0, 0.7)',
        'rgba(0, 0, 255, 0.7)',
        'rgba(128, 128, 128, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)', // Se agregó un color adicional para el décimo sexo de vehículo
      ],
      borderWidth:'1'
    }]
  },
  options: {
    plugins: {
      legend: {
          display: true,
          labels: {
              color: '#e9edef'
          }
      },
      title: {
        display: true,
        text: 'Víctimas por Edad',
        padding: {
            top: 10,
            bottom: 20
        },
        font: {
          size: 20
      }
    }
  },
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Víctimas por Edad',
      }
  }
});
   //Víctimas por Tipo_colision
   const victimasPorTipo_colision = data.reduce((acc, obj) => {
    const tipo_colision1 = obj.tipo_colision1 || 'Desconocido';
    acc[tipo_colision1] = acc[tipo_colision1] ? acc[tipo_colision1] + 1 : 1;
    return acc;
  }, {});   

  // Ordenar los Tipo_colision de vehículos por cantidad de víctimas de mayor a menor
  const Tipo_colisionOrdenados = Object.keys(victimasPorTipo_colision).sort((a, b) => {
    return victimasPorTipo_colision[b] - victimasPorTipo_colision[a];
  });
//Víctimas por Tipo_colision
const Tipo_colisionFiltrados = Tipo_colisionOrdenados.filter(Tipo_colision => victimasPorTipo_colision[Tipo_colision] > 100);
  //Obtener Tipo_colision
const Tipo_colisionTop = Tipo_colisionOrdenados.slice(0, 10);

const canvasTipo_colision = document.getElementById('chartTipo_colision');
const ctxTipo_colision = canvasTipo_colision.getContext('2d');

new Chart(ctxTipo_colision, {
type: 'scatter',
data: {
  labels: Tipo_colisionTop,
  datasets: [{
    type: 'bar',
    label:'Víctimas por tipo de Colision',
    data: Tipo_colisionTop.map(tipo_colision1 => victimasPorTipo_colision[tipo_colision1]),
    backgroundColor: [         
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)',
      'rgba(255, 0, 0, 0.7)',
      'rgba(0, 255, 0, 0.7)',
      'rgba(0, 0, 255, 0.7)',
      'rgba(128, 128, 128, 0.7)',
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)', // Se agregó un color adicional para el décimo sexo de vehículo
    ],
    borderWidth:'1'
  }]
},
options: {
  plugins: {
    legend: {
        display: true,
        labels: {
            color: '#e9edef'
        }
    },
    title: {
      display: true,
      text: 'Víctimas por Tipo de Colision',
      padding: {
          top: 10,
          bottom: 20
      },
      font: {
        size: 20
    }
  }
},
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: true,
    text: 'Víctimas por Tipo_colision',
    }
}
});
  });

  