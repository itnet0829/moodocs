
export const state = () => ({
    status: 0,
    mail: '',
    id: '',
    name: '',
    due: '',
    server_org: 'server',
    domain: ''
});

export const mutations = {
    login_mut(state,data) {
        state.status = 200
        state.name = data.name
        state.id = data.id
        state.mail = data.email
        state.due = data.due
    },
    login_fail(state){
        state.status = 404
    },
    change_name(state,name) {
        state.name = name
    },
    change_id(state,id) {
        state.id = id
    },
    change_mail(state,mail) {
        state.mail = mail
    },
    connection(state){
        if (state.server_org == "server") {
            state.domain = "https://moodocs.ant-group2022.com/apps/public/api"
        } else if (state.server_org == "pc") {
            state.domain = "http://localhost:8000/api"
        }
    }
};

export const actions = {
    domain({state}) {
        return state.domain
    }
};

export const getters = {
    name (state) {
        return state.name
    },
    mail (state) {
        return state.mail
    },
    id (state) {
        return state.id
    },
    due (state) {
        return state.due
    },
    server (state) {
        return state.server_org
    },
    domain (state) {
        return state.domain
    },
    status (state) {
        return state.status
    },
};