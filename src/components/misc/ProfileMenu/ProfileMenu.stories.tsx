import type { Meta, StoryObj } from "@storybook/react";
import { ProfileMenu } from "./ProfileMenu";

const meta: Meta<typeof ProfileMenu> = {
  title: "Components/Misc/ProfileMenu",
  component: ProfileMenu,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <ProfileMenu
        selectedTheme={args.selectedTheme}
        onSetTheme={args.onSetTheme}
        actionLogout={args.actionLogout}
        apiUrl={args.apiUrl}
        token={args.token}
      />
    );
  },
};
