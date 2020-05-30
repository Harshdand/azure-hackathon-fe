import React, { useState } from 'react';
import { CommandBar } from '@fluentui/react';
import { useGetUser } from '../../hooks/useGetUser';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import GovtUserSearch from './govt-user-search/govt-user-search';
import { logout } from '../../utils/token';

const GovtDashboard = () => {
  const [, setRefresh] = useState(false);
  const { path } = useRouteMatch();
  const { user } = useGetUser();
  const items = [
    {
      key: 'tile',
      style: { fontSize: '16px' },
      text: 'Govt Dashboard',
      iconProps: { iconName: 'CityNext' },
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
              setRefresh(true);
            },
          },
        ],
      },
    },
  ];

  return (
    <div>
      <CommandBar items={items} farItems={farItems} />
      <Switch>
        <Route
          path={`${path}`}
          render={(props) => <GovtUserSearch {...props} />}
        />
      </Switch>
      {!user && <Redirect to={`/govt/login`} />}
    </div>
  );
};

export default GovtDashboard;
