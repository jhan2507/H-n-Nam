import React from 'react';
import Request from '../../common/network/http/Request';
import apiUrls from '../../constants/api';
import get from 'lodash/get';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import './style.scss';

moment.locale('vi');
class PieCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listMonth: [],
      listMonthValue: [],
    };
  }

  componentDidMount() {
    this.getTotal2();
  }

  getTotal2 = () => {
    this.setState({ loading: true });
    return Request.getAllTotal(
      apiUrls.getMonthData,
      {},
      'loading',
      'success',
      'error',
    )
      .then((data) => {
        this.setState({
          listMonth: get(data, 'result', []),
          loading: false,
        });
        const { listMonth, listMonthValue } = this.state;
        listMonth.map((month) => {
          return listMonthValue.push(month.result * 40000);
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const { listMonthValue } = this.state;
    const options = {
      credits: {
        enabled: false,
      },
      title: {
        text: '<b>Doanh thu theo từng tháng</b>',
      },
      subtitle: {
        text: 'Tính từ: tháng 4/2020',
      },

      yAxis: {
        title: {
          text: 'Đơn vị tính: VNĐ',
        },
      },
      legend: {
        align: 'right',
        verticalAlign: 'middle',
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y.toLocaleString();
            },
          },
          enableMouseTracking: false,
        },
      },
      chart: {
        events: {
          load() {
            this.showLoading();
            setTimeout(this.hideLoading.bind(this), 2500);
          },
        },
      },
      xAxis: {
        type: 'datetime',
        labels: {
          enabled: true,
          formatter: (record) =>
            moment.unix(record.value / 1000).format('MM/YYYY'),
        },
      },

      series: [
        {
          name: 'Doanh thu',
          data: listMonthValue,
          pointStart: Date.UTC(2020, 3),
          pointIntervalUnit: 'month',
        },
      ],
    };
    return (
      <div className="home-container">
        <div className="container-fluid">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    );
  }
}

export default PieCharts;
