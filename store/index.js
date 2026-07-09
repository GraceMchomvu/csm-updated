export const state = () => ({
	mobileDrawerStatus: false,
	searchPopupStatus: false
  })

  export const mutations = {
	changeMobileDrawerStatus (state) {
	  state.mobileDrawerStatus = !state.mobileDrawerStatus
	},
	changeSearchPopupStatus (state) {
	  state.searchPopupStatus = !state.searchPopupStatus
	}
  }