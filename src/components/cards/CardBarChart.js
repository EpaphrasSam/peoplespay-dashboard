import React,{useState, useEffect} from "react";
import {Chart} from "chart.js";
import ReportService from "../../services/reports.service";
import moment from "moment";
import ChartLoader from './LoadChart'
const Moment = require("moment");

export default function CardBarChart() {

  const [dates] = useState([]);
  const [successData] = useState([]);
  const [failureData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  
  useEffect(() => {

    loadGraph().then(d=>{
      setLoading(true)
      let config = {
        type: "bar",
        data: {
          labels: dates,
          datasets: [
            {
              label: 'successful transactions',
              backgroundColor: "#aeedfc",
              borderColor: "#ed64a6",
              data: successData,
              fill: false,
              barThickness: 8,
            },
            {
              label: 'failed transactions',
              fill: false,
              backgroundColor: "#f25a66",
              borderColor: "#4c51bf",
              data: failureData,
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
  }, []);

  const loadGraph = async () => {
    try {
      const res = await ReportService.dateFilter("2022-01-01", new Date().toISOString());
      const trs = res.data;
      const tr = trs?.sort(
        (a, b) =>
          new Moment(a.createdAt).format("YYYYMMDD") -
          new Moment(b.createdAt).format("YYYYMMDD")
      );

      dates.push(moment(tr[0].createdAt).format("YYYY/MMM"));
      
      //@Loops tr
      //@takes year month 
      for (let i = 0; i < tr.length; i++) {
        let tr_year = moment(tr[i].createdAt).format("YYYY/MMM");
        if (!dates?.includes(tr_year)) {
          dates?.push(tr_year);
        } else {
          continue;
        }
      }
      //@Loops tr
      //@Groups transactions
      for (let i = 0; i < dates?.length; i++) {
        let sucessCount = 0;
        let failureCount = 0;

        for (let x = 0; x < tr.length; x++) {
          const isSuccessful= tr[x].status === "paid" && tr[x].debit_status === "paid";
          const isFailure= tr[x].debit_status === "failed" 

          //Check tr date in dates and increase count
          if (isSuccessful && moment(tr[x].createdAt).format("YYYY/MMM") === dates?.[i]) {
            sucessCount += 1;
          }

          if (isFailure && moment(tr[x].createdAt).format("YYYY/MMM") === dates?.[i]) {
            failureCount += 1;
          }
        }
        successData?.push(sucessCount.toString());
        failureData?.push(failureCount.toString());
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded h-auto">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Realtime App Performance
              </h6>
              <h2 className="text-gray-700 text-xl font-semibold">
                Total transactions
                {!isLoading && <ChartLoader/>}
              </h2>
            </div>
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
