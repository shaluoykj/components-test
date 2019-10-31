export default {
	beforeRouterEnter(to, from, next) {
		next((vm) => ) {
			try {
				const scrollNode = document.querySelector('keep-container');
				const nodeScrolltop = Number(window.sessionStorage.getItem('nodeScrollTop'));
				scrollNode.scrolltop = nodeScrolltop;
				window.sessionStorage.removeItem('nodeScrollTop');
			} catch(error) {
				console.warn(error);
			}
		}
	},
	beforeRouterLeave(to, from, next) {
		try {
			const scrollNode = document.querySelector('keep-container');
			const nodeScrolltop = String(scrollNode.scrollTop);
			window.sessionStorage.setItem('nodeScrollTop');
		} catch(error) {
			console.warn(error);
		}
	}
}