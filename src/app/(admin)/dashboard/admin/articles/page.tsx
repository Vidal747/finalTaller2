// Components
import { DataTable, Column } from '@/components/DataTable';

export default function ArticlesPage() {
    const initialColumns = ['title', 'subtitle', 'active', 'actions'];
    const columns: Column[] = [
        {id: 'id', name: 'Id', type: 'string', sortable: true},
        {id: 'title', name: 'Título', type: 'string', sortable: true},
        {id: 'subtitle', name: 'Subtítulo', type: 'string', sortable: true},
        {id: 'description', name: 'Descripción', type: 'string', sortable: true},
        {id: 'imageName', name: 'Nombre de la imagen', type: 'string', sortable: true},
        {id: 'imageUrl', name: 'Imagen', type: 'image', sortable: false},
        {id: 'tags', name: 'Etiquetas', type: 'tags', sortable: true},
        {id: 'active', name: 'Activo', type: 'active', sortable: true},
        {id: 'createdAt', name: 'Creado el', type: 'dateTime', sortable: true},
        {id: 'updatedAt', name: 'Editado el', type: 'dateTime', sortable: true},
        {id: 'actions', name: 'Acciones', type: 'actions', sortable: false},
    ]
    const searchColumn = {id: 'name', name: 'Nombre'};
    
    return (
        <>
            <DataTable
                name='Articulo'
                pluralName='Articulos'
                dataApiUrl='/api/articles'
                endPointForCreate='/admin/articles/create'
                endPointForEdit='/admin/articles/edit/'
                endPointForDelete='/api/articles/'
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