declare module "astro:actions" {
	type Actions = typeof import("/Users/s.richards/Documents/GitHub/sjrdesigns.com/src/actions")["server"];

	export const actions: Actions;
}