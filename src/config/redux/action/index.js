import { database } from '../../firebase';

export const actionUserName = (user) => (dispatch) => {
    return dispatch({ type: 'CHANGE_USER', value: user })
    // setTimeout(() => {
    // }, 1000)
}

export const addDataUser = (data) => (dispatch) => {
    const arrbulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const date = new Date();
    const detik = date.getSeconds();
    const menit = date.getMinutes();
    const jam = date.getHours();
    const tanggal = date.getDate();
    const bulan = date.getMonth();
    const tahun = date.getFullYear();
    if (data.enemies_name === 'Click image for "Tampols"') {
        database.ref('user/' + data.uid).set({
            uid: data.uid,
            email: data.email,
            displayName: data.displayName,
            photoURL: data.photoURL,
            enemies_name: 'x',
            // date: tanggal + "-" + arrbulan[bulan] + "-" + tahun + " " + jam + ":" + menit + ":" + detik
            date: tanggal + "-" + bulan + "-" + tahun + " " + jam + ":" + menit + ":" + detik
        })
    } else {
        database.ref('user/' + data.uid).set({
            uid: data.uid,
            email: data.email,
            displayName: data.displayName,
            photoURL: data.photoURL,
            enemies_name: data.enemies_name,
            date: tanggal + "-" + bulan + "-" + tahun + " " + jam + ":" + menit + ":" + detik
        })
    }
}

export const getDataFromAPI = () => (dispatch) => {
    const urlNotes = database.ref('user/');
    return new Promise((resolve, reject) => {
        urlNotes.on('value', function (snapshot) {
            const data = Object.values(snapshot.val());
            dispatch({ type: 'SET_NOTES', value: data });
            resolve(snapshot.val());
        })
    })
}