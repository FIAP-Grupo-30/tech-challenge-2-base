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
	{ label: "Para você", href: "/paravoce" },
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
		<footer className="bg-black text-white py-9 font-sans">
			<div className="max-w-[1620px] mx-auto px-4">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4">
					{/* SERVICES */}
					<section className="flex flex-col">
						<h4 className="mb-5 text-[1.3rem] font-semibold text-[#47a138] text-left lg:text-center">
							Serviços
						</h4>
						<ul className="list-none flex flex-col gap-5">
							{services.map((service) => (
								<li key={service.href}>
									<button
										type="button"
										onClick={() => handleServiceClick(service.href)}
										className="text-white no-underline text-[18px] transition-colors duration-300 cursor-pointer hover:text-[#47a138] text-left bg-transparent border-none p-0"
									>
										{service.label}
									</button>
								</li>
							))}
						</ul>
					</section>

					{/* CONTACT */}
					<section className="flex flex-col">
						<h4 className="mb-5 text-[1.3rem] font-semibold text-[#47a138] text-left lg:text-center">
							Contato
						</h4>
						{contacts.map((contact, index) => (
							<p key={index} className="text-[18px] mb-3 leading-[1.8]">
								{contact.text}
							</p>
						))}
					</section>

					{/* BRAND & SOCIAL */}
					<section className="flex flex-col">
						<h4 className="mb-5 text-[1.3rem] font-semibold text-[#47a138] text-left lg:text-center">
							Desenvolvido por Bytebank
						</h4>

						<figure className="flex mt-3 mb-8 justify-center">
							<img
								src={resolveAsset(logoUrl)}
								alt="Logo Branco ByteBank"
								className="w-[180px] h-[35px]"
							/>
						</figure>

						<ul className="list-none flex items-center gap-9 justify-center">
							{socialLinks.map((social) => (
								<li key={social.name}>
									<button
										type="button"
										onClick={() => handleSocialClick(social.href)}
										className="inline-block transition-transform duration-300 cursor-pointer hover:scale-110 bg-transparent border-none p-0"
										aria-label={social.name}
									>
										<img
											src={resolveAsset(social.icon)}
											alt={`${social.name} icon`}
											className={`${
												social.name.toLowerCase() === "youtube"
													? "w-[38px] h-[38px]"
													: "w-9 h-9"
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
