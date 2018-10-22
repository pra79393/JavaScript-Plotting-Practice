Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
        min: -1/3
    }
    /*{
        max: 1
    }*/
});

// Our labels along the x-axis
var time = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
// For drawing the lines
var KTdata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var KTnorm = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var polData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var log = 0; //a log of how many times the "addToKT" function has been run



function genP_z(givData, B) //Generates a polarisation function as in P_z for a given value of B
{
    var i = 0,
        data = [];
    for (i = 0; i < givData.length; i++) {
        data[i] = P_z(B, i);
    }
    return data;
}

function randn_bm() 
{
    var randMB = 0;
    for (i = 0; i < 3; i++)
    {
    var u = 0,
        v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    var sum = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    randMB += sum*sum;
    }
    return Math.sqrt(randMB);

}

function P_z(B, t) //Average polarisation of a single muon in a static field, integrated over a sphere
{
    return 1 / 3 + 2 / 3 * Math.cos(B * t)
}

function addToKT(oldData, newData) //One step of constructing a static Kubo-Toyabe function in one dimension
{
    var KT = oldData;
    log++;
    for (i = 0; i < newData.length; i++) 
    {
        KT[i] += newData[i];
    }
    
    return KT;
}

function plot(oldData) 
{
    for (i = 0; i < 10; i++)
    {
        var B = randn_bm();
        polData = genP_z(polData, B);
        KTdata = addToKT(oldData, polData);
        for (i = 0; i < KTdata.length; i++)
        {
            KTnorm[i] = KTdata[i]/log
        }
    }

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, 
    {
        type: 'line',
        data: 
        {
            labels: time,
            datasets: 
            [
                {
                    data: KTnorm,
                    label: "KT",
                    borderColor: "#3e95cd",
                    fill: false
                },
                {
                    data: polData,
                    label: "Polarisation",
                    borderColor: "#8e5ea2",
                    fill: false
                }         

            ]   
        },
        options:
        {
            scales:
            {

            }

        }
    });
}
