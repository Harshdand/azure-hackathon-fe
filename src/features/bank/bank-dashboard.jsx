import React, { useState } from 'react';
import { CommandBar } from '@fluentui/react';
import { useGetUser } from '../../hooks/useGetUser';
import BankUserSearch from './bank-user-search/bank-user-search';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { logout } from '../../utils/token';
import BankUserCreate from './bank-user-create/bank-user-create';
import BankUserUpdate from './bank-user-update/bank-user-update';

const BankDashboard = () => {
  const [, setRefresh] = useState(false);
  const { path } = useRouteMatch();
  const { user } = useGetUser();
  const items = [
    {
      key: 'tile',
      text: 'Bank Dashboard',
      style: { fontSize: '16px' },
      iconProps: { iconName: 'Bank' },
    },
  ];
  const farItems = [
    {
      key: 'user',
      text: `${user?.firstName} ${user?.lastName}`,
      iconProps: { iconName: 'contact' },
      subMenuProps: {
        items: [
          {
            key: 'logout',
            text: 'Logout',
            iconProps: { iconName: 'FollowUser' },
            onClick: () => {
              logout();
              setRefresh();
            },
          },
        ],
      },
    },
  ];

  return (
    <div>
      <CommandBar items={items} farItems={farItems} className="hc-shadow" />
      <Switch>
        <Route
          path={`${path}/user/new`}
          render={(props) => <BankUserCreate {...props} />}
        />
        <Route
          path={`${path}/user/update/:id`}
          render={(props) => <BankUserUpdate {...props} />}
        />
        <Route
          path={`${path}`}
          render={(props) => <BankUserSearch {...props} />}
        />
      </Switch>
      {!user && <Redirect to={`/bank/login`} />}
    </div>
  );
};

export default BankDashboard;
