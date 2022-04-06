import React,{useState, useEffect} from "react";
import {Chart, registerables} from "chart.js";
import ReportService from "../../services/reports.service";
import moment from "moment";
const Moment = require("moment");

Chart.register(...registerables)

export default function CardLineChart() {
  
  const [dates] = useState([]);
  const [sales_TrData] = useState([]);
  const [cumulativeSales_TrData] = useState([0]);
  const [slicedCumulativeData] = useState([])
  
  useEffect(() => {
    loadGraph().then(d=>{
      var config = {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: 'cumulative sales',
              backgroundColor: "#ef4444",
              borderColor: "#ef4444",
              data: [],
              fill: false,
            },
            {
              label: 'monthly sales',
              fill: false,
              backgroundColor: "#0284c7",
              borderColor: "#0284c7",
              data: sales_TrData,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Sales Charts",
            fontColor: "black",
          },
          plugins:{
            datalabels: {
              color: 'rgba(0,0,0,.4)',
              labels: {
                title: {
                  font: {
                    weight: 'bold'
                  }
                },
                value: {
                  color: 'black'
                }
              }
            },
            legend: {
              labels: {
                color: 'rgba(0,0,0,.4)',
              },
              align: "end",
              position: "bottom",
            }
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            x: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Month",
                  fontColor: "white",
                },
                gridLines: {
                  display: false,
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(0, 0, 0, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            y: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                  fontColor: "white",
                },
                gridLines: {
                  borderDash: [3],
                  borderDashOffset: [3],
                  drawBorder: false,
                  color: "rgba(255, 255, 255, 0.15)",
                  zeroLineColor: "rgba(33, 37, 41, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };
      var ctx = document.getElementById("line-chart")
      if(ctx !== null){
        ctx.getContext("2d");
        window.myLine = new Chart(ctx, config);
      }  
      
    }) 
  },[]);

  const loadGraph = async () => {
    try {
      const res = await ReportService.dateFilter("2022-03-01", new Date().toISOString());
      const trs = res.data;
      const tr = trs?.sort(
        (a, b) =>
          new Moment(a.createdAt).format("YYYYMMDD") -
          new Moment(b.createdAt).format("YYYYMMDD")
      );

      dates.push(moment(tr[0].createdAt).format("YYYY/MMM"));
    
      //@Loops tr
      //@takes date month year
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
        let totalSales = 0;
        for (let x = 0; x < tr.length; x++) {
          //Calculate sales
          if (moment(tr[x].createdAt).format("YYYY/MMM") === dates?.[i]) {
            totalSales += parseFloat(tr[x].charges);
          }
        }
        sales_TrData?.push(totalSales);
        console.log(sales_TrData)
      }

      for (let i = 0; i < sales_TrData.length; i++) {
        cumulativeSales_TrData.push(
          Number(sales_TrData?.[i]) + Number(cumulativeSales_TrData[i])
        );
      }

      for (let i = 0; i < cumulativeSales_TrData.length; ++i) {
        slicedCumulativeData.push(cumulativeSales_TrData[i + 1]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white h-auto">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold text-left">
                Overview
              </h6>
              <h2 className="text-blueGray-400 text-xl font-semibold text-left">Sales value</h2>
              <h6 className='text-xs font-thin'>This feature will be ready soon</h6>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-96 text-white">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
     </div>
    </>
  );
}
