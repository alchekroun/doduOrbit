import { IconButton, Stack, Switch } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";
import { dateToHourOfYear, getCurrentSegmentBorders, hourOfYearToDate } from "../lib/utils";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const HUD = ({ autoMode, setAutoMode, hourOfYear, setHourOfYear }) => {

    const autoModeChange = (isChecked) => {
        setAutoMode(isChecked);
        if (isChecked) setHourOfYear(dateToHourOfYear(dayjs()));
    }

    const goToNextEvent = () => {
        const [t0, t1] = getCurrentSegmentBorders(hourOfYearToDate(hourOfYear));
        setHourOfYear(t1);
    }

    const goToPrevEvent = () => {
        const [t0, t1] = getCurrentSegmentBorders(hourOfYearToDate(hourOfYear));
        setHourOfYear(t0);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack
                className="overlay"
                direction="column"
                spacing={2}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h4>Centre de contrôle</h4>
                <div>
                    Pilote automatique
                    <Switch checked={autoMode} onChange={(e) => autoModeChange(e.target.checked)} />
                </div>
                <DateTimePicker
                    label="Date et heure"
                    value={hourOfYearToDate(hourOfYear)}
                    onChange={(newValue) => setHourOfYear(dateToHourOfYear(newValue))}
                    maxDate={dayjs("2025-12-31")}
                    minDate={dayjs("2025-01-01")}
                    disabled={autoMode}
                    ampm={false}
                />
                <input
                    type="range"
                    min="1"
                    max="8760"
                    value={hourOfYear}
                    onChange={(e) => setHourOfYear(Number(e.target.value))}
                    style={{ width: "80%" }}
                    disabled={autoMode}
                />
                <Stack
                    direction={"row"}
                >
                    <IconButton disabled={autoMode} onClick={goToPrevEvent}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton disabled={autoMode} onClick={goToNextEvent} >
                        <NavigateNextIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </LocalizationProvider>
    );
}

export default HUD;