import { type PineconeRouter } from './router'
import { settings } from './settings'

/**
 * Add a handler to click events on valid links
 */
export const handleClicks = (Router: PineconeRouter) => {
	window.document.body.addEventListener('click', (e: MouseEvent) => {
		// ignore modified clicks or non-primary buttons
		if (
			e.ctrlKey ||
			e.metaKey ||
			e.altKey ||
			e.shiftKey ||
			e.button ||
			e.defaultPrevented
		) {
			return
		}

		// find closest anchor element
		const node = (e.target as HTMLElement).closest('a')
		if (!node) return

		// skip if link shouldn't be intercepted
		if (
			(settings.handleClicks === false && !node.hasAttribute('x-link')) ||
			node.hasAttribute('data-native') ||
			node.hasAttribute('native')
		) {
			return
		}

		const href = node.getAttribute('href')
		const target = node.getAttribute('target')

		// only handle internal links without special targets
		if (href && (!target || /^_?self$/i.test(target))) {
			// if the link contains a url scheme (such as http:, tel:, mailto:, etc)
			// return without handling it
			if (/^[a-zA-Z][a-zA-Z0-9+\-.]*:/.test(href)) return
			Router.navigate(href)
			e.preventDefault()
		}
	})
}
