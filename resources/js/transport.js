import axios from "axios";
import cloneDeep from "lodash/cloneDeep";
axios.defaults.baseURL = window.location.origin + '/api';

const filtersMap = {
    all: () => ['name', 'surname', 'phone', 'email'],
    phone: (arr) => [...arr, 'phone'],
    name: (arr) => [...arr, 'name', 'surname'],
    email: (arr) => [...arr, 'email'],
}

export default class Transport {
    apiSaveContragent(contragent) {
        return axios.post('/contragent', contragent).then(({data}) => data)
    }

    apiGetContragents(filters, search = null) {
        const params = {};
        let fields = [];

        if(filters) {
            Object.keys(filters).forEach(key => {
                const fn = filtersMap[key];
                if(filters[key] && fn) {
                    fields = fn(fields)
                }
            })
        }
        if(fields.length > 0 && search) {
            params.search = search;
            params.fields = fields
        }
        return axios.get('/contragents', {
            params
        }).then(({data}) => data)
    }

    apiAddRelation(contragentId, relation) {
        return axios.post(
            '/contragent/' + contragentId + '/attach',
                relation
            ).then(({data}) => data);
    }

    apiDeleteRelation(relation) {
        return axios.post('/delete-attach', relation).then(({data}) => data);
    }

    apiUpdateContragent(id, contragent) {
        return axios.put('/contragent/' + id, contragent).then(({data}) => data);
    }

    apiDeleteContragent(contragentId) {
        return axios.delete('/contragent/' + contragentId);
    }
}