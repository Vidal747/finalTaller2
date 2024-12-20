'use client';

import { useState, useMemo, useCallback, Key, useEffect } from 'react';
// Sources
import { ResponseApi } from '@/types/app';
import { DataTableProps, ModalData } from './types';
import { statusOptions, pageOptions } from './DataTable.data';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, Pagination, Selection,  ChipProps, SortDescriptor, Link, Skeleton, Modal, ModalContent, ModalHeader, ModalBody, Image, Tooltip } from '@nextui-org/react';
import { PiPlusBold, PiDotsThreeOutlineVerticalBold } from 'react-icons/pi';
import { TbSquareRoundedChevronDown, TbSearch, TbRefresh } from 'react-icons/tb';
import { IoFileTrayFull } from 'react-icons/io5';
import { TiArrowBackOutline } from 'react-icons/ti';
import { toast } from 'react-toastify';
import axios from 'axios';
// Utils
import { formatDateTime, formatToCurrency } from '@/utils/functions';

export function DataTable({ 
    name, 
    pluralName, 
    dataApiUrl, 
    endPointForCreate, 
    endPointForEdit, 
    endPointForDelete, 
    columns, 
    initialColumns, 
    searchColumn, 
    selectionMode,
    showBackButton,
    showRefreshButton,
    actions,
}: DataTableProps) {
    const [data, setData] = useState<any[]>([]);
    const [refreshData, setRefreshData] = useState('');
    const [loadingData, setLoadingData] = useState(true);
    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(initialColumns));
    const [filterValue, setFilterValue] = useState('');
    const [statusFilter, setStatusFilter] = useState<Selection>('all');
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState<ModalData>();

    const getData = async (url: string) => {
        try {
            setLoadingData(true);
            const response = await axios.get(url, {headers: { cache: 'force-cache' }});                            
            const data = response.data as ResponseApi;
            
            if (!data.ok || !data.data || !data.data.length) {
                toast.warning(data.message, {toastId: data.message});
                setData([]);
            } else {
                setData(data.data);
            }
        } catch (error: any) {
            setData([]);
            if (!error.response || !error.response.data || !error.response.data.hasOwnProperty('message')) {
                return toast.error('¡Ups! Algo salió mal, estamos trabajando para resolverlo.', {toastId: 1});
            }
            const toastId = (error.response?.data as ResponseApi).message;
            const type = error.response?.status !== 500 ? 'warning' : 'error';
    
            toast(toastId, {toastId, type})
        } finally {
            setLoadingData(false);
        }
    }

    useEffect(() => {
        getData(dataApiUrl);
    }, [refreshData]);

    const onSee = useCallback((item: any) => {
        const data: ModalData = {
            title: 'Ver',
            body: <></>
        }

        data.body = columns.map(({ id, name}) =>(
            <div key={id} className='flex items-center gap-3'>
                <Chip 
                    color='primary' 
                    variant='bordered'
                    className='w-32 min-w-32 overflow-hidden whitespace-nowrap text-ellipsis'
                >
                    {name}
                </Chip>
                {renderCell(item, id)}
            </div>
        ));
        
        setModalData(data);
        setOpenModal(true);
    }, []);
    
    const onDelete = useCallback((item: any) => {
        const data: ModalData = {
            title: 'Eliminar',
            body: <></>
        }

        const handleDelete = async () => {
            try {                
                const response = await axios.delete(`${endPointForDelete}${item.id}`);                            
                const data = response.data as ResponseApi;
    
                if (!data.ok) {
                    toast.warning(data.message, {toastId: data.message});
                } else if (data.ok) {
                    toast.success(data.message, {toastId: data.message});
                    setRefreshData(data.data && data.data[0].id);
                }
            } catch (error: any) {
                const toastId = (error.response?.data as ResponseApi).message;
                const type = error.response?.status !== 500 ? 'warning' : 'error';
    
                toast(toastId, {toastId, type})
            } finally {                            
                setOpenModal(false);
            }
        }

        data.body = (
            <div className='flex gap-4 flex-col'>
                <h4 className='text-center'>
                    ¿Estas seguro de eliminar 1 {name}?
                </h4>
                <Button
                    color='danger' 
                    onClick={handleDelete}
                >
                    Eliminar
                </Button>
            </div>
        );
        
        setModalData(data);
        setOpenModal(true);
    }, []);

    const headerColumns = useMemo(() => {
        if (visibleColumns === 'all') return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.id));
    }, [visibleColumns]);

    const filteredData = useMemo(() => {
        let newData = [...data];

        if (Boolean(filterValue)) {
            newData = newData.filter((item: any) =>
                item[searchColumn.id].toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
            newData = newData.filter((item: any) =>
                Array.from(statusFilter).includes(item.active ? 'Activo' : 'Inactivo'),
            );
        }

        return newData;
    }, [data, filterValue, statusFilter]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredData.slice(start, end);
    }, [page, filteredData, rowsPerPage]);

    const sortedData = useMemo(() => {
        return [...items].sort((a: any, b: any) => {
            const first: number = a[sortDescriptor.column!];
            const second: number = b[sortDescriptor.column!];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === 'descending' ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = useCallback((item: any, columnKey: Key) => {
        const cellValue = item[columnKey.toString()];
        const cellType = columns.find(column => column.id === columnKey)?.type;

        switch (cellType) {
            case 'string':
                return (
                    cellValue
                );
            case 'number':
                return (
                    <span className='text-blue-500'>{cellValue}</span>
                );
            case 'boolean':
                return (
                    <Chip color={cellValue ? 'success' : 'danger'} size='sm' variant='dot'>
                        {cellValue ? 'Si' : 'No'}
                    </Chip>
                );
            case 'image':
                return (
                    <Image
                        src={cellValue}
                        alt={item.name}
                        width={48}
                        isZoomed
                        className='w-12 h-12 rounded-full'
                    />
                );
            case 'images':
                return (
                    <Image
                        src={cellValue[0].imageUrl}
                        alt={item.name}
                        width={48}
                        isZoomed
                        className='w-12 h-12 rounded-full'
                    />
                )
            case 'relation':
                return (
                    cellValue.name
                );
            case 'multirelation':
                return (
                    <div className='flex flex-wrap gap-2'>
                        {cellValue.map((item: any) => (
                            <Chip key={item.id} color='primary' variant='flat'>
                                {item.name}
                            </Chip>
                        ))}
                    </div>
                );
            case 'date':
                return cellValue ? formatDateTime(cellValue).date : 'null';
            case 'time':
                return cellValue ? formatDateTime(cellValue).time : 'null';
            case 'dateTime':
                return cellValue ? formatDateTime(cellValue).complete : 'null';
            case 'active':
                return (
                    <Chip color={cellValue ? 'success' : 'danger'} size='sm' variant='dot'>
                        {cellValue ? 'Activo' : 'Inactivo'}
                    </Chip>
                );
            case 'status':
                return (
                    <Chip color={cellValue ? 'success' : 'danger'} size='sm' variant='dot'>
                        {cellValue}
                    </Chip>
                );
            case 'currency':
                return formatToCurrency(cellValue);
            case 'percent':
                return `${cellValue}%`;
            case 'link':
                return (
                    <Link href={cellValue} target='_blank'>
                        Link
                    </Link>
                );
            case 'email':
                return (
                    <Link href={`mailto:${cellValue}`}>
                        {cellValue}
                    </Link>
                );
            case 'phone':
                return (
                    <Link href={`tel:${cellValue}`}>
                        {cellValue}
                    </Link>
                );
            case 'geolocation':
                return (
                    <Link href={`https://www.google.com/maps/search/?api=1&query=${cellValue}`} target='_blank'>
                        {cellValue}
                    </Link>
                );
            case 'tags':
                return (
                    <div className='flex flex-wrap gap-2'>
                        {cellValue.split(',').map((tag: string) => (
                            <Chip key={tag} color='primary' variant='faded'>
                                {tag}
                            </Chip>
                        ))}
                    </div>
                );
            case 'color':
                return (
                    <Chip style={{background: cellValue}} size='sm'>
                        {cellValue}
                    </Chip>
                );            
            case 'actions':
                return (
                    <Dropdown placement='bottom-end'>
                        <DropdownTrigger>
                            <Button size='sm' variant='light'>
                                <PiDotsThreeOutlineVerticalBold  />
                                Acciones
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label='Menu de opciones del registro'>
                            <DropdownItem 
                                className={`${!actions.canRead && 'hidden'}`} 
                                aria-label='Opcion de ver' 
                                onClick={() => onSee(item)}
                            >
                                Ver
                            </DropdownItem>
                            <DropdownItem 
                                className={`${!actions.canUpdate && 'hidden'}`} 
                                aria-label='Opcion de editar' 
                                href={`/dashboard${endPointForEdit}${item.id}`}
                            >
                                Editar
                            </DropdownItem>
                            <DropdownItem
                                className={`${!actions.canDelete && 'hidden'}`} 
                                aria-label='Opcion de eliminar' 
                                onClick={() => onDelete(item)}
                            >
                                Eliminar
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                );
            default:
                return cellValue;
        }
    }, []);

    const onClear = useCallback(()=>{
        setFilterValue('')
        setPage(1)
    },[]);

    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue('');
        }
    },[]);

    const onRowsPerPageChange = useCallback((value?: any) => {
        setRowsPerPage(Number(value?.currentKey!));
        setPage(1);
    },[]);
    
    const topContent = useMemo(() => {
        return (
            <div className='flex flex-col gap-4 w-full'>
                <div className='flex flex-col sm:flex-row justify-between gap-3 items-end'>
                    <Input
                        isClearable
                        className='w-full sm:max-w-[35%]'
                        placeholder={`Buscar por ${searchColumn.name}...`}
                        size='sm'
                        startContent={<TbSearch />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className='flex gap-3 flex-wrap justify-center mx-auto sm:m-0'>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button endContent={<TbSquareRoundedChevronDown/>}>
                                    Estado
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label={`Estados de ${pluralName}`}
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode='multiple'
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map(({ name }) => (
                                    <DropdownItem key={name} className='capitalize'>
                                        {name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button endContent={<TbSquareRoundedChevronDown/>}>
                                    Columnas
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label={`Columnas para la tabla de ${pluralName}`}
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode='multiple'
                                onSelectionChange={setVisibleColumns}
                                className='max-h-96 overflow-scroll'
                            >
                                {columns.map(({ id, name }) => (
                                    <DropdownItem key={id} className='capitalize'>
                                        {name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        {actions.canCreate && 
                            <Button
                                as={Link}
                                href={`/dashboard${endPointForCreate}`}
                                color='primary'
                                endContent={<PiPlusBold />}
                            >
                                Agregar {name}
                            </Button>
                        }
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='text-small'>
                        Total: {data.length} {pluralName} 
                    </span>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button endContent={<TbSquareRoundedChevronDown/>} size='sm'>
                                Filas por página:
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label='Filas por página'
                            selectionMode='single'
                            onSelectionChange={(value) => onRowsPerPageChange(value)}
                        >
                            {pageOptions.map(({ name }) => (
                                <DropdownItem key={name}>
                                    {name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                {showRefreshButton && <Tooltip
                    placement='top'
                    content='Refrescar datos'                        
                >
                    <Button
                        isIconOnly
                        size='sm'
                        color='primary'
                        onClick={() => setRefreshData(new Date().toISOString())}
                        className='text-xl mx-auto -mt-4 -mb-8 z-10'
                    >
                        <TbRefresh />
                    </Button>
                </Tooltip>}
            </div>
        );
    }, [filterValue, onSearchChange, statusFilter, visibleColumns, data.length, onRowsPerPageChange]);

    const pages = Math.ceil(filteredData.length / rowsPerPage);

    const bottomContent = useMemo(() => {
        return (
            <div className='flex flex-col gap-4 items-center'>
                <span className={`w-full text-small ${selectionMode !== 'multiple' && 'hidden'}`}>
                    {selectedKeys === 'all' ? 
                        'Todos los registros seleccionados'
                    : 
                        `${selectedKeys.size} de ${filteredData.length} seleccionados`
                    }
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color='secondary'
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
            </div>
        );
    }, [selectedKeys, items.length, page, pages]);
    
    return(
        <main className='max-w-5xl mx-auto px-5 pb-10 flex gap-6 flex-col'>
            {showBackButton && <Button
                as={Link}
                href='./'
                isIconOnly
                className='text-2xl mt-2 -mb-4'
                color='primary'
            >
                <TiArrowBackOutline />
            </Button>}
            <h3 className={`text-3xl md:text-4xl text-center font-black ${!showBackButton && 'mt-6'}`}>
                Gestión de {pluralName}
            </h3>
            <Table
                aria-label={`Tabla de ${pluralName}`}
                isHeaderSticky
                topContent={topContent}
                topContentPlacement='outside'
                bottomContent={bottomContent}
                bottomContentPlacement='outside'
                classNames={{
                    wrapper: 'h-80 max-h-80',
                }}
                selectionMode={selectionMode}
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={headerColumns}>
                    {({ id, name, sortable }) => (
                        <TableColumn
                            key={id}
                            allowsSorting={sortable}
                        >
                            {name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    emptyContent={loadingData ?
                        <div className='flex flex-col gap-2 my-4'>
                            <Skeleton className='h-12 rounded-lg'/>
                            <Skeleton className='h-12 rounded-lg'/>
                            <Skeleton className='h-12 rounded-lg'/>
                            <Skeleton className='h-12 rounded-lg'/>
                        </div>
                        :
                        <div className='flex flex-col items-center'>
                            <IoFileTrayFull size={100}/>
                            <span>No se encontraron {pluralName}</span>
                        </div>
                    }
                    items={sortedData}
                >
                    {(item) => (
                        <TableRow key={item.Id}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal
                isOpen={openModal}
                placement='center'
                scrollBehavior='outside'
                backdrop='opaque'
                onOpenChange={setOpenModal}
            >
                <ModalContent>
                    <ModalHeader className='justify-center text-xl'>
                        {modalData?.title} {name}
                    </ModalHeader>
                    <ModalBody>
                        {modalData?.body}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </main>
    )
}