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
        avatar={args.avatar}
        name={args.name}
        email={args.email}
        selectedTheme={args.selectedTheme}
        onSetTheme={args.onSetTheme}
        actionProfile={args.actionProfile}
        actionLogout={args.actionLogout}
      />
    );
  },
};
