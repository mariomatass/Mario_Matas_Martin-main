import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import { Button, TextField, Paper, Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Topbar from "./Topbar"
import { Tooltip } from "@mui/material";

function Home() {
    const userData = useSelector(state => state.login);
    const navigate = useNavigate();
    const isLoggedin = userData.isAutenticated;
    const [item, setItem] = useState({ nombre: '', marca: '', tipo: '', precio: '' })
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/');
        }else{
            handleSelectItem()
        }
    }, [isLoggedin, navigate]);

    const handleSaveItem = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                handleSelectItem()
                setItem({ nombre: '', marca: '', tipo: '', precio: '' })
            })
    }

    const handleSelectItem = (e) => {
        fetch('http://localhost:3030/getItems')
            .then(response => response.json())
            .then(response => {
                setTableData(response.data)
            })
    }


    const handleDeleteItem = (id) => {
        fetch(`http://localhost:3030/deleteItem?id=${id}`)
            .then(response => response.json())
            .then(response => {
                handleSelectItem()
            })
    }

    console.log(userData);

    return (
        <>
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
                        label="Nombre"
                        required
                        value={item.nombre}
                        onChange={(event) => setItem({ ...item, nombre: event.target.value })}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Marca"
                        required
                        value={item.marca}
                        onChange={(event) => setItem({ ...item, marca: event.target.value })}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Tipo"
                        required
                        value={item.tipo}
                        onChange={(event) => setItem({ ...item, tipo: event.target.value })}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Precio"
                        required
                        value={item.precio}
                        onChange={(event) => setItem({ ...item, precio: event.target.value })}
                        sx={{ marginBottom: 2 }}
                    />
                    {userData.userRol !== 'invitado' && <Tooltip title="Añadir registro" arrow><Button type="submit" variant="contained">Insertar</Button></Tooltip>}
                </Box>
                <TableContainer>
                    <Table aria-label="tabla">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell style={{ color: 'black' }}>Nombre</TableCell>
                                <TableCell style={{ color: 'black' }}>Marca</TableCell>
                                <TableCell style={{ color: 'black' }}>Tipo</TableCell>
                                <TableCell style={{ color: 'black' }}>Precio</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {userData.userRol==='admin' && <Tooltip title="Borrar" arrow><Button onClick={() => handleDeleteItem(row.id)}>
                                            <DeleteForeverIcon />
                                        </Button></Tooltip>}
                                    </TableCell>
                                    <TableCell>{row.nombre}</TableCell>
                                    <TableCell>{row.marca}</TableCell>
                                    <TableCell>{row.tipo}</TableCell>
                                    <TableCell>{row.precio}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}

export default Home;