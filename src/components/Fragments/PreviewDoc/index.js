import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { moneyDotFormat, toUpperCase } from '@/utils/text';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
    },

    // Style untuk tabel
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginBottom: 10,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '13%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f0f0f0',
        padding: 5,
    },
    tableColHeaderNo: {
        width: '5%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f0f0f0',
        padding: 5,
    },
    tableCol: {
        width: '13%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
    },
    tableColNo: {
        width: '5%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
    },

    // Style khusus untuk kolom deskripsi yang lebih lebar
    tableColDesc: {
        width: '30%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
        textAlign: 'left'
    },
    tableCellHeader: {
        margin: 'auto',
        marginTop: 5,
        fontSize: 8,
        fontWeight: 'bold',
    },
    tableCell: {
        margin: 'auto',
        marginTop: 5,
        fontSize: 10,
    },
});

// Komponen Dokumen PDF
const InvoicePDF = (data) => {
    const lastBalance = data?.data?.length > 0 ? data?.data?.at(-1).balance : 0;
    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                <div style={{ borderBottom: '3px solid black', textAlign: 'right', padding: 5 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>PT. Tanah Tumbuh Jaya</Text>
                    <Text>Tanah Tumbuh Land</Text>
                </div>
                <Text style={styles.title}>LAPORAN PETTY CASH BULAN {toUpperCase(data?.date)}</Text>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeaderNo}>
                            <Text style={styles.tableCellHeader}>No</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Tanggal</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Akun</Text>
                        </View>
                        <View style={{ ...styles.tableColHeader, ...styles.tableColDesc }}>
                            <Text style={styles.tableCellHeader}>Keterangan</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Uang Masuk (Rp.)</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Uang Keluar (Rp.)</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Saldo (Rp.)</Text>
                        </View>
                    </View>

                    {data?.data?.map((item, idx) => {
                        return (
                            <View style={styles.tableRow} key={item.id}>
                                <View style={styles.tableColNo}>
                                    <Text style={styles.tableCell}>{idx + 1}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.date}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.account}</Text>
                                </View>
                                <View style={{ ...styles.tableCol, ...styles.tableColDesc }}>
                                    <Text style={styles.tableCell}>{item.description}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {item.income === 0 ? '-' : moneyDotFormat(item.income)}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {item.outcome === 0 ? '-' : moneyDotFormat(item.outcome)}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{moneyDotFormat(item.balance)}</Text>
                            </View>
                            </View>
                        )
                    })}
                </View>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Saldo Akhir Bulan {data?.date} : Rp. {moneyDotFormat(lastBalance)}</Text>
            </Page>
        </Document>
    );
}


export default function PDFPreview({ data, date }) {
    return (
        <PDFViewer width="99%" height="650">
            <InvoicePDF data={data} date={date} />
        </PDFViewer>
    );
}