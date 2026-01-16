// Componente Footer Agnóstico //

interface Service {
	label: string;
	href: string;
}

interface Contact {
	text: string;
}

interface SocialLink {
	name: string;
	href: string;
	icon: string;
}

class ByteBankFooter extends HTMLElement {
	shadowRoot!: ShadowRoot;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	static get observedAttributes(): string[] {
		return ["logo-url", "asset-base"];
	}

	connectedCallback(): void {
		this.render();
		this.setupEventListeners();
	}

	attributeChangedCallback(): void {
		this.render();
		this.setupEventListeners();
	}

	// ===============================
	// ASSET RESOLUTION (MF SAFE)
	// ===============================

	get assetBase(): string {
		return this.getAttribute("asset-base") || "";
	}

	resolveAsset(path: string | null): string {
		if (!path) return "";
		if (path.startsWith("http")) return path;
		return `${this.assetBase}${path.startsWith("/") ? "" : "/"}${path}`;
	}

	// ===============================
	// DATA
	// ===============================

	getServices(): Service[] {
		return [
			{ label: "Home", href: "/" },
			{ label: "Dashboard", href: "/dashboard" },
			{ label: "Financeiro", href: "/financeiro" },
			{ label: "Para você", href: "/paravoce" },
		];
	}

	getContacts(): Contact[] {
		return [
			{ text: "(11) 0800-000-0000" },
			{ text: "meajuda@bytebank.com.br" },
			{ text: "ouvidoria@bytebank.com.br" },
		];
	}

	getSocialLinks(): SocialLink[] {
		return [
			{
				name: "Instagram",
				href: "https://instagram.com",
				icon: "instagram.svg",
			},
			{ name: "WhatsApp", href: "https://whatsapp.com", icon: "whatsapp.svg" },
			{ name: "YouTube", href: "https://youtube.com", icon: "youtube.svg" },
		];
	}

	// ===============================
	// RENDER
	// ===============================

	render(): void {
		const logoUrl = this.resolveAsset(
			this.getAttribute("logo-url") || "logo-white.svg",
		);

		const services = this.getServices();
		const contacts = this.getContacts();
		const socialLinks = this.getSocialLinks();

		this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        footer {
          background: #000;
          color: white;
          padding: 2.25rem 0;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .container {
          max-width: 1620px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          padding: 1rem;
        }

        section {
          display: flex;
          flex-direction: column;
        }

        h4 {
          margin-bottom: 1.25rem;
          font-size: 1.3rem;
          font-weight: 600;
          color: #47a138;
        }

        .title-footer {
          text-align: left;
        }

        .services-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
        }

        .service-link {
          color: white;
          text-decoration: none;
          font-size: 1.13rem;
          transition: color 0.3s;
        }

        .service-link:hover {
          color: #47a138;
        }

        .contact-info {
          font-size: 1.125rem;
          margin-bottom: 0.75rem;
          line-height: 1.8;
        }

        .logo-container {
          display: flex;
          margin-top: 0.75rem;
          margin-bottom: 2rem;
        }

        .logo {
          width: 180px;
          height: 35px;
        }

        .social-list {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 2.25rem;
        }

        .social-link {
          display: inline-block;
          transition: transform 0.3s;
        }

        .social-link:hover {
          transform: scale(1.1);
        }

        .social-icon {
          width: 36px;
          height: 36px;
        }

        .social-icon.youtube {
          width: 38px;
          height: 38px;
        }

        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .logo-container,
          .social-list {
            justify-content: center;
          }

          .title-footer {
            text-align: center;
          }
        }
      </style>

      <footer>
        <div class="container">
          <div class="grid">

            <section>
              <h4>Serviços</h4>
              <ul class="services-list">
                ${services
									.map(
										(service) => `
                  <li>
                    <a
                      href="${service.href}"
                      class="service-link"
                      data-service-href="${service.href}"
                    >
                      ${service.label}
                    </a>
                  </li>
                `,
									)
									.join("")}
              </ul>
            </section>

            <section>
              <h4>Contato</h4>
              ${contacts
								.map(
									(contact) => `
                <p class="contact-info">${contact.text}</p>
              `,
								)
								.join("")}
            </section>

            <section>
              <h4 class="title-footer">Desenvolvido por Bytebank</h4>

              <figure class="logo-container">
                <img
                  src="${logoUrl}"
                  alt="Logo Branco ByteBank"
                  class="logo"
                />
              </figure>

              <ul class="social-list">
                ${socialLinks
									.map(
										(social) => `
                  <li>
                    <a
                      href="${social.href}"
                      class="social-link"
                      data-social-href="${social.href}"
                      aria-label="${social.name}"
                    >
                      <img
                        src="${this.resolveAsset(social.icon)}"
                        alt="${social.name} icon"
                        class="social-icon ${social.name.toLowerCase()}"
                      />
                    </a>
                  </li>
                `,
									)
									.join("")}
              </ul>
            </section>

          </div>
        </div>
      </footer>
    `;
	}

	// ===============================
	// EVENTS
	// ===============================

	setupEventListeners(): void {
		this.shadowRoot.querySelectorAll("[data-service-href]").forEach((link) => {
			link.addEventListener("click", (e: Event) => {
				e.preventDefault();
				const target = e.target as HTMLElement;
				this.dispatchEvent(
					new CustomEvent("service-click", {
						bubbles: true,
						composed: true,
						detail: {
							href: target.getAttribute("data-service-href"),
							label: target.textContent?.trim() || "",
						},
					}),
				);
			});
		});

		this.shadowRoot.querySelectorAll("[data-social-href]").forEach((link) => {
			link.addEventListener("click", () => {
				const href = link.getAttribute("data-social-href");
				if (href) {
					window.open(href, "_blank", "noopener,noreferrer");
				}
			});
		});
	}
}

// ===============================
// REGISTER
// ===============================

if (!customElements.get("bytebank-footer")) {
	customElements.define("bytebank-footer", ByteBankFooter);
	console.log("✅ ByteBank Footer agnóstico registrado!");
}

export default ByteBankFooter;
