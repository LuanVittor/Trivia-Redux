// import requestApi from '../../pages/Login';

export const PLAYER = 'PLAYER';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';

export const player = (name, email) => ({ type: PLAYER, name, email });

export const apiSuccess = (api) => ({ type: REQUEST_API_SUCCESS, api });

// export function getApi() {
//   return (dispatch) => {
//     return (
//       requestApi()
//         .then((resp) => dispatch(apiSuccess(resp)))
//     );
//   };
// }
