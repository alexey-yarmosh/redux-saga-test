import { delay } from 'redux-saga';
import { takeEvery, put, all } from 'redux-saga/effects';

function* delayedPlus() {
  yield delay(1000);
  yield put({ type: 'PLUS' });
}

export default function* watchDelayedPlus() {
  yield takeEvery('DELAYED_PLUS', delayedPlus);
}
