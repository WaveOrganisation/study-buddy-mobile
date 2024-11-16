import React, { memo, useState } from "react";
import { SwitchWithLabel } from "@/components/SwitchWithLabel";
import { useTranslation } from "react-i18next";

export const NotificationsSwitch = memo(() => {
  const [allowNotifications, setAllowNotifications] = useState(true);
  const { t } = useTranslation("pageSettings");
  return (
    <SwitchWithLabel
      label={t("allowNotifications")}
      size={"$3"}
      isChecked={allowNotifications}
      labelSize={"$5"}
      onChange={() => {
        setAllowNotifications((s) => !s);
      }}
    />
  );
});
