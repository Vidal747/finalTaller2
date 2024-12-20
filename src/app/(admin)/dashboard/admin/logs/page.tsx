// Components
import { DataTable, Column } from '@/components/DataTable';

export default function LogsPage() {
    const initialColumns = ['timestamp', 'user', 'ipAddress', 'geolocation', 'action', 'details', 'actions'];
    const columns: Column[] = [
        {id: 'id', name: 'Id', type: 'string', sortable: true},
        {id: 'timestamp', name: 'Fecha', type: 'dateTime', sortable: true},
        {id: 'user', name: 'Usuario', type: 'relation', sortable: true},
        {id: 'ipAddress', name: 'IP', type: 'string', sortable: true},
        {id: 'geolocation', name: 'Ubicación', type: 'geolocation', sortable: true},
        {id: 'action', name: 'Acción', type: 'string', sortable: true},
        {id: 'details', name: 'Detalles', type: 'string', sortable: true},
        {id: 'actions', name: 'Acciones', type: 'actions', sortable: false},
    ]
    const searchColumn = {id: 'action', name: 'Acción'};
    
    return (
        <>
            <DataTable
                name='Log'
                pluralName='Logs'
                dataApiUrl='/api/logs'
                endPointForCreate='/admin/logs/create'
                endPointForEdit='/admin/logs/edit/'
                endPointForDelete='/api/logs/'
                initialColumns={initialColumns}
                columns={columns}
                searchColumn={searchColumn}
                selectionMode='multiple'
                showBackButton
                showRefreshButton
                actions={{canRead: true}}
            />
        </>
    )
};