import { IconButton, Slider, Stack, Switch, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";
import { dateToHourOfYear, hourOfYearToDate, ALIGNMENT_HOURS } from "../lib/utils";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const dateMarks2 = ALIGNMENT_HOURS.map((v, i) => {
    return {
        value: v,
        label: `#${i + 1}`
    }
});

function valueLabelFormat(value) {
    return hourOfYearToDate(value).format('YYYY-MM-DD HH:mm');
}

const HUD = ({ autoMode, setAutoMode, hourOfYear, setHourOfYear }) => {

    const autoModeChange = (isChecked) => {
        setAutoMode(isChecked);
        if (isChecked) setHourOfYear(dateToHourOfYear(dayjs()));
    }

    const jumpEvent = (isNext) => {
        const currentIndex = ALIGNMENT_HOURS.findIndex((h) => h >= hourOfYear);
        let newIndex;
        if (isNext) {
            newIndex = ALIGNMENT_HOURS.findIndex((h) => h > hourOfYear);
        } else {
            newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        }
        if (newIndex !== -1 && newIndex < ALIGNMENT_HOURS.length) {
            const newHour = ALIGNMENT_HOURS[newIndex];
            setHourOfYear(newHour);
        };
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
                <Stack
                    direction={"row"}
                    spacing={2}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography color={autoMode ? "warning" : "white"} >Pilote automatique</Typography>
                    <Switch checked={autoMode} onChange={(e) => autoModeChange(e.target.checked)} color="secondary" />
                </Stack>
                <DateTimePicker
                    label="Date et heure"
                    value={hourOfYearToDate(hourOfYear)}
                    onChange={(newValue) => setHourOfYear(dateToHourOfYear(newValue))}
                    maxDate={dayjs("2025-12-30")}
                    minDate={dayjs("2025-01-01")}
                    disabled={autoMode}
                    ampm={false}
                    slotProps={{ textField: { color: "secondary" } }}
                />
                <Slider
                    min={1}
                    max={8736}
                    value={hourOfYear}
                    onChange={(e) => setHourOfYear(Number(e.target.value))}
                    disabled={autoMode}
                    marks={dateMarks2}
                    getAriaValueText={valueLabelFormat}
                    valueLabelFormat={valueLabelFormat}
                    valueLabelDisplay="auto"
                    color="secondary"
                    track={false}
                />
                <Stack
                    direction={"row"}
                >
                    <IconButton disabled={autoMode} onClick={() => jumpEvent(false)} color="secondary">
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton disabled={autoMode} onClick={() => jumpEvent(true)} color="secondary">
                        <NavigateNextIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </LocalizationProvider>
    );
}

export default HUD;