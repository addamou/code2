import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";

const CustomClearText = () => "Vider !";

const ClearIndicator = (props) => {
  const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;

  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles("clearIndicator", props)}
    >
      <div style={{ padding: "0px 5px" }}>{children}</div>
    </div>
  );
};

const ClearIndicatorStyles = (base, state) => ({
  ...base,
  cursor: "pointer",
  color: state.isFocused ? "blue" : "black",
});

export default function Index({ setDemande }) {
  // variable pour la liste des offres
  const [options, setOptions] = useState([]);
  const offre = useSelector((state) => state.offre.offres);

  useEffect(() => {
    let a = offre.map((el) => {
      return { value: el.label, label: el.label };
    });
    setOptions(a);
  }, [offre]);

  // variables des demandes
  const [selected, setSelected] = useState([]);
  const onChange = (selectedOptions) => setSelected(selectedOptions);

  const demande = React.useCallback(() => {
    // write your callback function here ...
    setDemande(
      selected.map((el) => {
        let x = offre.filter((val) => val.label === el.label);
        return x[0];
      })
    );
    // eslint-disable-next-line
  }, [offre, selected]);
  useEffect(() => {
    demande();
  }, [demande]);

  return (
    <Select
      onChange={onChange}
      closeMenuOnSelect={false}
      components={{ ClearIndicator }}
      styles={{ clearIndicator: ClearIndicatorStyles }}
      value={selected}
      defaultValue={""}
      isMulti
      options={options}
    />
  );
}
