import {Link} from "react-router-dom";

export default function UdHeader({ search, edit, filters, setFilters }) {

    function changeInput(name) {
        setFilters(old => ({...old, [name]: !old[name]}))
    }

    return <section>
        <h1 className='mt-4'>
            Контрагенты:
        </h1>
        <div className='row mt-4'>
            <div className="col-9">
                <input
                    type='text'
                    className='form-control'
                    placeholder='Введите текст для поиска'
                    value={search}
                    onChange={event => edit(event.target.value)}
                />
            </div>
            <div className="col-3">
                <Link
                    to="/add"
                    className='btn btn-primary'
                >
                    Создать контрагента
                </Link>
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