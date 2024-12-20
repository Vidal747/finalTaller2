// Components
import { DataTable, Column } from '@/components/DataTable';

export default function UsersPage() {
    const initialColumns = ['imageUrl', 'role', 'name', 'document', 'active', 'actions'];
    const columns: Column[] = [
        {id: 'imageUrl', name: 'Imagen', type: 'image', sortable: true},
        {id: 'id', name: 'Id', type: 'string', sortable: true},
        {id: 'role', name: 'Rol', type: 'relation', sortable: true},
        {id: 'name', name: 'Nombre', type: 'string', sortable: true},
        {id: 'phone', name: 'Teléfono', type: 'phone', sortable: true},
        {id: 'email', name: 'Correo', type: 'email', sortable: true},
        {id: 'user', name: 'Usuario', type: 'string', sortable: true},
        {id: 'active', name: 'Activo', type: 'active', sortable: true},
        {id: 'logged', name: 'Logueado', type: 'boolean', sortable: true},
        {id: 'createdAt', name: 'Creado el', type: 'dateTime', sortable: true},
        {id: 'updatedAt', name: 'Editado el', type: 'dateTime', sortable: true},
        {id: 'actions', name: 'Acciones', type: 'actions', sortable: false},
    ]
    const searchColumn = {id: 'name', name: 'Nombre'};
    
    return (
        <>
            <DataTable
                name='Usuario'
                pluralName='Usuarios'
                dataApiUrl='/api/users'
                endPointForCreate='/admin/users/create'
                endPointForEdit='/admin/users/edit/'
                endPointForDelete='/api/users/'
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