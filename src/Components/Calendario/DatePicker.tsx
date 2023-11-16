import react from "react";
import { Calendar } from "./Calendar";

export const DatePicker = () => {
    return (
        <div className="date-picker-container">
            <div className="background-container"></div>
            <Calendar />
        </div>
    )
}