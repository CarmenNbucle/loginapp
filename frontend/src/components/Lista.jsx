import { useState } from 'react';
// Tabla
import { DataGrid } from '@mui/x-data-grid';

const Lista = ({lista}) => {

    //const {piso, habitaciones, superficie, precio, reservado, url, plano, status, _id} = lista
    const { _id, piso, reservado, visitas} = lista

    console.log(lista._id + ' ' + piso + ' ' + reservado + ' ' + visitas)
  
      // var reservados = 0
      // var libres = 0
      // var total = 0
      // var porreservados = 0
      // var porlibres = 0
  
      // /* Para las línea */
      // reservados = data.resevados
      // total = data.total
      // libres = total - reservados
      // porreservados = Math.trunc(reservados* 100 /total)
      //  porlibres = 100 - porreservados
  
      // setDatos({total, reservados, libres, porreservados, porlibres})
  
    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        { field: 'piso', headerName: 'Piso', width: 250 },
        { field: 'reservado', headerName: 'Reservado', type: 'boolean', width: 200 },
        { field: 'visitas', headerName: 'Visitas', width: 220 },
        //{ field: '', headerName: 'Acciones',	width: 200,
          // renderCell: (params) => (
          //   <Stack direction='row' divider={<Divider orientation="vertical" flexItem />} justifyContent="center" alignItems="center" spacing={2}>
          //     <IconButton size='small' onClick={() => {
          //       setIsEdit(true)
          //       setBody(params.row)
          //       handleDialog()
          //     }}>
          //       <EditOutlined />
          //     </IconButton>
          //     <IconButton size='small' onClick={() => onDelete(params.id)}>
          //       <DeleteOutline />
          //     </IconButton>
          //   </Stack>
          // )
        //}
      ]


  return (
    
    <div style={{ height: 400, width: '100%' }} className="text-white">
      <DataGrid
        getRowId={(row) => row._id}
        rows={[  _id , {piso}, {reservado}, {visitas}]}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      /> 
      {piso}
    </div>
  )
}

export default Lista