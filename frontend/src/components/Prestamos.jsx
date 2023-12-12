import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, TextField, Paper, Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Topbar from "./Topbar";

function Zonapruebas() {
    const userData = useSelector(state => state.login);
    const navigate = useNavigate();
    const isLoggedin = userData.isAutenticated;
    const [item, setItem] = useState({ articulo: '', persona: '', fecha: '' })
    const [tableData, setTableData] = useState([])

    const handleSelectItem = (e) => {
        fetch('http://localhost:3030/getprestamo')
            .then(response => response.json())
            .then(response => {
                setTableData(response.data)
            })
    }

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/');
        } else {
            handleSelectItem()
        }
    }, [isLoggedin, navigate]);

    const handleSaveItem = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3030/addprestamo?articulo=${item.articulo}&persona=${item.persona}&fecha=${item.fecha}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                handleSelectItem()
                setItem({ id: '', articulo: '', presona: '', fecha: '' })

            })
    }

    return <>
        <Topbar></Topbar>
        <Paper
            elevation={3}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '700px',
            }}
        >
            <Box
                component="form"
                autoComplete="off"
                onSubmit={handleSaveItem}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 2,
                }}
            >
                <TextField
                    label="articulo"
                    required
                    value={item.articulo}
                    onChange={(event) => setItem({ ...item, articulo: event.target.value })}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="persona"
                    required
                    value={item.persona}
                    onChange={(event) => setItem({ ...item, persona: event.target.value })}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="fecha"
                    required
                    type="date"
                    value={item.fecha}
                    onChange={(event) => setItem({ ...item, fecha: event.target.value })}
                    sx={{ marginBottom: 2 }}
                >
                </TextField>
                <Button type="submit" variant="contained">
                    Insertar
                </Button>
            </Box>
            <TableContainer>
                <Table aria-label="tablaPruebas">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: 'black' }}>id</TableCell>
                            <TableCell style={{ color: 'black' }}>articulo</TableCell>
                            <TableCell style={{ color: 'black' }}>persona</TableCell>
                            <TableCell style={{ color: 'black' }}>fecha</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.articulo}</TableCell>
                                <TableCell>{row.persona}</TableCell>
                                <TableCell>{row.fecha}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </>
}


export default Zonapruebas