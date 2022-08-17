import { FilterTypes, IconButtonStyles } from "../../lib/enums";
import IconButton from "../IconButton/IconButton";
import informationIcon from "../../static/icons/information.svg";
import SliderInput from "../SliderInput/SliderInput";
import { AudioFeatureData } from "../../lib/types";
import { useState } from "react";
import "../../stylesheets/filter-section.scss";
import "./range-filter.scss";
import {
  createTheme,
  Switch,
  ThemeProvider,
} from "@mui/material";

const RangeFilter = ({
  title,
  data,
  type,
  updateFilter,
}: {
  title: string;
  data: AudioFeatureData;
  type: FilterTypes;
  updateFilter: (
    filterType: FilterTypes,
    data: AudioFeatureData
  ) => void;
}) => {
  const [enabled, setEnabled] = useState(data.enabled);

  const handleSwitchChange = () => {
    setEnabled((enabled) => !enabled);
    updateFilter(type, { ...data, enabled: !enabled });
  };

  const theme = createTheme({
    palette: {
      primary: { main: "#1db954" },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <section className="entity-section">
          <header className="entity-section__header">
            <h1 className="entity-section__title">{title}</h1>
            <IconButton
              iconSrc={informationIcon}
              style={IconButtonStyles.Secondary}
            />
            <div className="audio-feature-value">
              {data.value ? data.value.toString() : "0"}
              <span> %</span>
            </div>
            <Switch
              checked={data.enabled}
              onChange={handleSwitchChange}
            />
          </header>
        </section>
        <main className="entity-section__main--audio-feature">
          <div className="slider-wrapper">
            <SliderInput
              currentValue={data.value}
              enabled={data.enabled}
              handleChange={(newValue) => {
                updateFilter(type, {
                  ...data,
                  value: newValue,
                });
              }}
            />
          </div>
        </main>
      </ThemeProvider>
    </>
  );
};

export default RangeFilter;
