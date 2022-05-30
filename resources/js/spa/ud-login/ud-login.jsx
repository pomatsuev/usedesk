import {useAuth} from "../context/authContext";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";

function reducer(state, action) {
    switch (action.type) {
        case 'errors':
            return { ...action.payload }
        case 'clear':
            return { ...state, [action.field] : null }
        default:
            return state
    }
}

export default function UdLogin() {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/'

    const [form, setForm] = useState({
        email: '',
        password: '',
        remember: false,
    })

    const [errors, dispatchErr] = useReducer(reducer, {});

    function handleChangeInput(key, evt) {
        setForm(old => {
            return {
                ...old,
                [key]: evt.target.value
            }
        })
        dispatchErr({ type: 'clear', field: key })
    }

    function handleChangeCheckbox(evt) {
        setForm(old => {
            return {
                ...old,
                remember: evt.target.checked
            }
        })
    }

    function handleSubmit() {
        auth.signIn(form, () => {
            navigate(from, { replace: true })
        }, data => {
            dispatchErr({ type: 'errors', payload: data.errors });
        })
    }

    useEffect(() => {
        if(auth.logged) {
            navigate(from, { replace: true })
        }
    }, [auth.logged])

    return <>
        {
            auth.loading
                ? <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                : <>
                    <h1>Вход</h1>
                    <div className="my-3">
                        <label htmlFor="email" className="form-label">Почта</label>
                        <input type="email"
                               className={['form-control', errors.email ? 'is-invalid' : '' ].join(' ')}
                               id="email"
                               aria-describedby="emailHelp"
                               value={form.email}
                               onChange={evt => handleChangeInput('email', evt)}
                        />
                        {
                            errors.email && <div className="invalid-feedback">
                                {errors.email.join(', ')}
                            </div>
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input type="password"
                               className={['form-control', errors.password ? 'is-invalid' : '' ].join(' ')}
                               id="password"
                               value={form.password}
                               onChange={evt => handleChangeInput('password', evt)}
                        />
                        {
                            errors.password && <div className="invalid-feedback">
                                {errors.password.join(', ')}
                            </div>
                        }
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox"
                               className="form-check-input"
                               id="remember"
                               checked={form.remember}
                               onChange={handleChangeCheckbox}
                        />
                        <label className="form-check-label" htmlFor="remember">Запомнить меня</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Войти</button>
                </>
        }
    </>
}