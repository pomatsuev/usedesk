import {createRef, useMemo, useState} from "react";
import Transport from "../../transport";
import {STAGES} from "../../consts";
import UdAddList from "../ud-add-list/ud-add-list";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/authContext";

export default function UdCreateForm({ isEdit, contragent, createdContragent }) {

    const auth = useAuth()
    const api = new Transport(auth.token);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: isEdit ? contragent.name : '',
        surname: isEdit ? contragent.surname : '',
        phones: isEdit ? [...contragent.phones] : [],
        emails: isEdit ? [...contragent.emails] : [],
    })

    const [errors, setError] = useState({
        name: ''
    })

    const id = useMemo(() => contragent ? contragent.id : '', [contragent]);

    function handleChangeField(field, evt) {
        setForm(old => ({ ...old, [field]: evt.target.value }))
        setError(old => ({ ...old, [field]: '' }))
        evt.preventDefault()
    }

    function handleSaveForm() {
        if(!form.name) {
            setError(old => ({...old, name: 'Обязательно для заполнения'}))
            return
        }

        if(!isEdit) {
            api.apiSaveContragent(form)
                .then(apiContragent => {
                    createdContragent(apiContragent)
                    navigate('/')
                })
        } else {
            api.apiUpdateContragent(id, form)
                .then(apiContragent => {
                    createdContragent(apiContragent)
                    navigate('/')
                })
        }
    }

    function handlePhone(action, phone) {
        if(action === 'add') {
            setForm(old => {
                if(isEdit) {
                    return {...old, phones: [...old.phones, phone]}
                } else {
                    return {...old, phones: [...old.phones, { id: Math.random(), phone }]}
                }
            })
        } else {
            setForm(old => {
                const phones = old.phones.filter(e => e.id !== phone)
                return {...old, phones}
            })
        }
    }

    function handleEmail(action, email) {
        if(action === 'add') {
            setForm(old => {
                if(isEdit) {
                    return {
                        ...old,
                        emails: [
                            ...old.emails,
                            email
                        ]
                    }
                } else {
                    return {
                        ...old,
                        emails: [
                            ...old.emails,
                            {
                                id: Math.random(),
                                email
                            }
                        ]
                    }
                }
            })
        } else {
            setForm(old => {
                const emails = old.emails.filter(e => e.id !== email)
                return {...old, emails}
            })
        }
    }

    return <>
        <h1 className='mt-4'>Create contragent:</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                    Имя
                </label>
                <input type="text"
                       className={['form-control', `${errors.name ? 'is-invalid' : ''}`].join(' ')}
                       id="inputName"
                       value={form.name}
                       onChange={event => handleChangeField('name', event)}
                />
                {
                    errors.name
                        ?<div className="invalid-feedback">
                            {errors.name}
                        </div>
                        :<div className="form-text">
                            Обязательное поле для заполнения
                        </div>
                }
            </div>
            <div className="mb-3">
                <label htmlFor="inputSurname" className="form-label">
                    Фамилия
                </label>
                <input type="text"
                       className="form-control"
                       id="inputSurname"
                       value={form.surname}
                       onChange={event => handleChangeField('surname', event)}
                />
            </div>
            <div className="mb-4">
                <UdAddList
                    records={form.phones}
                    field='phone'
                    label='Телефоны'
                    useApi={isEdit}
                    id={id}
                    updateForm={handlePhone}
                />
            </div>
            <div className="mb-4">
                <UdAddList
                    records={form.emails}
                    field='email'
                    label='Почтовые ящики'
                    useApi={isEdit}
                    id={id}
                    updateForm={handleEmail}
                />
            </div>
            <Link to='/' className='btn btn-secondary'>
                Отменить
            </Link>
            <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={handleSaveForm}
            >
                Сохранить
            </button>
        </form>
    </>
}