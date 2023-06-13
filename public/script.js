var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let nav = document.querySelector(".navbar");
  var currentScrollPos = window.pageYOffset;  
      if (prevScrollpos < currentScrollPos) {
      nav.style.top = "-100px";
    } else {
      nav.style.top = "0";
    }

  prevScrollpos = currentScrollPos;
};

AOS.init();
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    
    const loader = document.getElementById('contenedor')
    loader.style.display = 'none'

    const contentBtn = document.querySelectorAll('.content-btn')
    contentBtn.forEach(btn => btn.style.display = 'revert');   
    const victimasPorVehiculo = data.reduce((acc, obj) => {
      const tipoVehiculo = obj.tipo || 'Desconocido';
      acc[tipoVehiculo] = acc[tipoVehiculo] ? acc[tipoVehiculo] + 1 : 1;
      return acc;
    }, {});
    
    const victimasPorComuna = data.reduce((acc, obj) => {
      const comuna = obj.comuna || 'Desconocida';
      acc[comuna] = acc[comuna] ? acc[comuna] + 1 : 1;
      return acc;
    }, {});

    // Ordenar los tipos de vehículos por cantidad de víctimas de mayor a menor
    const tiposOrdenados = Object.keys(victimasPorVehiculo).sort((a, b) => {
      return victimasPorVehiculo[b] - victimasPorVehiculo[a];
    });

    // Obtener las comunas con mayor cantidad de víctimas
    const comunasOrdenadas = Object.keys(victimasPorComuna).sort((a, b) => {
      return victimasPorComuna[b] - victimasPorComuna[a];
    });
    //Obtener comunas
    const ComunasTop15 = comunasOrdenadas.slice(0, 15);

    // Obtener los tipos de vehículos con más de 100 víctimas
const tiposFiltrados = tiposOrdenados.filter(tipo => victimasPorVehiculo[tipo] > 100);

const canvasVehiculos = document.getElementById('chartVehiculos');
const ctxVehiculos = canvasVehiculos.getContext('2d');

new Chart(ctxVehiculos, {
  type: 'pie',
  data: {
    labels: tiposFiltrados,
    datasets: [{
      data: tiposFiltrados.map(tipo => victimasPorVehiculo[tipo]),
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(0, 0, 255, 0.7)',
        'rgba(128, 128, 128, 0.7)',
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
      },
      title: {
        display: true,
        text: 'Victimas por tipo de vehiculo',
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
      text: 'Los Tipos de Vehículos con Más de 100 Víctimas',
      }
  }
});

    const canvasComunas = document.getElementById('chartComunas');
    const ctxComunas = canvasComunas.getContext('2d');

    new Chart(ctxComunas, {
      type: 'bar',
      data: {
        labels: ComunasTop15,
        datasets: [{
          label: 'Cantidad de Víctimas por comuna',
          data: ComunasTop15.map(comuna => victimasPorComuna[comuna]),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 0, 0, 0.7)',
            'rgba(0, 255, 0, 0.7)',
            'rgba(0, 0, 255, 0.7)',
            'rgba(128, 128, 128, 0.7)' // Se agregó un color adicional para el décimo tipo de vehículo
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
          },
          title: {
            display: true,
            text: 'Victimas por Comuna',
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
          text: 'Cantidad de Víctimas por Comuna'
        }
      }
    });
  });
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.querySelector(".btn-description");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 

function canvas(id){
  var descGraph = document.getElementById("description-"+id).textContent;
  var titGraph = document.getElementById("title-"+id).textContent;
  var descModal = document.getElementById("text-modal");
  var titModal = document.getElementById("title-modal");
    titModal.textContent = titGraph
    descModal.textContent = descGraph;
    modal.style.display = "block";
  
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var links = document.querySelector(".collapse")

