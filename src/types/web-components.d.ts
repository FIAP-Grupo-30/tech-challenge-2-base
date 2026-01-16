interface ByteBankHeaderElement extends HTMLElement {
	setActiveMenuItem(href: string | null): void;
	closeMenu(): void;
}

interface Window {
	__BYTEBANK_API_BASE__?: string;
	__BYTEBANK_ASSET_BASE__?: string;
}
