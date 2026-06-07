export const CONTACT_SERVICES = [
	{ id: "ai-html-to-wordpress", label: "AI HTML to WordPress theme" },
	{ id: "custom-website", label: "Custom website build" },
	{ id: "monthly-package", label: "Monthly website package" },
	{ id: "performance-seo", label: "Performance or SEO improvements" },
	{ id: "other", label: "Something else / not sure yet" },
] as const;

export type ContactServiceId = (typeof CONTACT_SERVICES)[number]["id"];

export function isValidServiceId(id: string): id is ContactServiceId {
	return CONTACT_SERVICES.some((service) => service.id === id);
}

export function getServiceLabel(id: string): string {
	return CONTACT_SERVICES.find((service) => service.id === id)?.label ?? id;
}

export function getServiceFromUrl(): string | null {
	if (typeof window === "undefined") return null;

	const fromSearch = new URLSearchParams(window.location.search).get("service");
	if (fromSearch) return fromSearch;

	const hash = window.location.hash;
	if (hash.includes("?")) {
		const query = hash.slice(hash.indexOf("?") + 1);
		return new URLSearchParams(query).get("service");
	}

	return null;
}

/** Homepage contact link, optionally pre-selecting a service in the form. */
export function contactHref(serviceId?: ContactServiceId): string {
	if (serviceId) {
		return `/?service=${encodeURIComponent(serviceId)}#contact`;
	}
	return "/#contact";
}
