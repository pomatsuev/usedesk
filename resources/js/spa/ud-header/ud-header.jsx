import {STAGES} from "../../consts";

export default function UdHeader({ search, edit, filters, setFilters, changeStage }) {

    function changeInput(name) {
        setFilters(old => ({...old, [name]: !old[name]}))
    }

    function handleCreateClick() {
        changeStage(STAGES.CREATE)
    }

    return <section>
        <h1 className='mt-4'>
            Contragents:
            <button
                className='btn btn-outline-secondary mx-2'
                onClick={handleCreateClick}
            >
                +
            </button>
        </h1>
        <div className='row mt-4'>
            <div className="col-9">
                <input
                    type='text'
                    className='form-control'
                    placeholder='enter search phrase'
                    value={search}
                    onChange={event => edit(event.target.value)}
                />
            </div>
            <div className="col-3">
                <button type='button' className='btn btn-primary'>
                    create contragent
                </button>
            </div>
        </div>
        <div className="form-check form-check-inline mt-4">
            <input
                className="form-check-input"
                type="checkbox"
                disabled={filters.all}
                checked={filters.name}
                onChange={() => changeInput('name')}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Имя и фамилия
            </label>
        </div>
        <div className="form-check form-check-inline mt-4">
            <input
                className="form-check-input"
                type="checkbox"
                disabled={filters.all}
                checked={filters.phone}
                onChange={() => changeInput('phone')}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Телефон
            </label>
        </div>
        <div className="form-check form-check-inline mt-4">
            <input
                className="form-check-input"
                type="checkbox"
                disabled={filters.all}
                checked={filters.email}
                onChange={() => changeInput('email')}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Почта
            </label>
        </div>
        <div className="form-check form-check-inline mt-4">
            <input
                className="form-check-input"
                type="checkbox"
                checked={filters.all}
                onChange={() => changeInput('all')}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                По всем
            </label>
        </div>
    </section>
}