// Components
import { DataTable, Column } from '@/components/DataTable';

export default function Users() {
    const initialColumns = ['imagesByProduct', 'name', 'price', 'available', 'active', 'actions'];
    const columns: Column[] = [
        {id: 'id', name: 'Id', type: 'string', sortable: true},
        {id: 'imagesByProduct', name: 'Imagen', type: 'images', sortable: false},
        {id: 'name', name: 'Nombre', type: 'string', sortable: true},
        {id: 'details', name: 'Detalles', type: 'string', sortable: true},
        {id: 'price', name: 'Precio', type: 'currency', sortable: true},
        {id: 'available', name: 'Disponible', type: 'boolean', sortable: true},
        {id: 'active', name: 'Activo', type: 'active', sortable: true},
        {id: 'createdAt', name: 'Creado el', type: 'dateTime', sortable: true},
        {id: 'updatedAt', name: 'Editado el', type: 'dateTime', sortable: true},
        {id: 'actions', name: 'Acciones', type: 'actions', sortable: false},
    ]
    const searchColumn = {id: 'name', name: 'Nombre'};
    
    return (
        <>
            <DataTable
                name='Plan'
                pluralName='Planes'
                dataApiUrl='/api/products'
                endPointForCreate='/admin/products/create'
                endPointForEdit='/admin/products/edit/'
                endPointForDelete='/api/products/'
                initialColumns={initialColumns}
                columns={columns}
                searchColumn={searchColumn}
                selectionMode='single'
                showBackButton
                showRefreshButton
                actions={{canCreate: true, canUpdate: true, canDelete: true, canRead: true}}
            />
        </>
    )
};