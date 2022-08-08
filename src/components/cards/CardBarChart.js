import React,{useState, useEffect} from "react";
import {Chart} from "chart.js";
import ReportService from "../../services/reports.service";
import moment from "moment";
import ChartLoader from './LoadChart'

//const Moment = require("moment");

export default function CardBarChart() {
  //const [date,setDate]=useState()
  const [dates] = useState([]);
  const [successData] = useState([]);
  const [failureData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [period, /**setPeriod**/] = useState("MMM/DD") //variable formatter for the date display

//   const handleChange=(e)=>{
//     setPeriod( e.target.value);
//  }
  
  useEffect(() => {

    loadGraph().then(d=>{
      setLoading(true)
      let config = {
        type: "bar",
        data: {
          labels: dates.reverse(),
          datasets: [
            {
              label: 'successful transactions',
              backgroundColor: "#aeedfc",
              borderColor: "#ed64a6",
              data: successData.reverse(),
              fill: false,
              barThickness: 8,
            },
            {
              label: 'failed transactions',
              fill: false,
              backgroundColor: "#f25a66",
              borderColor: "#4c51bf",
              data: failureData.reverse(),
              barThickness: 8,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Orders Chart",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          legend: {
            labels: {
              fontColor: "rgba(0,0,0,.4)",
            },
            align: "end",
            position: "bottom",
          },
          scales: {
            x: [
              {
                display: false,
                scaleLabel: {
                  display: true,
                  labelString: "Month",
                },
                gridLines: {
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(33, 37, 41, 0.3)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            y: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                },
                gridLines: {
                  borderDash: [2],
                  drawBorder: false,
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.2)",
                  zeroLineColor: "rgba(33, 37, 41, 0.15)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };
      let ctx = document.getElementById("bar-chart")
       if(ctx !== null){
         ctx.getContext("2d");
         window.myBar = new Chart(ctx, config);
       }  
    })
    setLoading(false);
  }, [dates,failureData,successData]);

  const loadGraph = async () => {
    try {
      const _m = new Date().getMonth()+1;
      const y = new Date().getFullYear();
      const __m = `0${_m}`
      const m = _m < 10 ? __m : _m;

    
      const res = await ReportService.dateFilter(`${y}-${m}-01`, new Date().toISOString());;
       
      const trs = res.data;
      // const trs = trs?.sort(
      //   (a, b) =>
      //     new Moment(b.createdAt).format("YYYYMMMDD") - new Moment(b.createdAt).format("YYYYMMMDD")
      // );
      // console.log(trs);

      dates.push(moment(trs[0].createdAt).format(period));
      
      //@Loops trs
      //@takes year month 
      for (let i = 0; i < trs.length; i++) {
        let tr_year = moment(trs[i].createdAt).format(period);
        if (!dates?.includes(tr_year)) {
          dates?.push(tr_year);
        } else {
          continue;
        }
      }
      //@Loops trs
      //@Groups transactions
      for (let i = 0; i < dates?.length; i++) {
        let sucessCount = 0;
        let failureCount = 0;

        for (let x = 0; x < trs.length; x++) {
          const isSuccessful= trs[x].status === "paid" && trs[x].debit_status === "paid";
          const isFailure= trs[x].debit_status === "failed" 

          //Check trs date in dates and increase count
          if (isSuccessful && moment(trs[x].createdAt).format(period) === dates?.[i]) {
            sucessCount += 1;
          }

          if (isFailure && moment(trs[x].createdAt).format(period) === dates?.[i]) {
            failureCount += 1;
          }
        }
        successData?.push(sucessCount.toString());
        failureData?.push(failureCount.toString());
      }
    } catch (err) {
      //console.log(err);
    }
  };
  
  return (
    <>
      <div className="font-bold relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded h-auto">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase mb-1 text-xs font-bold">
                Daily App Performance
              </h6>
              <h2 className="text-xl font-semibold">
                Total Transactions
                {!isLoading && <ChartLoader/>}
              </h2>
              {/* <DatePicker
                className="tracking-wide font-segoe bg-indigo-50 text-indigo-500 active:bg-indigo-600 hover:underline text-sm font-bold px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
              /> */}
            </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-96">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
