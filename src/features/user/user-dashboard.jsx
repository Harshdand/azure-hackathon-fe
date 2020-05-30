import React, { useState } from 'react';
import { CommandBar } from '@fluentui/react';
import { useGetUser } from '../../hooks/useGetUser';
import { logout } from '../../utils/token';
import { Redirect } from 'react-router-dom';

const UserDashboard = () => {
  const [, setRefresh] = useState(false);
  const { user } = useGetUser();
  const items = [
    {
      key: 'tile',
      style: { fontSize: '16px' },
      text: 'User Dashboard',
      iconProps: { iconName: 'contact' },
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
      <div>user dashboard</div>
      {!user && <Redirect to={`/user/login`} />}
    </div>
  );
};

export default UserDashboard;
