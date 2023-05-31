fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    const filteredData = data.filter(obj => {
      return obj.victimas !== null && obj.victimas !== "" && obj.victimas !== "Desconocido";
    });

    const victimasPorAnio = filteredData.reduce((acc, obj) => {
      const anio = new Date(obj.fecha).getFullYear();
      acc[anio] = acc[anio] ? acc[anio] + 1 : 1;
      return acc;
    }, {});

    const victimasPorMes = filteredData.reduce((acc, obj) => {
      const mes = new Date(obj.fecha).getMonth();
      acc[mes] = acc[mes] ? acc[mes] + 1 : 1;
      return acc;
    }, {});

    // Filtrar los años con cantidad de víctimas superior a 100
    const aniosFiltrados = Object.keys(victimasPorAnio).filter(anio => victimasPorAnio[anio] > 100);

    // Filtrar los meses con cantidad de víctimas superior a 100
    const mesesFiltrados = Object.keys(victimasPorMes).filter(mes => victimasPorMes[mes] > 100);

    const canvasVictimasPorAnio = document.getElementById('chartVictimasPorAnio');
    const ctxVictimasPorAnio = canvasVictimasPorAnio.getContext('2d');

    new Chart(ctxVictimasPorAnio, {
      type: 'bar',
      data: {
        labels: aniosFiltrados,
        datasets: [{
          label: 'Cantidad de Víctimas por Año',
          data: aniosFiltrados.map(anio => victimasPorAnio[anio]),
          backgroundColor: [
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)'
          ],
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
          text: 'Cantidad de Víctimas por Año (Superior a 100)'
        }
      }
    });

    const canvasVictimasPorMes = document.getElementById('chartVictimasPorMes');
    const ctxVictimasPorMes = canvasVictimasPorMes.getContext('2d');
    const nombresMeses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
    new Chart(ctxVictimasPorMes, {
      type: 'line',
      data: {
        labels: nombresMeses,
        datasets: [{
          label: 'Cantidad de Víctimas por mes',
          data: mesesFiltrados.map(mes => victimasPorMes[mes]),
          borderColor: 'rgba(75, 192, 192, 0.7)',
          fill: false,
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
          text: 'Cantidad de Víctimas por Mes (Superior a 100)'
        }
      }
    });


  });
