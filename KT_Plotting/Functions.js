function P_z(B, t) //Average polarisation of a single muon in a static field, integrated over a sphere
{
	return 1/3 + 2/3*Math.cos(B*t)
}

// Standard Normal variate using Box-Muller transform.
function randn_bm() 
{
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function genP_z(B) //Generates a polarisation function as in P_z for a given value of B
{
	var i = 0, data = [];
	for (i = 0; i < 100; i++)
	{
		data[i] = P_z(B,i);
	}
	return data;
}

function addToKT(oldData) //One step of constructing a static Kubo-Toyabe function in one dimension
{
	var KT = oldData, i = 0;
	var newData = genP_z(randn_bm());
	
	for (i = 0, i <= oldData.length, i++)
	{
		KT[i] += newData[i];
	}
	
	return KT;
}