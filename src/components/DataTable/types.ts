interface Column {
    id: string;
    name: string;
    type: 'string' | 'number' | 'boolean' | 'image' | 'images' | 'relation' | 'multirelation' | 'date' | 'time' | 'dateTime' | 'active' | 'status' | 'currency' | 'percent' | 'link' | 'email' | 'phone' | 'geolocation' | 'tags' | 'color' | 'actions';
    sortable?: boolean;
}

interface DataTableProps {
    name: string;
    pluralName: string;
    dataApiUrl: string;
    endPointForCreate: string;
    endPointForEdit: string;
    endPointForDelete: string;
    columns: Column[];
    initialColumns: string[];
    searchColumn: {
        id: string;
        name: string;
    };
    selectionMode?: 'multiple' | 'none' | 'single'
    showBackButton?: boolean;
    showRefreshButton?: boolean;
    actions: {
        canCreate?: boolean;
        canRead?: boolean;
        canUpdate?: boolean;
        canDelete?: boolean;
    };
}

interface ModalData {
    title: string;
    body: JSX.Element | JSX.Element[];
}

export type { Column, DataTableProps, ModalData };