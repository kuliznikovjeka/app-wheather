document.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelector('.tabs');
	const tabsBtn = document.querySelectorAll('.tabs__btn');
	const tabsContent = document.querySelectorAll('.tabs__content');

	tabs.addEventListener('click', (e) => {
		if (e.target.classList.contains('tabs__btn')) {
			const tabsPath = e.target.dataset.tabsPath;
			tabsHandler(tabsPath);
		}
	});

	const tabsHandler = (path) => {
		tabsBtn.forEach(el => {
			el.classList.remove('tabs__btn_active')
		});

		document.querySelector(`[data-tabs-path="${path}"]`).classList.add('tabs__btn_active');

		tabsContent.forEach(el => {
			el.classList.remove('tabs__content_active')
		});

		document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content_active');
	};
});

