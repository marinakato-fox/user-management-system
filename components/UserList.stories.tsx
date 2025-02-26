import type { Meta, StoryObj } from '@storybook/react';
import UserList from './UserList';

const meta: Meta<typeof UserList> = {
  title: 'Components/UserList',
  component: UserList,
};

export default meta;

type Story = StoryObj<typeof UserList>;

export const Default: Story = {
  args: {
    users: [{
        id:1,
        name: '加藤用登録テストユーザー',
        email: 'taro.yamada@example.com',
        role: '管理者',
        deleted: false,
    },{
        id:2,
        name: '加藤用登録テストユーザー',
        email: 'taro.yamada@example.com',
        role: '管理者',
        deleted: false,
    }
    ]
  },
};