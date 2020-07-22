import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { connect } from 'react-redux';

class PieCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalFailed: 0,
    };
  }

  render() {
    const { total, totalFailed } = this.props;
    let message = '';
    if (!(total || totalFailed)) {
      message = 'Không có dữ liệu';
      return <div style={{ textAlign: 'center' }}>{message}</div>;
    } else {
      const options = {
        credits: {
          enabled: false,
        },
        chart: {
          type: 'pie',
        },
        loading: {
          showDuration: 100,
        },
        title: {
          text:
            'Biểu đồ biểu thị tỉ lệ thí sinh <b> bị đánh dấu bài/không vi phạm</b>',
          verticalAlign: 'bottom',
        },
        colors: ['#A6CEE3', '#1F78B4'],
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              connectorColor: 'silver',
            },
          },
          series: {
            animation: false,
          },
        },
        series: [
          {
            name: 'Có',
            data: [
              {
                name: 'Không vi phạm',
                y: total - totalFailed,
              },
              {
                name: 'Bị đánh dấu bài',
                y: totalFailed,
              },
            ],
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  align: 'center',
                  verticalAlign: 'bottom',
                  layout: 'horizontal',
                },
                yAxis: {
                  labels: {
                    align: 'left',
                    x: 0,
                    y: -5,
                  },
                  title: {
                    text: null,
                  },
                },
                subtitle: {
                  text: null,
                },
                credits: {
                  enabled: false,
                },
              },
            },
          ],
        },
      };
      return <HighchartsReact highcharts={Highcharts} options={options} />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentMonth: state.statistic.currentMonth,
    total: state.statistic.total,
    totalFailed: state.statistic.totalFailed,
  };
};
export default connect(mapStateToProps)(PieCharts);
