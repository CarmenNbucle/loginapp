import { useEffect, useState, useMemo} from "react";
import { useParams, Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos";
import ModalFormularioTarea from "../components/ModalFormularioLista";
import ModalEliminarLista from "../components/ModalEliminarLista";
import Lista from "../components/Lista";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// Tabla
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const Proyecto = () => {
    const params = useParams();
    const {obtenerProyecto, proyecto, cargando, handleModalLista, handleModalBorrar, handleModalBorrarFila, datosProyecto, editarProyecto} = useProyectos();

    const [modal, setModal] = useState(false)
    const [borrame, setBorrame] = useState(false)


    useEffect( () => {
        obtenerProyecto(params.id)
    }, [])
    


    //Tabla
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#111827',
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: theme.palette.common.white,
      },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));

    const columns = [
      { field: 'id', headerName: 'ID', width: 150 },
      { field: 'piso', headerName: 'Piso', width: 200 },
      { field: 'reservado', headerName: 'Reservado', type: 'boolean', width: 150 },
      { field: 'visitas', headerName: 'Visitas', width: 150 },
      { field: '', headerName: 'Acciones',	width: 200,
        renderCell: (params) => (
          <Stack direction='row' divider={<Divider orientation="vertical" flexItem />} justifyContent="center" alignItems="center" spacing={2}>
            <IconButton size='small' onClick={() => {
              setIsEdit(true)
              setBody(params.row)
              handleDialog()
            }}>
              <EditOutlined />
            </IconButton>
            <IconButton size='small' onClick={() => onDelete(params.id)}>
              <DeleteOutline />
            </IconButton>
          </Stack>
        )
       }
    ]

    const nombreproy = proyecto.nombre
    const valores = datosProyecto

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [reservado, setReservado] = useState('');
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const handleEditar = (event) => {
      var tipo = event.target.getAttribute("data-Type")
      var elID = event.target.getAttribute("data-id")
      if (tipo === 'editar'){
        console.log('vamos a EDITAR', elID)
      }else if(tipo ==='borrar'){
        handleModalBorrarFila()
        console.log('vamos a BORRAR', elID)
      }
      setReservado(+event.target.value);
    };

    if(cargando) return 'Cargando...'

  return (
      <>
        <ModalEliminarLista
          borrame={borrame}
          setBorrame={setBorrame}
        />
        <div className="flex justify-between my-6 pt-50 pb-50 bg-cover bg-center" style={{backgroundImage:`url('../src/assets/${nombreproy}.jpg')`}}>
          <h1 className="text-gray-200 font-black text-4xl px-2 py-20">Proyecto: {nombreproy}</h1>

          <div>
            <Link
              className="flex items-center gap-2 mt-4 text-white hover:text-gray-500 px-2"
              to={`/proyectos/editar/${params.id}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Editar</Link>
          </div>
        </div>

        <div className="flex justify-start ">
          <button
            onClick={handleModalLista}
            type="button"
            className="flex items-center gap-2 text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold text-white bg-gray-900 text-center mt-5 justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Añadir
          </button>
          <button
            onClick={handleModalBorrar}
            type="button"
            className="flex items-center gap-2 text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-gray-900 text-white text-center mt-5 justify-center ml-5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
            Borrar todo
          </button>
        </div>

        <Box className="mt-10 text-white bg-gray-900" sx={{ width: '100%', color:'#fff', backgroundColor: '#111827' }}> 
        <div className="my-10" >{datosProyecto?.length ? 

        <Paper>
        <TableContainer component={Paper}>
          <Table className="bg-gray-900 text-white" sx={{ minWidth: 700, color:'#fff', backgroundColor: '#111827' }} aria-label="customized table">
            <TableHead>
              <TableRow className="uppercase font-black" >
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Piso</StyledTableCell>
                <StyledTableCell align="center">Reservado</StyledTableCell>
                <StyledTableCell align="center">Visitas</StyledTableCell>
                <StyledTableCell align="center">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {datosProyecto?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map( lista => (
                <StyledTableRow key={lista._id.toString()}>
                  <StyledTableCell align="center">{lista._id}</StyledTableCell>
                  <StyledTableCell align="center">{lista.piso}</StyledTableCell>
                  <StyledTableCell align="center">{lista.reservado}</StyledTableCell>
                  <StyledTableCell align="center">{lista.visitas}</StyledTableCell>
                  <StyledTableCell align="center">
                  <button 
                    onClick={handleEditar}
                    data-Type="editar"
                    data-id={lista._id}
                    type="button"
                    className="bg-white px-2 py-1 mr-8 border-solid border-2 border-black rounded hover:bg-green-100 text-gray-900">
                      Editar</button> 
                  <button 
                    onClick={handleEditar}
                    data-Type="borrar"
                    data-id={lista._id}
                    type="button"
                    className="bg-white px-2 py-1 mr-8 border-solid border-2 border-black rounded hover:bg-red-100 text-gray-900">
                    Borrar</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
         <TablePagination
        className=" bg-gray-700"
         rowsPerPageOptions={[10, 25, 100]}
         component="div"
         count={datosProyecto.length}
         rowsPerPage={rowsPerPage}
         page={page}
         onPageChange={handleChangePage}
         onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Paper>
   
            // proyecto.listas?.map( lista => (
            //   <Lista 
            //     key={lista._id}
            //     lista={lista}
            //   />
            // )) 

            //NUEVO
            // proyecto.myProy?.map( lista => (
            //   <div className="mt-10 text-white" key={lista._id.toString()}>

            //       <DataGrid
            //         className="text-white"
            //         key={lista._id.toString()}  
            //         rows={[lista._id, lista.piso, lista.reservado, lista.visitas]}
            //         getRowId={(row) => lista._id.toString()}
            //         columns={columns}
            //         checkboxSelection
            //         experimentalFeatures={{ newEditingApi: true }}
            //       /> 
                
            //   </div>  
            // ))
		
                  // <DataGrid
                  //   className="text-white"
                  //   key={valores._id}  
                  //   rows={[valores._id, valores.piso, valores.reservado, valores.visitas]}
                  //   getRowId={(row) => valores._id}
                  //   columns={columns}
                  //   checkboxSelection
                  //   experimentalFeatures={{ newEditingApi: true }}
                  // /> 

            : 
            <p className="text-center my-5 p-10 text-white">No hay nada aún de este proyecto</p>}
        </div>
        </Box> 
       
        <ModalFormularioTarea 
          modal={modal}
          setModal={setModal}
        />

        
        
      </>
    )
}

export default Proyecto
