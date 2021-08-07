import * as ERRORS from './error';

const ERROR_FAIL_TO_FETCH = "No se pudo establecer la conexión con el servidor. Verifique su conexión a internet e intente nuevamente.";
const ERROR_FAIL_GENERAL = "En este momento no se puede procesar la solicitud. Intente más tarde.";

export function hadlerError(err) {
  try {
    if (err) {
      console.error(err);
      const errorMessage = err.message;
      //const errorName = error.name;
      //const errorStack = error.errorStack;
      if (errorMessage && (errorMessage.toLowerCase().includes('failed to fetch') || errorMessage.toLowerCase().includes('network') ||
        errorMessage.toLowerCase().includes('http') || errorMessage.toLowerCase().includes('timeout'))) {
        return new ERRORS.NetworkError(ERROR_FAIL_TO_FETCH);
      } else {
        return new ERRORS.ServerError(ERROR_FAIL_GENERAL);
      }
    } else {
      return new Error("Error desconocido");
    }
  } catch (err2) {
    console.error(err2);
    return new Error("Error desconocido.");
  }
}

function _fetchWithTimeout(url, options, timeout = 15000) {
  return Promise.race([
    fetch(url, options), new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
  ]);
}

export async function fetchWithTimeout(url, options, timeout = 15000) {
  return new Promise(function (resolve, reject) {
    return _fetchWithTimeout(url, options, timeout).then(response => {
      switch (response.status) {
        case 200:
          resolve(response.json());
          break;
        case 201:
          resolve(response.json());
          break;
        case 204:
          resolve(null);
          break;
        case 400:
          reject(new ERRORS.InternalError(400, "Error al intentar realizar la operación; Petición invalida."));
          break;
        case 401:
          new Error
          reject(new ERRORS.InternalError(401, "Error al intentar realizar la operación; En este momento no esta autorizado para realizar la solicitud."));
          break;
        case 500:
          reject(new ERRORS.InternalError(500, "Error al intentar realizar la operación; Se ha generado un error interno."));
          break;
        default:
          reject(new ERRORS.InternalError(500, "Error al intentar realizar la operación; Se ha generado un error desconocido."));
          break;
      }
    }).catch(error => {
      console.log(error)
      reject(hadlerError(error));
    });
  });
}