'use strict';

    let futureValue,
        invested,
        SIPAmount,
        AmtInvested,
        // MonthlySIP,
        TotalPay,
        catchInvested = document.getElementById("MonthlyEMI"),
        catchMonthlySIP = document.getElementById("MonthlySIP"),
        catchPayable = document.getElementById("Payable"),
        catchshowAmtInvested = document.getElementById("showAmtInvested"),
        catchshowTotalPay = document.getElementById("showTotalValue"),
        catchshowAmps = document.getElementById("showAmps"),
        returnedValue;
        var amountSlider = document.getElementById("myAmount");
        var amountOutput = document.getElementById("inputAmount");
        var roiSlider = document.getElementById("myRoi");
        var roiOutput = document.getElementById("inputRoi");
        var yearSlider = document.getElementById("myYears");
        var yearOutput = document.getElementById("inputYears");

        amountOutput.innerHTML = amountSlider.value;
        roiOutput.innerHTML = roiSlider.value;
        yearOutput.innerHTML = yearSlider.value;

        amountSlider.oninput = function () {
            amountOutput.innerHTML = this.value;
        }
        roiSlider.oninput = function () {
            roiOutput.innerHTML = this.value;
        }
        yearSlider.oninput = function () {
            yearOutput.innerHTML = this.value;
        }

        function showValAmount(newVal) {
            amountSlider.value = newVal;
            calculateIt();
        };
        function showValRoi(newVal) {
            roiSlider.value = newVal;
            calculateIt();
        };
        function showValYears(newVal) {
            yearSlider.value = newVal;
            calculateIt();
        };

        amountSlider.addEventListener("input", updateValueAmount);
        roiSlider.addEventListener("input", updateValueRoi);
        yearSlider.addEventListener("input", updateValueYears);

        function updateValueAmount(e) {
            amountOutput.value = e.srcElement.value;
            calculateIt();
        }
        function updateValueRoi(e) {
            roiOutput.value = e.srcElement.value;
            calculateIt();
        }
        function updateValueYears(e) {
            yearOutput.value = e.srcElement.value;
            calculateIt();
        }

        var calculatorMode = 'sip';
        var heading = document.getElementById("heading");
        var amountLabel = document.getElementById("amountLabel");

        function changeMode(mode){
            calculatorMode = mode;
            heading.innerHTML = mode === 'sip' ? 'SIP Calculator' : 'Lumpsum Calculator';
            amountLabel.innerHTML = mode === 'sip' ? 'Monthly Investment :' : 'Total Investment :';
            calculateIt();
        }
        let myChart;
        function calculateIt() {
            var EMI = document.getElementById("MonthlyEMI");
            var A = document.sipForm.realAmount.value;
            var R = document.sipForm.realRoi.value;
            var N = document.sipForm.realYears.value;


            invested = (formulajs.PMT((R / 100)/12, N * 12, -A, 0, 0));//EMI Monthly

            var MonthlySIP=A*(0.15/100);                                         //-------SIP Monthaly
            console.log(Math.round(MonthlySIP));                                //-------SIP Monthaly
            catchMonthlySIP.innerHTML = "Rs. " + Math.round(MonthlySIP);        //-------SIP Monthaly
                                                    

            var MonthalyEMI=(formulajs.PMT((R / 100)/12, N * 12, -A, 0, 0));    //-------EMI Monthaly
            console.log(Math.round(MonthalyEMI));                             //-------EMI Monthaly
            catchInvested.innerHTML = "Rs. " + Math.round(MonthalyEMI);      //-------EMI Monthaly

            var TotalEMI=(formulajs.SUM(MonthalyEMI*N*12));         //-------EMI Total
            console.log(Math.round(TotalEMI));                     //-------EMI Total


            var TotalInterest=TotalEMI-A;                                          // Interest Payable
            console.log(Math.round(TotalInterest));                               // Interest Payable
            catchPayable.innerHTML = "Rs. " + Math.round(TotalInterest);         // Interest Payable


            var TotalSIP=MonthlySIP*N*12;
            console.log(Math.round(TotalSIP));
            catchshowAmtInvested.innerHTML = "Rs. " + Math.round(TotalSIP);         //  Amount in SIP

            var TotalValueSIP= (formulajs.FV(((1+(15/100))**(1/12))-1,N*12,-MonthlySIP,0,1));
            console.log(Math.round(TotalValueSIP));
            catchshowTotalPay.innerHTML = "Rs. " + Math.round(TotalValueSIP); 

            TotalPay=TotalSIP+TotalEMI+A;
            console.log(Math.round(TotalPay));
            // catchshowTotalPay.innerHTML = "Rs. " + Math.round(TotalPay);         //  Total Pay



            var Test=SIPAmount;
            futureValue=(formulajs.FV((15/100) / 12, N * 12, -Test, 0, 1));//You Receive
            

                    //  Receive

            // catchInvested.innerHTML = "Rs. " + invested.toFixed(2);
            // catchPayable.innerHTML = "Rs. " + returnedValue.toFixed(2);
            // catchshowAmtInvested.innerHTML = "Rs. " + AmtInvested.toFixed(2);
            // catchshowTotalPay.innerHTML = "Rs. " + TotalPay.toFixed(2);
            // catchshowAmps.innerHTML = "Rs. " + futureValue.toFixed(2);
            // console.log('VALUES :', futureValue, invested, returnedValue)

            console.log(invested);
           generateChart(parseInt(futureValue),  parseInt(TotalPay), parseInt(MonthlySIP))
        }
        calculateIt();


        function generateChart(a,b,c) {   
            console.log('CHART===========',a,b,c)
            if (!(isNaN(futureValue), isNaN(invested), isNaN(returnedValue))) {
                if (myChart !== undefined) {
                    myChart.destroy();
                }
                const data = {
                    labels: [
                      'Total',
                      'Invested',
                      'Return'
                    ],
                    datasets: [{
                        data: [a,b,c],
                        backgroundColor: [
                          'rgb(18,97,160)',
                          'rgb(56,149,211)',
                          'rgb(88,204,237)'
                        ],
                        hoverOffset: 4,
                        hoverBorderWidth: 1,
                        hoverBorderColor: '#000',
                        // animation : true,
    // animationEasing : "easeOutSine",
                    }]
                };
                const options= {
                    title: {
                        display: true,
                        text: 'Chart JS Doughnut.',
                    },
                    animation: {
                        animateScale: false,
                        // animationEasing : "easeOutSine",
                        easing: 'easeInCirc',
                        animateRotate: true,
                    },
                    cutout: '70%', // the portion of the doughnut that is the cutout in the middle
                    // radius: 150
                }
                const config = {
                    type: 'doughnut',
                    data: data,
                    options:options
                };
                myChart = new Chart(
                  document.getElementById('myChart'),
                  config
                );
            }
        };