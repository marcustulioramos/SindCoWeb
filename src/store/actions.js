export const authenticate = ({ state, commit }, credentials) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }
        }
        var querystring = require('querystring');
        // axios.post(`${state.apiUrl}/Token`, credentials, config)
        axios({
            method: 'post',
            url: `${state.apiUrl}/Token`,
            data: querystring.stringify({
                username: credentials.email,
                password: credentials.password,
                grant_type: 'password',
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
            .then((response) => {
                if (response.status === 200){

                    $token = response.data['access_token'];
                    $userName = response.data['userName'];

                    axios.get(`${state.apiUrl}/user`, { headers: { Authorization: `bearer ${token}` } })
                    .then((r) => {
                        commit('startApplication', response.data)
                        resolve(r)
                    })
                    .catch((e) => {
                        commit('endApplication')
                        reject(e)
                    })
                }
                reject('There was an error in the API!')
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const checkToken = ({ state, commit }) => {
    return new Promise((resolve, reject) => {
        if (!!state.apiToken) resolve()

        let token = sessionStorage.getItem('token') || cookie.get('token') || null

        if (token) {
            axios.get(`${state.apiUrl}/user`, { headers: { Authorization: `Bearer ${token}` } })
                .then((r) => {
                    resolve(r)
                })
                .catch((e) => {
                    commit('endApplication')
                    reject(e)
                })
        } else {
            commit('endApplication')
            reject('not logged in!')
        }
    })
}

export const resetPassword = ({ state, commit }, user) => {
    axios.post(`${state.apiUrl}/reset-password`, user)
        .then((response) => {
            if (response.status === 200) router.push('/login') // success toast maybe
            else console.log(response.message) // fail toast
        })
        .catch((error) => {
            console.log(error) // fail toast
        })  
}