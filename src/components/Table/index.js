import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styles from "./styles";
import { Delete, Edit } from "@mui/icons-material";
import { moneyDotFormat } from "@/utils/text";
import moment from "moment";
import 'moment/locale/id';

export default function TablePettyCash({ dataTable, onHandleAction, filterDate }) {
    return (
        <TableContainer sx={styles.table} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell width={20}><b>No</b></TableCell>
                        <TableCell><b>Tanggal</b></TableCell>
                        <TableCell><b>Akun</b></TableCell>
                        <TableCell><b>Keterangan</b></TableCell>
                        <TableCell align="right"><b>Uang Masuk (Rp.)</b></TableCell>
                        <TableCell align="right"><b>Uang Keluar (Rp.)</b></TableCell>
                        <TableCell align="right"><b>Saldo (Rp.)</b></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataTable?.length === 0 ?
                        <TableRow>
                            <TableCell sx={{ fontSize: 20, fontWeight: 'bold' }} colSpan={7} align="center">
                                Data Tidak Ditemukan
                            </TableCell>
                        </TableRow> :
                        dataTable?.map((val, idx) => {
                            return (
                                <TableRow key={idx}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{val.date}</TableCell>
                                    <TableCell>{val.account}</TableCell>
                                    <TableCell width={250}>{val.description}</TableCell>
                                    <TableCell align="right">
                                        {val.income === 0 ? '-' : moneyDotFormat(val.income)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {val.outcome === 0 ? '-' : moneyDotFormat(val.outcome)}
                                    </TableCell>
                                    <TableCell align="right">{moneyDotFormat(val.balance)}</TableCell>
                                    <TableCell align="right">
                                        {
                                            dataTable?.length === (idx + 1) && (filterDate === moment(new Date()).locale('id').format('MMMM YYYY')) &&
                                            <>
                                                <IconButton onClick={onHandleAction('delete')}>
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                                <IconButton onClick={onHandleAction('edit')}>
                                                    <Edit fontSize="small" />
                                                </IconButton>
                                            </>
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}