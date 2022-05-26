import {useState} from "react";
import Transport from "../../transport";

const api = new Transport()

export default function UdAddList(
    {
        label,
        records,
        field,
        updateForm,
        useApi,
        id
    }
) {

    const [record, setRecord] = useState('')

    function handleAddRecord() {
        if(useApi) {
            api.apiAddRelation(id, {
                [field]: record
            }).then(data => updateForm('add', data));
        } else {
            updateForm('add', record);
        }
        setRecord('');
    }

    function handleDelete(id) {
        if(useApi) {
            api.apiDeleteRelation({
                [field]: id
            })
        }
        updateForm('remove', id);
    }

    return <>
        <label htmlFor="inputRecord">
            { label }
        </label>
        <div className="row">
            <div className="col-9">
                <input
                    type="text"
                    className="form-control"
                    id="inputRecord"
                    value={record}
                    onChange={evt => setRecord(evt.target.value)}
                />
            </div>
            <div className="col-3">
                <button type='button'
                        className='btn btn-primary'
                        onClick={handleAddRecord}
                >
                    Add
                </button>
            </div>
        </div>

        <ul className='list-group mt-2 list-group-flush'>
            {records.map(record => {
                return <li
                    className='list-group-item list-group-item-secondary d-flex justify-content-between'
                    key={record.id}
                >
                    {record[field]}
                    <button
                        type='button'
                        className='btn btn-close'
                        onClick={() => handleDelete(record.id)}
                    />
                </li>
            })}
        </ul>
    </>
}