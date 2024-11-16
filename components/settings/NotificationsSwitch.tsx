import React, { memo, useState } from "react";
import { SwitchWithLabel } from "@/components/SwitchWithLabel";

export const NotificationsSwitch = memo(() => {
  const [allowNotifications, setAllowNotifications] = useState(true);
  return (
    <SwitchWithLabel
      label={"Notifications"}
      size={"$3"}
      isChecked={allowNotifications}
      labelSize={"$5"}
      onChange={() => {
        setAllowNotifications((s) => !s);
      }}
    />
  );
});
