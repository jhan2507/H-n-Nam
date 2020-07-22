import RootLayout from 'layouts';
import GeneralStatistic from 'components/general-statistic';
import RecentlyStatistic from 'components/recently-statistic';
import Login from 'layouts/Login';
import Home from 'layouts/Home';
import routes from 'constants/routes';
import ContestByAccount from 'components/result-detail-table';
import ContestByUserID from 'components/result-detail-table';
import AccountByOrganization from 'components/result-account-table';
import Table from 'components/result-table';
import Contestant from 'components/list-contestants';

export default [
  {
    component: RootLayout,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
      },
      {
        path: routes.generalStatistic,
        component: GeneralStatistic,
        exact: true,
      },
      {
        path: routes.recentlyStatistic,
        component: RecentlyStatistic,
      },
      {
        path: routes.dataExport,
        component: RecentlyStatistic,
      },
      {
        path: routes.login,
        component: Login,
      },
      {
        path: routes.contestDetail,
        component: ContestByAccount,
      },
      {
        path: routes.getAccount,
        component: AccountByOrganization,
        exact: true,
      },
      {
        path: `${routes.getContest}:id`,
        component: ContestByUserID,
      },
      {
        path: routes.resultTable,
        component: Table,
        exact: true,
      },
      {
        path: `${routes.viewEssay}:uid/:eid`,
        component: Table,
      },
      {
        path: `${routes.getContestant}:month`,
        component: Contestant,
      },
    ],
  },
];
