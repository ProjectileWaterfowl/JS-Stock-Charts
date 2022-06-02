async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    //Two lines below commented out to compensate for limited fetch requests
    //const response = await fetch("https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=d1b5c90ccf6a40409a7e1f49641a6375");
    //const result = await response.json();
    
    //console.log(await(result));

    const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];

    //console.log(stocks);

    stocks.forEach((stock) => stock.values.reverse());

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });
    
    new Chart(highestPriceChartCanvas.getContext("2d"), {
        type: "bar",
        data: {
            labels: stocks.map((stock) => stock.meta.symbol),
            datasets: [{
                label: "Highest stock value",
                data: stocks.map((stock) => getHighest(stock.values)),
                backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
                borderColor: stocks.map((stock) => getColor(stock.meta.symbol))
            }]
        }
    });

    // no time
    // new Chart(averagePriceChartCanvas.getContext('2d'), {
    //     type: 'line',
    //     data: {
    //         labels: stocks[0].values.map(value => value.datetime),
    //         datasets: stocks.map( stock => ({
    //             label: stock.meta.symbol,
    //             data: stock.values.map(value => parseFloat(value.high)),
    //             backgroundColor:  getColor(stock.meta.symbol),
    //             borderColor: getColor(stock.meta.symbol),
    //         }))
    //     }
    // });

    console.log(stocks[0].values)
    console.log(stocks.values)      

}

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

//There should be a way to use math.max, right? Can't tell if that would be better

function getHighest(values) {
    let highest = 0;
    values.forEach((value) => {
      if (parseFloat(value.high) > highest) {
        highest = value.high;
      }
    });
    return highest;
}
  

main()

