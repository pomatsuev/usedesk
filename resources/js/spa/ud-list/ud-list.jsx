import {useAuth} from "../context/authContext";

export default function UdList({ list, onSelect, onDelete }) {

    const auth = useAuth()

    function deleteContragent(id, evt) {
        onDelete(id)
        evt.stopPropagation()
    }

    return <ul className='list-group'>
        {
            list && list.map(contragent => {
                return <li
                    className='list-group-item' key={contragent.id}
                    onClick={() => onSelect(contragent)}
                    style={{cursor: 'pointer'}}
                >
                    <div className='d-flex justify-content-between align-items-center'>
                        <h4>
                            { `${contragent.name} ${contragent.surname}` }
                        </h4>
                        {
                            auth.logged && <button
                                className='btn btn-close'
                                onClick={
                                    evt => deleteContragent(contragent.id, evt)
                                }
                            />
                        }
                    </div>
                    <div>
                        <small className='text-muted'>
                            { contragent.phones.map(phone => phone.phone).join(', ') }
                        </small>
                    </div>
                    <div>
                        <small className='text-muted'>
                            { contragent.emails.map(email => email.email).join(', ') }
                        </small>
                    </div>
                </li>
            })
        }
    </ul>
}