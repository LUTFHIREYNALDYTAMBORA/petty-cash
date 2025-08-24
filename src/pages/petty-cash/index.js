import { Box, Button, IconButton, InputAdornment, Modal, TextField } from "@mui/material";
import { AddCircleOutline, Cancel, Print, SearchOutlined, WarningAmberOutlined } from '@mui/icons-material';
import StickyHeadTable from "@/components/Table";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from "react";
import PopUp from "@/components/Popup";
import AddPettyCash from "@/components/Fragments/AddPettyCash";
import StartFirebase from '../../configFirebase/index';
import { ref, set, onValue, get } from 'firebase/database';
import AlertBase from "@/components/elements/Alert";
import PreviewDoc from "@/components/Fragments/PreviewDoc";
import moment from "moment";
import 'moment/locale/id';
import 'dayjs/locale/id';
import dayjs from 'dayjs';

const db = StartFirebase();

const styles = {
    btn: {
        textTransform: 'capitalize',
    },
    btnAddData: {
        width: '230px',
        height: '50px',
        fontWeight: 700,
        textTransform: 'capitalize',
    },
    btnPrintMonth: {
        fontWeight: 700,
        textTransform: 'capitalize',
        height: '55px'
    },
    fieldSearch: {
        margin: '20px 20px 20px 0px'
    },
    iconAdd: {
        marginRight: 1
    },
    titleHeader: {
        fontSize: '30px',
        fontWeight: 700
    },
    wrapHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}

const styleModalList = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '655px',
    bgcolor: 'background.paper',
    border: '1px solid grey',
    borderRadius: '8px',
    boxShadow: 24,
    marginTop: '30px',
    typography: 'body1'
};

export default function PettyCash() {
    const [search, setSeach] = useState('');
    const [confirmation, setConfirmation] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [previewDoc, setPreviewDoc] = useState(false);
    const [filterDate, setFilterDate] = useState(moment(new Date()).locale('id').format('MMMM YYYY'));
    const [date, setDate] = useState(dayjs(new Date()));
    const [dataTable, setDataTable] = useState([]);
    const [dataFiltered, setDataFiltered] = useState([]);
    const [dataEdit, setDataEdit] = useState(null);
    const [alert, setAlert] = useState({
        open: false, text: '', severity: ''
    });

    useEffect(() => {
        const dbRef = ref(db);
        onValue(dbRef, (snapshot) => {
            const dataFromFirebase = snapshot.val();
            if (dataFromFirebase && dataFromFirebase.data) {
                setDataTable(Object.values(dataFromFirebase?.data));
            } else {
                setDataTable([]);
            }
        });
    }, []);

    useEffect(() => {
        const byDate = dataTable.filter(transaksi => {
            return transaksi.date.includes(filterDate);
        });
        if (search) {
            const bySearch = byDate.filter((val) => {
                return val?.account.toLowerCase().includes(search.toLowerCase());
            });
            setDataFiltered(bySearch);
        } else {
            setDataFiltered(byDate);
        }
    }, [search, filterDate, dataTable]);

    const handlePreviewDoc = () => {
        setPreviewDoc(!previewDoc);
    }

    const handleCloseAlert = () => {
        setAlert({ open: false, text: '', severity: '' });
    };

    const handleRemove = () => {
        setConfirmation(!confirmation);
        set(ref(db, 'data/' + (dataTable.length - 1)), null);
        setAlert({ open: true, text: 'Data berhasil dihapus', severity: 'success' });
        setDataEdit(null);
    }

    const handleAction = (action) => async () => {
        try {
            const lastDataRef = ref(db, 'data/' + (dataTable.length - 1));
            const snapshot = await get(lastDataRef);
            if (snapshot.exists()) {
                setDataEdit(snapshot.val());
                if (action === 'delete') { handleConfirmation(); }
                else { handleAdd(); }
            } else {
                setAlert({ open: true, text: 'Data tidak ditemukan', severity: 'error' });
            }
        } catch (error) {
            setAlert({ open: true, text: 'Data tidak ditemukan', severity: 'error' });
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSeach(e.target.value);
    }

    const handleAdd = () => {
        setShowPopup(!showPopup);
    }

    const handleClosePopup = () => {
        setShowPopup(!showPopup);
        setDataEdit(null);
    }

    const handleChangeDate = (newValue) => {
        setDate(newValue);
        setFilterDate(moment(newValue.$d).locale('id').format('MMMM YYYY'));
    }

    const handleConfirmation = () => {
        setConfirmation(!confirmation);
    }

    const handleCloseConfirmation = () => {
        setConfirmation(!confirmation);
        setDataEdit(null);
    }

    const handleSave = (newValue, type) => {
        const firstId = moment(new Date()).locale('id').format('YYYY-MM-DD');
        const lastBalance = dataTable.length > 0 ? dataTable.at(-1).balance : 0;
        const lastBalanceEdit = dataTable.length > 0 ? dataTable.at(-2).balance : 0;
        const income = Number(newValue.income) || 0;
        const outcome = Number(newValue.outcome) || 0;
        const newPath = type === 'edit' ? `data/${dataTable.length - 1}` : `data/${dataTable.length}`;
        set(ref(db, newPath), {
            ...newValue,
            income: income,
            outcome: outcome,
            balance: (type === 'edit' ? lastBalanceEdit : lastBalance) + income - outcome,
            id: `${firstId}-${dataTable.length + 1}`
        });
        handleAdd();
        setAlert({ open: true, text: 'Data berhasil disimpan', severity: 'success' });
        setDataEdit(null);
    }

    return (
        <div style={{ padding: '20px' }}>
            <Modal open={previewDoc}>
                <Box sx={styleModalList}>
                    <IconButton
                        style={{
                            position: 'absolute', top: '-31px',
                            right: '-34px', zIndex: 2, color: 'white'
                        }}
                        onClick={handlePreviewDoc}
                    >
                        <Cancel fontSize='large' />
                    </IconButton>
                    <PreviewDoc data={dataFiltered} date={filterDate} />
                </Box>
            </Modal>
            <AlertBase
                counterCloseAlert={handleCloseAlert}
                message={alert?.text}
                open={alert?.open}
                severity={alert?.severity}
            />
            <PopUp
                open={showPopup}
                closeButton
                handleClose={handleClosePopup}
                title={dataEdit ? "Edit Data" : "Tambah Data Baru"}
            >
                <AddPettyCash onSave={handleSave} dataEdit={dataEdit} />
            </PopUp>
            <PopUp
                open={confirmation}
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <WarningAmberOutlined sx={{ marginRight: '5px', marginBottom: '2px', fontSize: '20px' }} color="warning"/>
                        <div>Hapus Data</div>
                    </div>
                }
            >
                <div>
                    <div>Yakin ingin menghapus data ini :</div>
                    <ul>
                        <li>Tanggal : {dataEdit?.date}</li>
                        <li>Tipe Akun : {dataEdit?.account}</li>
                        <li>Keterangan : {dataEdit?.description}</li>
                        <li>Uang Masuk : {dataEdit?.income}</li>
                        <li>Uang Keluar : {dataEdit?.outcome}</li>
                    </ul>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            sx={{ ...styles.btn, marginRight: '5px' }}
                            fullWidth variant="outlined"
                            color="inherit"
                            onClick={handleCloseConfirmation}
                        >
                            Kembali
                        </Button>
                        <Button
                            sx={{ ...styles.btn, marginLeft: '5px' }}
                            fullWidth variant="contained"
                            color="warning"
                            onClick={handleRemove}
                        >
                            Yakin
                        </Button>
                    </div>
                </div>
            </PopUp>
            <div style={styles.wrapHeader}>
                <div style={styles.titleHeader}>PETTY CASH</div>
                <Button
                    size="large"
                    style={styles.btnAddData}
                    variant="contained"
                    color="warning"
                    onClick={handleAdd}
                >
                    <AddCircleOutline sx={styles.iconAdd} fontSize="small" />Tambah Data
                </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <TextField
                        sx={styles.fieldSearch}
                        size="medium"
                        placeholder="Cari data"
                        variant="outlined"
                        onChange={handleSearch}
                        value={search}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><SearchOutlined /></InputAdornment>
                            )
                        }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Pilih bulan dan tahun"
                                sx={{ width: '250px' }}
                                views={['month', 'year']}
                                onChange={handleChangeDate}
                                value={date}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <Button
                    style={styles.btnPrintMonth}
                    variant="contained"
                    color="inherit"
                    onClick={handlePreviewDoc}
                >
                    <Print sx={styles.iconAdd} fontSize="small" /> Cetak Laporan Perbulan
                </Button>
            </div>
            <StickyHeadTable dataTable={dataFiltered} onHandleAction={handleAction} filterDate={filterDate} />
        </div>
    )
}