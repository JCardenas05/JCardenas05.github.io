// Functions from finutils.py
function teaToTem(tea) {
    let tem = Math.pow((1 + tea / 100), 1 / 12) - 1;
    return tem;
}

function CDT_Rendimientos(inversion, tea, meses, porcentaje_retencion = 0, res = 2) {
    let tem = teaToTem(tea);
    let monto_final = inversion * Math.pow((1 + tem), meses);
    let rendimiento = monto_final - inversion;
    let retencion = rendimiento * porcentaje_retencion / 100;
    let monto_total = monto_final - retencion;
    return parseFloat(monto_total.toFixed(res));
}

// Class Capital from main.py
class Capital {
    constructor(ahorro_inicial, ahorro_mensual, EA, plazo_años, periodo, retencion = 0, res = 3) {
        this.ahorro_mensual = ahorro_mensual;
        this.tiempo = plazo_años;
        this.EA = EA;
        this.TEA = teaToTem(this.EA);
        this.plazo_meses = periodo;
        this.saldo_init = ahorro_inicial;
        this.ahorro = ahorro_mensual;
        this.rendimiento = this.run_inversion(this.plazo_meses, retencion, res);
    }

    run_inversion(meses, retencion, res) {
        this.data = [];
        this.saldo = this.saldo_init;
        let EA = this.EA;
        let periodos = Math.floor(this.tiempo / meses);
        let periodo = 0;
        let ahorro = 0;
        for (let i = 0; i < periodos; i++) {
            periodo += 1;
            let inversion = this.saldo;
            let rendimiento_plazo = CDT_Rendimientos(inversion, EA, meses, retencion, res);
            ahorro += this.ahorro_mensual * 3;
            this.saldo = rendimiento_plazo + this.ahorro_mensual * 3;
            this.data.push({
                'Periodo': periodo,
                'Inversión': inversion,
                'Rendimientos': parseFloat((rendimiento_plazo - inversion).toFixed(res)),
                'Ahorro': ahorro,
                'Saldo': this.saldo
            });
        }
    }
}


function generateTable() {
    // Retrieve input values
    let ahorro_inicial = parseFloat(document.getElementById("ahorro_inicial").value);
    let ahorro_mensual = parseFloat(document.getElementById("ahorro_mensual").value);
    let EA = parseFloat(document.getElementById("EA").value);
    let plazo_años = parseFloat(document.getElementById("plazo_años").value)*12;
    let periodo = parseFloat(document.getElementById("periodo").value);
    let retencion = parseFloat(document.getElementById("retencion").value);
    let res = parseFloat(document.getElementById("res").value);

    // Create a Capital instance
    let capitalInstance = new Capital(ahorro_inicial, ahorro_mensual, EA, plazo_años, periodo, retencion, res);

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

    // Create the chart (this is a simulation, in a real environment we would use Chart.js functions)
    console.log("Generating chart with labels:", labels, "and data:", data);
}


