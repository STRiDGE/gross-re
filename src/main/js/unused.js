/**
 * A way to get an html friendly ID from a HAL entity link
 * @param The entity.  This can by the entity container, the entity itself, the '_links' object or the 'self' link
 * itself.  The method will try to find the self link and use that to get to unique ID.
 * @returns {string} Everything in the URL after the 'api/' part with backslashes replaces with underscore
 */

function getId(object) {
	let leaf = object;

	if ("entity" in leaf) {
		leaf = leaf.entity;
	}

	if ("_links" in leaf) {
		leaf = leaf._links;
	}

	if ("self" in leaf) {
		leaf = leaf.self;
	}

	let url = leaf.href;

	if (url.indexOf('api/') > -1) {
		url = url.split('api/')[1];
	}

	url = url.replace(/\//g, '_');

	return url;
}
