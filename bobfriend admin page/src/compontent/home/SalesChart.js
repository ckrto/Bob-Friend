import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const SalesChart = () => {
  const chartoptions = {
    series: [
      {
        name: "방문자 수",
        data: [170023, 192113,164932,210032,245921,278974,299931,312123],
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
        ],
      },
    },
  };
  return (
    <Card className="my-4 mx-2">
      <CardBody >
        <CardTitle tag="h5">방문자 수</CardTitle>
        <CardSubtitle className="text-muted" tag="h6" >
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="400"
          options={chartoptions.options}
          series={chartoptions.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default SalesChart;
