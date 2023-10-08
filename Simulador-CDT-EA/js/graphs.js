
function regresarAtras() {
    window.history.back();
}

function recuperarCapitalInstance() {
    // Retrieve the string from local storage
    let capitalInstanceString = localStorage.getItem('datos_tabla');
    console.log(capitalInstanceString);  // Add this line to see what's being retrieved


    // Convert the string back to an object
    let capitalInstance = JSON.parse(capitalInstanceString);


    return capitalInstance;
}

function generateTable() {

    let capitalInstance = recuperarCapitalInstance(); //Leer los datos

    // Generate the table based on the Capital instance data
    let tableBody = document.querySelector("#resultsTable tbody");
    tableBody.innerHTML = "";  // Clear the current table

    for (let row of capitalInstance.data) {
        let tr = document.createElement("tr");

        let tdPeriodo = document.createElement("td");
        tdPeriodo.innerText = row.Periodo;
        tr.appendChild(tdPeriodo);

        let tdInversion = document.createElement("td");
        tdInversion.innerText = row['Inversión'];
        tr.appendChild(tdInversion);

        let tdRendimientos = document.createElement("td");
        tdRendimientos.innerText = row.Rendimientos;
        tr.appendChild(tdRendimientos);

        let tdAhorro = document.createElement("td");
        tdAhorro.innerText = row.Ahorro;
        tr.appendChild(tdAhorro);

        let tdSaldo = document.createElement("td");
        tdSaldo.innerText = row.Saldo;
        tr.appendChild(tdSaldo);

        tableBody.appendChild(tr);
    }
    // Sumar toda la columna rendimientos
    let sum = 0;

    for (let i = 0; i < capitalInstance.data.length; i++) {
        sum += capitalInstance.data[i].Rendimientos;
    }

    document.getElementById("Total").innerHTML = "Total: "+sum.toFixed(3);;    
    generateChart(capitalInstance);
}

function generateChart(capitalInstance) {
    // Extract data for the chart from the capitalInstance data
    let labels = capitalInstance.data.map(row => row['Periodo']);
    let data = capitalInstance.data.map(row => row['Rendimientos']);

    // Configuración del gráfico
    let ctx = document.getElementById('capitalChart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels, // Etiquetas para los puntos del gráfico. Ajusta según tus datos.
            datasets: [
                {
                    label: 'Rendimientos',
                    data: data,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false
                    
                },
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Create the chart (this is a simulation, in a real environment we would use Chart.js functions
    console.log("Generating chart with labels:", labels, "and data:", data);
}


window.addEventListener('load', function() {
    generateTable();
});


function exportarCSV() {
    var tabla = document.getElementById("resultsTable");
    var filas = tabla.querySelectorAll("tr");
    var csv = [];

    for (var i = 0; i < filas.length; i++) {
        var fila = filas[i];
        var columnas = fila.querySelectorAll("td, th");
        var csvFila = [];

        for (var j = 0; j < columnas.length; j++) {
            var columna = columnas[j];
            csvFila.push(columna.innerText);
        }

        csv.push(csvFila.join(","));
    }

    var csvString = csv.join("\r\n");
    var blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    var enlace = document.createElement("a");
    
    var url = URL.createObjectURL(blob);
    enlace.href = url;
    enlace.download = "tabla.csv";
    
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}

