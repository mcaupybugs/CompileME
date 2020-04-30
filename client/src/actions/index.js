import backend from '../api/backend';
import history from '../history';

export const signIn = (values) => async (dispatch, getState) => {
    //console.log(values.userId)
    await backend.post('/newUser', { values });
    dispatch({
        type: 'SIGN_IN',
        payload: values.userId
    })
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}
