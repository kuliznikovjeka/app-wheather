export function buildElement(tagName, className, text) {
	const tag = document.createElement(tagName);
	tag.classList.add(className);
	tag.textContent = text;
	return tag
}
