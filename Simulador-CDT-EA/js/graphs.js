
function regresarAtras() {
    window.history.back();
}

function recuperarCapitalInstance() {
    // Retrieve the string from local storage
    let capitalInstanceString = localStorage.getItem('data');
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

