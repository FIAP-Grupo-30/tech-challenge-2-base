// ===== BYTEBANK FOOTER - WEB COMPONENT AGNÓSTICO =====

class ByteBankFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['logo-url'];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback() {
    this.render();
    this.setupEventListeners();
  }

  getServices() {
    const servicesSlot = this.querySelector('[slot="services"]');
    if (servicesSlot) {
      const items = servicesSlot.querySelectorAll('[data-service-item]');
      return Array.from(items).map(item => ({
        label: item.getAttribute('data-label'),
        href: item.getAttribute('data-href') || '#'
      }));
    }

    // Serviços padrão
    return [
      { label: 'Home', href: '/' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Financeiro', href: '/financeiro' },
      { label: 'Para você', href: '/paravoce' }
    ];
  }

  getContacts() {
    const contactsSlot = this.querySelector('[slot="contacts"]');
    if (contactsSlot) {
      const items = contactsSlot.querySelectorAll('[data-contact-item]');
      return Array.from(items).map(item => ({
        text: item.getAttribute('data-text')
      }));
    }

    // Contatos padrão
    return [
      { text: '(11) 0800-000-0000' },
      { text: 'meajuda@bytebank.com.br' },
      { text: 'ouvidoria@bytebank.com.br' }
    ];
  }

  getSocialLinks() {
    const socialSlot = this.querySelector('[slot="social"]');
    if (socialSlot) {
      const items = socialSlot.querySelectorAll('[data-social-item]');
      return Array.from(items).map(item => ({
        name: item.getAttribute('data-name'),
        href: item.getAttribute('data-href'),
        icon: item.getAttribute('data-icon')
      }));
    }

    // Redes sociais padrão
    return [
      { name: 'Instagram', href: 'https://instagram.com', icon: '/instagram.svg' },
      { name: 'WhatsApp', href: 'https://whatsapp.com', icon: '/whatsapp.svg' },
      { name: 'YouTube', href: 'https://youtube.com', icon: '/youtube.svg' }
    ];
  }

  render() {
    const logoUrl = this.getAttribute('logo-url') || '/logo-white.svg';
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
        }

        .container {
          max-width: 1400px;
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
          font-size: 1.30rem;
          font-weight: 600;
          color: #47a138;
        }

        /* Serviços */
        .services-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
        }

        .service-link {
          color: white;
          text-decoration: none;
          font-size: 1.130rem;
          transition: color 0.3s;
        }

        .service-link:hover {
          color: #47a138;
        }

        /* Contato */
        .contact-info {
          font-size: 1.125rem;
          margin-bottom: 0.75rem;
          line-height: 1.8;
        }

        /* Desenvolvido por */
        .developer-section h4 {
          text-align: left;
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

        .social-links {
          display: flex;
          align-items: center;
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

        /* Responsive */
        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .developer-section h4 {
            text-align: center;
          }

          .logo-container {
            justify-content: center;
          }

          .social-links {
            justify-content: center;
          }
        }

        @media (min-width: 1280px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .developer-section h4 {
            text-align: center;
          }

          .logo-container {
            justify-content: center;
          }

          .social-links {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .grid {
            gap: 2rem;
          }

          .social-list {
            gap: 1.5rem;
          }
        }
      </style>

      <footer>
        <div class="container">
          <div class="grid">
            
            <!-- Serviços -->
            <section aria-labelledby="services">
              <h4 id="services">Serviços</h4>
              <nav aria-label="Serviços">
                <ul class="services-list" role="list">
                  ${services.map(service => `
                    <li>
                      <a 
                        href="${service.href}" 
                        class="service-link"
                        data-service-href="${service.href}"
                        rel="noopener noreferrer"
                      >
                        ${service.label}
                      </a>
                    </li>
                  `).join('')}
                </ul>
              </nav>
            </section>

            <!-- Contato -->
            <section aria-labelledby="contact">
              <h4 id="contact">Contato</h4>
              ${contacts.map(contact => `
                <p class="contact-info">${contact.text}</p>
              `).join('')}
            </section>

            <!-- Desenvolvido por Bytebank -->
            <section class="developer-section" aria-labelledby="developer-by-bytebank">
              <h4 id="developer-by-bytebank">Desenvolvido por Bytebank</h4>
              
              <figure class="logo-container">
                <img 
                  src="${logoUrl}" 
                  alt="Logo Branco ByteBank" 
                  class="logo"
                />
              </figure>

              <nav class="social-links" aria-label="Redes sociais">
                <ul class="social-list" role="list">
                  ${socialLinks.map(social => `
                    <li>
                      <a 
                        href="${social.href}" 
                        class="social-link"
                        data-social-name="${social.name}"
                        data-social-href="${social.href}"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="${social.name}"
                      >
                        <img 
                          src="${social.icon}" 
                          alt="${social.name} icon" 
                          class="social-icon ${social.name.toLowerCase()}"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  `).join('')}
                </ul>
              </nav>
            </section>

          </div>
        </div>
      </footer>
    `;
  }

  setupEventListeners() {
    // Service links
    const serviceLinks = this.shadowRoot.querySelectorAll('[data-service-href]');
    serviceLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('data-service-href');
        
        this.dispatchEvent(new CustomEvent('service-click', {
          bubbles: true,
          composed: true,
          detail: { 
            href, 
            label: link.textContent.trim() 
          }
        }));
      });
    });

    // Social links
    const socialLinks = this.shadowRoot.querySelectorAll('[data-social-href]');
    socialLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const name = link.getAttribute('data-social-name');
        const href = link.getAttribute('data-social-href');
        
        this.dispatchEvent(new CustomEvent('social-click', {
          bubbles: true,
          composed: true,
          detail: { name, href }
        }));
        
        // Abrir em nova aba
        window.open(href, '_blank', 'noopener,noreferrer');
      });
    });
  }
}

// Registrar o componente
if (!customElements.get('bytebank-footer')) {
  customElements.define('bytebank-footer', ByteBankFooter);
  console.log('✅ ByteBank Footer agnóstico registrado!');
}

export default ByteBankFooter;