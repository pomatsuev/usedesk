import React, {useEffect, useState} from "react";
import UdCreateForm from "./ud-create-form/ud-create-form";
import Transport from "../transport";
import { useAuth} from "./context/authContext";
import { Route, Routes, useNavigate} from "react-router-dom";
import UdPrivateRoute from "./ud-private-route/ud-private-route";
import UdLogin from "./ud-login/ud-login";
import UdHomePage from "./ud-home-page/ud-home-page";

export default function App() {
    const navigate = useNavigate()
    const auth = useAuth()
    const api = new Transport(auth.token)
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
        navigate('/edit');
    }

    function handleDelete(contragentId) {
        api.apiDeleteContragent(contragentId)
            .then(() => {
                setContragents(old => {
                    return old.filter(contr => contr.id !== contragentId)
                })
            })
            .catch(err => {
                alert(err.toString())
            })
    }

    useEffect(() => {
        api.apiGetContragents(filters, search)
            .then(contragents => {
                setContragents(contragents);
            })
    }, [filters, search])

    return <div className="container">
                <Routes>
                    <Route path="/" element={
                        <UdHomePage
                            search={search}
                            setSearch={setSearch}
                            filters={filters}
                            setFilters={setFilters}
                            contragents={contragents}
                            selectContragent={handleSelectContragent}
                            deleteItem={handleDelete}
                        />
                    } />
                    <Route path="/add" element={
                        <UdPrivateRoute>
                            <UdCreateForm
                                createdContragent={createdContragent}
                            />
                        </UdPrivateRoute>
                    } />
                    <Route path='/edit' element={
                        <UdPrivateRoute>
                            <UdCreateForm
                                isEdit={true}
                                contragent={selected}
                            />
                        </UdPrivateRoute>
                    } />
                    <Route path="/login" element={
                        <UdLogin />
                    } />
                </Routes>
            </div>
}