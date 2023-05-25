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

     //victimas por sexo
    const victimasPorSexo = data.reduce((acc, obj) => {
        const sexo = obj.sexo || 'Desconocido';
        acc[sexo] = acc[sexo] ? acc[sexo] + 1 : 1;
        return acc;
      }, {});   
  
      // Ordenar los sexo de vehículos por cantidad de víctimas de mayor a menor
      const sexoOrdenados = Object.keys(victimasPorSexo).sort((a, b) => {
        return victimasPorSexo[b] - victimasPorSexo[a];
      });
    //victimas por sexo
    const sexoFiltrados = sexoOrdenados.filter(sexo => victimasPorSexo[sexo] > 100);
      //Obtener sexo
    const SexoTop = sexoOrdenados.slice(0, 2);

const canvasSexo = document.getElementById('chartSexo');
const ctxSexo = canvasSexo.getContext('2d');
  
new Chart(ctxSexo, {
    type: 'pie',
    data: {
      labels: SexoTop,
      datasets: [{
        data: SexoTop.map(tipo => victimasPorSexo[tipo]),
        backgroundColor: [         
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 0, 0, 0.7)',
          'rgba(0, 255, 0, 0.7)',
          'rgba(0, 0, 255, 0.7)',
          'rgba(128, 128, 128, 0.7)' // Se agregó un color adicional para el décimo tipo de vehículo
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
        }
    },
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Victimas por Sexo',
        }
    }
  });
  
  });

  