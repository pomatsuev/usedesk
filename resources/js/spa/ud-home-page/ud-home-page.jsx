import UdHeader from "../ud-header/ud-header";
import UdList from "../ud-list/ud-list";

export default function UdHomePage(
    {
        search,
        setSearch,
        filters,
        setFilters,
        contragents,
        selectContragent,
        deleteItem
    }) {
    return <>
        <UdHeader
            search={search}
            edit={setSearch}
            filters={filters}
            setFilters={setFilters}
        />
        <div className='mt-4'>
            <UdList
                list={contragents}
                onSelect={selectContragent}
                onDelete={deleteItem}
            />
        </div>
    </>
}