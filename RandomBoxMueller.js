var distribution =[], distSQ = [];

randn_MB();

function randn_bm() 
{

    //for (i = 0; i < 100; i++)
    //{   var randMB = 0;
      //  for (j = 0; j < 3; j++)
        //{

            var u = 0,
                v = 0;
            while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
            while (v === 0) v = Math.random();
            var sum = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
            square = sum*sum;

          //  dist.push("<br>"+ sum);
            //distSQ.push("<br>"+ square);
        //}
    
    
    //}
    return square;
}

function randn_MB()
{
    for (i = 0; i < 100; i++)
    {
        var randMB = 0;
        for (j = 0; j < 3; j++)
        {
            randMB += randn_bm();
        }

        randMB = Math.sqrt(randMB);

        distribution.push("<br>" + randMB);
    }
}