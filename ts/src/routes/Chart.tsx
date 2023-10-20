import { useQuery } from "@tanstack/react-query";
import { getCoinHistory } from "../core/api";
import ApexCharts from "react-apexcharts";
import getSafeNumbers from "../utils/getSafeNumbers";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../core/atoms";

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    getCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "Open",
              data: getSafeNumbers(data?.map((price) => price.open)),
            },
            // {
            //   name: "High",
            //   data: getSafeNumbers(data?.map((price) => price.high)),
            // },

            // {
            //   name: "Low",
            //   data: getSafeNumbers(data?.map((price) => price.low)),
            // },
            // {
            //   name: "Close",
            //   data: getSafeNumbers(data?.map((price) => price.close)),
            // },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "trasnparent",
            },
            grid: { show: false },
            stroke: { width: 4 },
            yaxis: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              categories: data?.map(
                (price) => new Date((price.time_close ?? 0) * 1000)
              ),
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["blue"],
                stops: [0, 100],
              },
            },
            colors: ["red"],
            tooltip: {
              y: {
                formatter: (value: number) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
