import React, {useEffect, useState} from "react";
import UdHeader from "./ud-header/ud-header";
import UdList from "./ud-list/ud-list";
import {STAGES} from "../consts";
import UdCreateForm from "./ud-create-form/ud-create-form";
import Transport from "../transport";

const api = new Transport()

export default function App() {
    const [ stage, setStage ] = useState(STAGES.SEARCH);
    const [ contragents, setContragents ] = useState([]);
    const [ selected, setSelected ] = useState(null);
    const [ filters, setFilters ] = useState({
        name: false,
        phone: false,
        email: false,
        all: false
    });
    const [ search, setSearch ] = useState('');

    function createdContragent(contragent) {
        setContragents(old => [...old, contragent])
    }

    function handleSelectContragent(contragent) {
        setSelected(contragent);
        setStage(STAGES.EDIT);
    }

    function handleDelete(contragentId) {
        api.apiDeleteContragent(contragentId)
            .then(() => {
                setContragents(old => {
                    return old.filter(contr => contr.id !== contragentId)
                })
            })
    }

    let window = null;

    if(stage === STAGES.SEARCH) {
        window = <>
            <UdHeader
                search={search}
                edit={setSearch}
                filters={filters}
                setFilters={setFilters}
                changeStage={setStage}
            />
            <div className='mt-4'>
                <UdList
                    list={contragents}
                    onSelect={handleSelectContragent}
                    onDelete={handleDelete}
                />
            </div>
        </>
    } else if(stage === STAGES.CREATE) {
        window = <UdCreateForm
            changeStage={setStage}
            createdContragent={createdContragent}
        />
    } else {
        window = <UdCreateForm
            changeStage={setStage}
            isEdit={true}
            contragent={selected}
        />
    }

    useEffect(() => {
        if(stage !== STAGES.SEARCH) return;
        api.apiGetContragents(filters, search).then(contragents => {
            setContragents(contragents);
        })
    }, [stage, filters, search])

    return <div className="container">
        { window }
    </div>
}