// components/EditUserForm.stories.tsx

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import EditUserForm from "./EditUserForm";

// TODO: メタデータ
// TODO: ストーリーの定義



const meta: Meta<typeof EditUserForm> = {
    title: 'Components/editUserForm',
    component: EditUserForm,
  };
  
  export default meta;
  
  type Story = StoryObj<typeof EditUserForm>;
  
  export const Default: Story = {
    args: {
      userId: 1, // 例となるユーザーID
    },
  };