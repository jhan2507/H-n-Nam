import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import VennModule from 'highcharts/modules/venn.js';
import { connect } from 'react-redux';

VennModule(Highcharts);

class PieChart3 extends React.Component {
  render() {
    let message = '';
    const { totalPublic, totalPrivate, totalBoth } = this.props;
    if (!(totalPublic || totalPrivate || totalBoth)) {
      message = 'Không có dữ liệu';
      return <div style={{ textAlign: 'center' }}>{message}</div>;
    } else {
      const options = {
        colors: ['#1F78B4', '#A6CEE3', '#262265'],
        credits: {
          enabled: false,
        },
        accessibility: {
          point: {
            valueDescriptionFormat: '{point.name}: {point.longDescription}.',
          },
        },
        plotOptions: {
          series: {
            animation: false,
          },
        },
        series: [
          {
            type: 'venn',
            data: [
              {
                sets: ['Thi thử'],
                value: totalPublic,
                name: 'Thi thử',
              },
              {
                sets: ['Thi thật'],
                value: totalPrivate,
                name: 'Thi thật',
              },
              {
                name: 'Thi cả hai',
                sets: ['Thi thử', 'Thi thật'],
                value: totalBoth,
              },
            ],
          },
        ],
        tooltip: {
          headerFormat:
            '<span style="font-size: 14px"> {point.name}</span><span style="font-size:' +
            ' 10px">{point.value}</span>',
        },
        title: {
          text: 'Biểu đồ biển thị tỉ lệ thí sinh thi <b>Thử/Thật/Cả 2</b>',
          verticalAlign: 'bottom',
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
    totalPrivate: state.statistic.totalPrivate,
    totalPublic: state.statistic.totalPublic,
    totalBoth: state.statistic.totalBoth,
    loading: state.statistic.loading,
  };
};
export default connect(mapStateToProps)(PieChart3);
