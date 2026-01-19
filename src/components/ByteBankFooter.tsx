import { useNavigate } from "react-router-dom";

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

interface ByteBankFooterProps {
	logoUrl?: string;
	assetBase?: string;
	services?: Service[];
	contacts?: Contact[];
	socialLinks?: SocialLink[];
}

const DEFAULT_SERVICES: Service[] = [
	{ label: "Home", href: "/" },
	{ label: "Dashboard", href: "/dashboard" },
	{ label: "Financeiro", href: "/financeiro" },
];

const DEFAULT_CONTACTS: Contact[] = [
	{ text: "(11) 0800-000-0000" },
	{ text: "meajuda@bytebank.com.br" },
	{ text: "ouvidoria@bytebank.com.br" },
];

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
	{
		name: "Instagram",
		href: "https://instagram.com",
		icon: "instagram.svg",
	},
	{
		name: "WhatsApp",
		href: "https://whatsapp.com",
		icon: "whatsapp.svg",
	},
	{
		name: "YouTube",
		href: "https://youtube.com",
		icon: "youtube.svg",
	},
];

const ByteBankFooter: React.FC<ByteBankFooterProps> = ({
	logoUrl = "logo-white.svg",
	assetBase = "",
	services = DEFAULT_SERVICES,
	contacts = DEFAULT_CONTACTS,
	socialLinks = DEFAULT_SOCIAL_LINKS,
}) => {
	const navigate = useNavigate();

	const resolveAsset = (path: string): string => {
		if (!path) return "";
		if (path.startsWith("http")) return path;
		return `${assetBase}${path.startsWith("/") ? "" : "/"}${path}`;
	};

	const handleServiceClick = (href: string) => {
		navigate(href);
	};

	const handleSocialClick = (href: string) => {
		window.open(href, "_blank", "noopener,noreferrer");
	};

	return (
		<footer className="base:bg-black base:text-white base:py-9 base:font-sans">
			<div className="base:max-w-[1620px] base:mx-auto base:px-4">
				<div className="base:grid base:grid-cols-1 base:lg:grid-cols-3 base:gap-8 base:p-4">
					{/* SERVICES */}
					<section className="base:flex base:flex-col">
						<h4 className="base:mb-5 base:text-[1.3rem] base:font-semibold base:text-[#47a138] base:text-left">
							Serviços
						</h4>
						<ul className="base:list-none base:flex base:flex-col base:gap-5">
							{services.map((service) => (
								<li key={service.href}>
									<button
										type="button"
										onClick={() => handleServiceClick(service.href)}
										className="base:text-white base:no-underline base:text-[18px] base:transition-colors base:duration-300 base:cursor-pointer base:hover:text-[#47a138] base:text-left base:bg-transparent base:border-none base:p-0"
									>
										{service.label}
									</button>
								</li>
							))}
						</ul>
					</section>

					{/* CONTACT */}
					<section className="base:flex base:flex-col">
						<h4 className="base:mb-5 base:text-[1.3rem] base:font-semibold base:text-[#47a138] base:text-left">
							Contato
						</h4>
						{contacts.map((contact, index) => (
							<p key={index} className="base:text-[18px] base:mb-3 base:leading-[1.8]">
								{contact.text}
							</p>
						))}
					</section>

					{/* BRAND & SOCIAL */}
					<section className="base:flex base:flex-col">
						<h4 className="base:mb-5 base:text-[1.3rem] base:font-semibold base:text-[#47a138] base:text-left base:lg:text-center base:sm:text-left">
							Desenvolvido por Bytebank
						</h4>

						<figure className="base:flex base:mt-3 base:mb-8 base:justify-center base:lg:justify-center base:sm:justify-start">
							<img
								src={resolveAsset(logoUrl)}
								alt="Logo Branco ByteBank"
								className="base:w-[180px] base:h-[35px]"
							/>
						</figure>

						<ul className="base:list-none base:flex base:items-center base:gap-9 base:justify-center base:lg:justify-center base:sm:justify-start">
							{socialLinks.map((social) => (
								<li key={social.name}>
									<button
										type="button"
										onClick={() => handleSocialClick(social.href)}
										className="base:inline-block base:transition-transform base:duration-300 base:cursor-pointer base:hover:scale-110 base:bg-transparent base:border-none base:p-0"
										aria-label={social.name}
									>
										<img
											src={resolveAsset(social.icon)}
											alt={`${social.name} icon`}
											className={`${
												social.name.toLowerCase() === "youtube"
													? "base:w-[38px] base:h-[38px]"
													: "base:w-9 base:h-9"
											}`}
										/>
									</button>
								</li>
							))}
						</ul>
					</section>
				</div>
			</div>
		</footer>
	);
};

export default ByteBankFooter;
