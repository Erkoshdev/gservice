


export default async function (store, VueInitial) {
  // store.commit('setLangLoading', true);

  // const res = await reqTranslate();
  //   store.commit('setLang', res);
  //   store.commit('setLangLoading', false);
  if (VueInitial) {
    VueInitial();
  }
}
