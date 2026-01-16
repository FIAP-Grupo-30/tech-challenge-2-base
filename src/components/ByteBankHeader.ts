// Componente Header + Navbar Agnóstico //

interface NavItem {
	name: string;
	href: string;
}

class ByteBankHeader extends HTMLElement {
	shadowRoot!: ShadowRoot;
	mobileMenuOpen: boolean = false;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.mobileMenuOpen = false;
	}

	static get observedAttributes(): string[] {
		return ["logo-url", "logo-small-url", "show-auth-buttons"];
	}

	connectedCallback(): void {
		this.render();
		this.setupEventListeners();
	}

	attributeChangedCallback(): void {
		this.render();
		this.setupEventListeners();
	}

	getNavItems(): NavItem[] {
		// Tentar pegar do slot
		const menuSlot = this.querySelector('[slot="menu"]');
		if (menuSlot) {
			const items = menuSlot.querySelectorAll("[data-menu-item]");
			if (items.length > 0) {
				return Array.from(items).map((item) => ({
					name: item.getAttribute("data-label") || "",
					href: item.getAttribute("data-href") || "#",
				}));
			}
		}

		return [
			{ name: "Home", href: "/" },
			{ name: "Dashboard", href: "/dashboard" },
			{ name: "Financeiro", href: "/financeiro" },
			{ name: "Para você", href: "/paravoce" },
		];
	}

	resolveAsset(path: string | null): string {
		if (!path) return "";
		if (path.startsWith("http")) return path;
		const assetBase = this.getAttribute("asset-base") || "";
		return `${assetBase}${path.startsWith("/") ? "" : "/"}${path}`;
	}

	render(): void {
		const rawLogo = this.getAttribute("logo-url") || "logo-green.svg";
		const rawLogoSmall =
			this.getAttribute("logo-small-url") || "logo-small.svg";
		const logoUrl = this.resolveAsset(rawLogo);
		const logoSmallUrl = this.resolveAsset(rawLogoSmall);
		const showAuthButtons = this.getAttribute("show-auth-buttons") !== "false";
		const navItems = this.getNavItems();

		this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        header {
          background: #000;
          color: white;
          padding: 1.25rem 0;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .container {
          width: 100%;
          padding: 0 2.5rem;
        }

        .header-content {
          display: flex;
          width: 100%;
        }

        .main-section {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          gap: 1.25rem;
        }

        /* NAVBAR SECTION */
        .navbar-container {
          order: 2;
          flex: 1;
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: left;
        }

        /* Mobile Toggle */
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .hamburger-icon {
          width: 2.25rem;
          height: 2.25rem;
          stroke: #47A138;
          stroke-width: 2;
        }

        /* Desktop Menu */
        .nav-links {
          display: flex;
          gap: 4rem;
          list-style: none;
          align-items: center;
        }

        .nav-link {
          color: #47A138;
          text-decoration: none;
          font-size: 1.1875rem;
          font-weight: 500;
          transition: all 0.3s;
          cursor: pointer;
        }

        .nav-link:hover {
          text-decoration: underline;
        }

        .nav-link.active {
          font-weight: 600;
        }

        /* Mobile Menu */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 73px;
          left: 0;
          right: 0;
          background: #000;
          border-top: 1px solid rgba(71, 161, 56, 0.2);
          padding: 1rem 2.5rem;
          flex-direction: column;
          gap: 0.5rem;
          max-height: calc(100vh - 73px);
          overflow-y: auto;
          z-index: 40;
        }

        .mobile-menu.open {
          display: flex;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-menu .nav-link {
          display: block;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(71, 161, 56, 0.1);
        }

        /* LOGO SECTION */
        .logo-container {
          order: 1;
          flex-shrink: 0;
        }

        .logo-container a {
          display: inline-block;
          line-height: 0;
        }

        .logo-large {
          display: block;
          width: 170px;
          height: 38px;
          margin-right: 60px;
        }

        .logo-small {
          display: none;
          width: 45px;
          height: 45px;
        }

        /* AUTH BUTTONS SECTION */
        .auth-buttons {
          display: flex;
          gap: 1.25rem;
          flex-shrink: 0;
        }

        .btn {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          height: 2.75rem;
          text-align: center;
          border-radius: 8px;
          min-width: 180px;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
        }

        .btn-primary {
          background: #47a138;
          color: white;
          border: none;
        }

        .btn-primary:hover {
          background: #FFF;
          color: #59b449;
        }

        .btn-secondary {
          background: transparent;
          border: 3px solid #47a138;
          color: #47a138;
        }

        .btn-secondary:hover {
          background: #47a138;
          color: white;
        }

        /* RESPONSIVE */
        @media (max-width: 1280px) {
          .auth-buttons {
            display: none;
          }

          .nav-links {
            gap: 2.5rem;
          }
        }

        @media (max-width: 1024px) {
          .logo-large {
            display: none;
          }

          .logo-small {
            display: block;
          }

          .navbar-container {
            order: 1;
          }

          .logo-container {
            order: 2;
          }

          .nav-links {
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 1.5rem;
          }

          .logo-large {
            display: block;
            margin-right: 0;
          }

          .logo-small {
            display: none;
          }

          .mobile-toggle {
            display: block;
          }

          .nav-links {
            display: none;
          }

          .mobile-menu {
            padding: 1rem 1.5rem;
          }
        }

        @media (max-width: 640px) {
          header {
            padding: 1rem 0;
          }
        }
      </style>

      <header>
        <div class="container">
          <div class="header-content">
            <div class="main-section">
              
              <!-- NAVBAR -->
              <div class="navbar-container">
                <nav class="navbar">
                  <!-- Mobile Toggle -->
                  <button class="mobile-toggle" id="mobile-toggle" aria-label="Menu">
                    ${
											this.mobileMenuOpen
												? `
                      <svg class="hamburger-icon" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    `
												: `
                      <svg class="hamburger-icon" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                      </svg>
                    `
										}
                  </button>

                  <!-- Desktop Links -->
                  <ul class="nav-links">
                    ${navItems
											.map(
												(item) => `
                      <li>
                        <a href="${item.href}" class="nav-link" data-href="${item.href}">
                          ${item.name}
                        </a>
                      </li>
                    `,
											)
											.join("")}
                  </ul>
                </nav>
              </div>

              <!-- LOGO -->
              <div class="logo-container">
                <a href="/" aria-label="ByteBank - Página Inicial" id="logo-link">
                  <img src="${logoUrl}" alt="Logo ByteBank" class="logo-large" />
                  <img src="${logoSmallUrl}" alt="Logo ByteBank - Small" class="logo-small" />
                </a>
              </div>
            </div>

            <!-- AUTH BUTTONS -->
            ${
							showAuthButtons
								? `
              <div class="auth-buttons">
                <a href="/cadastro" class="btn btn-primary" data-auth="signup">
                  Abrir minha conta
                </a>
                <a href="/login" class="btn btn-secondary" data-auth="login">
                  Já tenho conta
                </a>
              </div>
            `
								: ""
						}
          </div>
        </div>

        <!-- MOBILE MENU -->
        <div class="mobile-menu ${this.mobileMenuOpen ? "open" : ""}" id="mobile-menu">
          ${navItems
						.map(
							(item) => `
            <a href="${item.href}" class="nav-link" data-href="${item.href}">
              ${item.name}
            </a>
          `,
						)
						.join("")}
          
          ${
						showAuthButtons
							? `
            <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
              <a href="/cadastro" class="btn btn-primary" style="width: 100%;" data-auth="signup">
                Abrir minha conta
              </a>
              <a href="/login" class="btn btn-secondary" style="width: 100%;" data-auth="login">
                Já tenho conta
              </a>
            </div>
          `
							: ""
					}
        </div>
      </header>
    `;
	}

	setupEventListeners(): void {
		// Mobile Toggle
		const mobileToggle = this.shadowRoot.getElementById("mobile-toggle");
		mobileToggle?.addEventListener("click", () => {
			this.mobileMenuOpen = !this.mobileMenuOpen;
			this.render();
			this.setupEventListeners();

			this.dispatchEvent(
				new CustomEvent("menu-toggle", {
					bubbles: true,
					composed: true,
					detail: { isOpen: this.mobileMenuOpen },
				}),
			);
		});

		// Logo Click
		const logoLink = this.shadowRoot.getElementById("logo-link");
		logoLink?.addEventListener("click", (e: Event) => {
			e.preventDefault();
			this.dispatchEvent(
				new CustomEvent("logo-click", {
					bubbles: true,
					composed: true,
				}),
			);
		});

		// Nav Links Click (Desktop e Mobile)
		const navLinks = this.shadowRoot.querySelectorAll(".nav-link");
		navLinks.forEach((link) => {
			link.addEventListener("click", (e: Event) => {
				e.preventDefault();
				const href = link.getAttribute("data-href");

				this.dispatchEvent(
					new CustomEvent("nav-click", {
						bubbles: true,
						composed: true,
						detail: {
							href,
							label: link.textContent?.trim() || "",
						},
					}),
				);

				// Fechar menu mobile
				if (this.mobileMenuOpen) {
					this.mobileMenuOpen = false;
					this.render();
					this.setupEventListeners();
				}
			});
		});

		// Auth Buttons Click
		const authButtons = this.shadowRoot.querySelectorAll("[data-auth]");
		authButtons.forEach((btn) => {
			btn.addEventListener("click", (e: Event) => {
				e.preventDefault();
				const action = btn.getAttribute("data-auth");
				const href = btn.getAttribute("href");

				this.dispatchEvent(
					new CustomEvent("auth-click", {
						bubbles: true,
						composed: true,
						detail: { action, href },
					}),
				);

				// Fechar menu mobile
				if (this.mobileMenuOpen) {
					this.mobileMenuOpen = false;
					this.render();
					this.setupEventListeners();
				}
			});
		});
	}

	// API Pública
	setActiveMenuItem(href: string | null): void {
		const links = this.shadowRoot.querySelectorAll(".nav-link");
		links.forEach((link) => {
			const isActive = link.getAttribute("data-href") === href;
			link.classList.toggle("active", isActive);
		});
	}

	closeMenu(): void {
		if (this.mobileMenuOpen) {
			this.mobileMenuOpen = false;
			this.render();
			this.setupEventListeners();
		}
	}
}

// Registrar o componente
if (!customElements.get("bytebank-header")) {
	customElements.define("bytebank-header", ByteBankHeader);
	console.log("✅ ByteBank Header com Navbar integrado registrado!");
}

export default ByteBankHeader;
