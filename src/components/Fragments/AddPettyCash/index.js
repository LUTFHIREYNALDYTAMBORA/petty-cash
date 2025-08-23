import { parser, revParse } from "@/utils/text";
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import moment from "moment";
import 'moment/locale/id';
import { useState } from "react";

export default function AddPettyCash({ onSave }) {
    const [isFocusedIncome, setIsFocusedIncome] = useState(false);
    const [isFocusedOutcome, setIsFocusedOutcome] = useState(false);
    const [data, setData] = useState({
        date: moment(new Date()).locale('id').format('DD MMMM YYYY'),
        account: '',
        desc: '',
        income: null,
        outcome: null,
    });

    const handleFocus = (type) => () => {
        if (type === 'income') {
            setIsFocusedIncome(true);
        } else {
            setIsFocusedOutcome(true);
        }
    };
    
    const handleBlur = (type) => () => {
        if (type === 'income') {
            setIsFocusedIncome(true);
        } else {
            setIsFocusedOutcome(true);
        }
    };

    const handleChange = (name) => (event) => {
        if (name === 'income' || name === 'outcome') {
            if (isNaN(revParse(event.target.value))) return;
            setData({ ...data, [name]: parser(event.target.value) });
        } else {
            setData({ ...data, [name]: event.target.value });
        }
    };

    const handleSave = () => {
        onSave({
            date: data.date,
            account: data.account,
            description: data.desc,
            income: revParse(data.income),
            outcome: revParse(data.outcome),
        });
    }

    return (
        <>
            <TextField
                disabled
                label="Tanggal"
                variant="outlined"
                fullWidth
                value={data.date}
            />
            <FormControl fullWidth style={{ margin: '20px 0px 20px 0px' }}>
                <InputLabel id="demo-simple-select-label">Tipe Akun</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Pilih Akun"
                    value={data.account}
                    onChange={handleChange('account')}
                >
                    <MenuItem value="Biaya Entrian">Biaya Entrian</MenuItem>
                    <MenuItem value="Biaya Pelatihan">Biaya Pelatihan</MenuItem>
                    <MenuItem value="Kebutuhan Tamu">Kebutuhan Tamu</MenuItem>
                    <MenuItem value="Kebutuhan Meterial">Kebutuhan Meterial</MenuItem>
                    <MenuItem value="Biaya Parkir">Biaya Parkir</MenuItem>
                    <MenuItem value="Biaya Jasa">Biaya Jasa</MenuItem>
                    <MenuItem value="Biaya Makan Dinas">Biaya Makan Dinas</MenuItem>
                    <MenuItem value="Biaya Token">Biaya Token</MenuItem>
                    <MenuItem value="BBM">BBM</MenuItem>
                    <MenuItem value="Kas masuk">Kas masuk</MenuItem>
                    <MenuItem value="Kebutuhan Umum">Kebutuhan Umum</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Keterangan"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={data.desc}
                onChange={handleChange('desc')}
            />
            <TextField
                style={{ margin: '20px 0px 20px 0px' }}
                label="Uang Masuk"
                variant="outlined"
                fullWidth
                onFocus={handleFocus('income')}
                onBlur={handleBlur('income')}
                InputProps={{
                    startAdornment: isFocusedIncome ? (
                    <InputAdornment position="start">Rp</InputAdornment>
                    ) : null
                }}
                value={data.income}
                onChange={handleChange('income')}
            />
            <TextField
                label="Uang Keluar"
                variant="outlined"
                fullWidth
                onFocus={handleFocus('outcome')}
                onBlur={handleBlur('outcome')}
                InputProps={{
                    startAdornment: isFocusedOutcome ? (
                    <InputAdornment position="start">Rp</InputAdornment>
                    ) : null
                }}
                value={data.outcome}
                onChange={handleChange('outcome')}
            />
            <Button
                disabled={!data.account || !data.desc || !data.income || !data.outcome}
                fullWidth
                size="large"
                variant="contained"
                color="warning"
                style={{ margin: '20px 0px 0px 0px' }}
                onClick={handleSave}
            >
                Simpan
            </Button>
        </>
    )
}