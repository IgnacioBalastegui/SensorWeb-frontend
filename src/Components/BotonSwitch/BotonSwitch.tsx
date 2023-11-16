import React from "react";
import "./BotonSwitch.css";


interface Props {
    onToggle: () => void;
    isToggled: boolean;
  }


export const BotonSwitch = ({isToggled, onToggle}: Props) => {
    return (
<label className="switch">
    <input type="checkbox" checked={isToggled} onChange={onToggle}/>
    <span className="slider"/>
</label>
    );
}