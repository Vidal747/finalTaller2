// Components
import { DataTable, Column } from '@/components/DataTable';

export default function FrequentQuestionsPage() {
    const initialColumns = ['title', 'question', 'answer', 'active', 'actions'];
    const columns: Column[] = [
        {id: 'id', name: 'Id', type: 'string', sortable: true},
        {id: 'title', name: 'Título', type: 'string', sortable: true},
        {id: 'question', name: 'Pregunta', type: 'string', sortable: true},
        {id: 'answer', name: 'Respuesta', type: 'string', sortable: true},
        {id: 'active', name: 'Activo', type: 'active', sortable: true},
        {id: 'createdAt', name: 'Creado el', type: 'dateTime', sortable: true},
        {id: 'updatedAt', name: 'Editado el', type: 'dateTime', sortable: true},
        {id: 'actions', name: 'Acciones', type: 'actions', sortable: false},
    ]
    const searchColumn = {id: '', name: 'Nombre'};
    
    return (
        <>
            <DataTable
                name='Pregunta'
                pluralName='Preguntas'
                dataApiUrl='/api/frequentQuestions'
                endPointForCreate='/admin/frequentQuestions/create'
                endPointForEdit='/admin/frequentQuestions/edit/'
                endPointForDelete='/api/frequentQuestions/'
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