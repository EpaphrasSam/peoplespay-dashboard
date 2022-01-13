import React from "react";
import {Chart, registerables} from "chart.js";

Chart.register(...registerables)

export default function CardLineChart({dates,salesData,cumulativeData}) {
  
  React.useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: 'cumulative sales',
            backgroundColor: "#ef4444",
            borderColor: "#ef4444",
            data: cumulativeData,
            fill: false,
          },
          {
            label: 'monthly sales',
            fill: false,
            backgroundColor: "#0284c7",
            borderColor: "#0284c7",
            data: salesData,
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
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  
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
              <h6 className='text-xs font-thin'>click and unclick on either tile below to load chart</h6>
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
