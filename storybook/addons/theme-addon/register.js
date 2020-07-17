import React, { useEffect } from "react";
import addons from "@storybook/addons";
import { useChannel, useAddonState, useParameter } from "@storybook/api";
import { AddonPanel, Form } from "@storybook/components";
import ColorType from "@storybook/addon-knobs/dist/components/types/Color.js";

const defaultThemeLight = {};
const defaultThemeDark = {
  palette: {
    type: "dark",
  },
};
export const THEME_ADDON_ID = "theme-addon";
export const THEME_CHANGE_EVENT = "THEME_CHANGE_EVENT";

const ThemePanel = () => {
  const emit = useChannel({});
  const themes = useParameter("themeParameter", null);
  const [allThemes, setAllThemes] = useAddonState(THEME_ADDON_ID, {
    defaultThemeLight,
    defaultThemeDark,
    ...themes,
  });

  useEffect(() => {
    if (themes) {
      const newKeys = Object.keys(themes);
      newKeys.forEach(
        k =>
          !allThemes[k] &&
          setAllThemes(prevThemes => ({ ...themes, ...prevThemes })),
      );
    }
  }, [themes, allThemes, setAllThemes]);

  const options = Object.keys(allThemes).map((t, i) => (
    <option key={`${t}-${i}`} value={t}>
      {t}
    </option>
  ));

  const dropdown = (
    <Form.Select
      onChange={e => emit(THEME_CHANGE_EVENT, allThemes[e.currentTarget.value])}
    >
      {options}
    </Form.Select>
  );
  return (
    <>
      {dropdown}
      <ColorType
        knob={{ name: "Primary Color picker", value: "rgba(42,11,199,1)" }}
        onChange={console.log}
      />
    </>
  );
};

addons.register(THEME_ADDON_ID, api => {
  addons.addPanel(`${THEME_ADDON_ID}/panel`, {
    title: "Theme",
    render: ({ active, key }) => (
      <AddonPanel key={key} active={active}>
        <ThemePanel />
      </AddonPanel>
    ),
    paramKey: THEME_ADDON_ID,
  });
});
