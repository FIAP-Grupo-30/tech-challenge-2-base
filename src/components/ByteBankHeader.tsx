import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavItem {
	name: string;
	href: string;
}

interface ByteBankHeaderProps {
	logoUrl?: string;
	logoSmallUrl?: string;
	showAuthButtons?: boolean;
	assetBase?: string;
	navItems?: NavItem[];
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
	{ name: "Home", href: "/" },
	{ name: "Dashboard", href: "/dashboard" },
	{ name: "Financeiro", href: "/financeiro" },
];

const ByteBankHeader: React.FC<ByteBankHeaderProps> = ({
	logoUrl = "logo-green.svg",
	logoSmallUrl = "logo-small.svg",
	showAuthButtons = true,
	assetBase = "",
	navItems = DEFAULT_NAV_ITEMS,
}) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const resolveAsset = (path: string): string => {
		if (!path) return "";
		if (path.startsWith("http")) return path;
		return `${assetBase}${path.startsWith("/") ? "" : "/"}${path}`;
	};

	const handleNavClick = (href: string) => {
		navigate(href);
		setMobileMenuOpen(false);
	};

	const handleLogoClick = (e: React.MouseEvent) => {
		e.preventDefault();
		navigate("/");
	};

	const handleAuthClick = (href: string) => {
		navigate(href);
		setMobileMenuOpen(false);
	};

	const toggleMobileMenu = () => {
		setMobileMenuOpen((prev) => !prev);
	};

	// Fechar menu mobile ao mudar de rota
	useEffect(() => {
		setMobileMenuOpen(false);
	}, [location.pathname]);

	const isActive = (href: string) => location.pathname === href;

	return (
		<header className="base:bg-black base:text-white base:py-5 base:sticky base:top-0 base:z-50">
			<div className="base:w-full base:px-6 base:md:px-10">
				<div className="base:flex base:w-full base:justify-between base:items-center base:gap-5">
					{/* NAVBAR - Mobile/Tablet */}
					<div className="base:lg:order-2 base:lg:flex-1">
						<nav className="base:flex base:items-center">
							{/* Mobile Toggle */}
							<button
								type="button"
								className="base:lg:hidden base:bg-transparent base:border-none base:cursor-pointer base:p-2"
								onClick={toggleMobileMenu}
								aria-label="Menu"
								aria-expanded={mobileMenuOpen}
							>
								<svg
									className="base:w-9 base:h-9 base:stroke-[#47A138] base:stroke-2"
									fill="none"
									viewBox="0 0 24 24"
								>
									{mobileMenuOpen ? (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									) : (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									)}
								</svg>
							</button>

							{/* Desktop Links */}
							<ul className="base:hidden base:lg:flex base:gap-10 base:xl:gap-16 base:list-none base:items-center">
								{navItems.map((item) => (
									<li key={item.href}>
										<button
											type="button"
											onClick={() => handleNavClick(item.href)}
											className={`base:text-[#47A138] base:no-underline base:text-[19px] base:font-medium base:transition-all base:duration-300 base:cursor-pointer base:hover:underline ${
												isActive(item.href) ? "base:font-semibold" : ""
											}`}
										>
											{item.name}
										</button>
									</li>
								))}
							</ul>
						</nav>
					</div>

					{/* LOGO */}
					<div className="base:lg:order-1 base:flex-shrink-0">
						<button
							type="button"
							onClick={handleLogoClick}
							className="base:inline-block base:leading-none"
							aria-label="ByteBank - Página Inicial"
						>
							{/* Logo grande - Mobile e Desktop */}
							<img
								src={resolveAsset(logoUrl)}
								alt="Logo ByteBank"
								className="base:block base:md:hidden base:lg:block base:w-[170px] base:h-[38px] base:lg:mr-[60px]"
							/>
							{/* Logo pequeno - Tablet */}
							<img
								src={resolveAsset(logoSmallUrl)}
								alt="Logo ByteBank - Small"
								className="base:hidden base:md:block base:lg:hidden base:w-[45px] base:h-[45px]"
							/>
						</button>
					</div>

					{/* AUTH BUTTONS */}
					{showAuthButtons && (
						<div className="base:lg:order-3 base:hidden base:xl:flex base:gap-5 base:flex-shrink-0">
							<button
								type="button"
								onClick={() => handleAuthClick("/cadastro")}
								className="base:inline-flex base:justify-center base:items-center base:h-11 base:text-center base:rounded-lg base:min-w-[180px] base:text-base base:font-semibold base:transition-all base:duration-300 base:no-underline base:cursor-pointer base:whitespace-nowrap base:bg-[#47a138] base:text-white base:border-none base:hover:bg-white base:hover:text-[#59b449]"
							>
								Abrir minha conta
							</button>
							<button
								type="button"
								onClick={() => handleAuthClick("/login")}
								className="base:inline-flex base:justify-center base:items-center base:h-11 base:text-center base:rounded-lg base:min-w-[180px] base:text-base base:font-semibold base:transition-all base:duration-300 base:no-underline base:cursor-pointer base:whitespace-nowrap base:bg-transparent base:border-[3px] base:border-[#47a138] base:text-[#47a138] base:hover:bg-[#47a138] base:hover:text-white"
							>
								Já tenho conta
							</button>
						</div>
					)}
				</div>
			</div>

			{/* MOBILE MENU */}
			<div
				className={`base:fixed base:top-[73px] base:md:pt-5 base:md:pb-10 base:left-0 base:right-0 base:bg-black base:border-t base:border-[rgba(71,161,56,0.2)] base:px-6 base:md:px-10 base:flex-col base:gap-2 base:max-h-[calc(100vh-73px)] base:overflow-y-auto base:z-40 base:transition-all base:duration-300 ${
					mobileMenuOpen ? "base:flex" : "base:hidden"
				}`}
			>
				{navItems.map((item) => (
					<button
						key={item.href}
						type="button"
						onClick={() => handleNavClick(item.href)}
						className="base:block base:py-4 base:border-b base:border-[rgba(71,161,56,0.1)] base:text-left base:text-[#47A138] base:no-underline base:text-[19px] base:font-medium base:transition-all base:duration-300 base:cursor-pointer base:hover:underline"
					>
						{item.name}
					</button>
				))}

				{showAuthButtons && (
					<div className="base:mt-4 base:flex base:flex-col base:gap-3">
						<button
							type="button"
							onClick={() => handleAuthClick("/cadastro")}
							className="base:w-full base:inline-flex base:justify-center base:items-center base:h-11 base:text-center base:rounded-lg base:text-base base:font-semibold base:transition-all base:duration-300 base:no-underline base:cursor-pointer base:whitespace-nowrap base:bg-[#47a138] base:text-white base:border-none base:hover:bg-white base:hover:text-[#59b449]"
						>
							Abrir minha conta
						</button>
						<button
							type="button"
							onClick={() => handleAuthClick("/login")}
							className="base:w-full base:inline-flex base:justify-center base:items-center base:h-11 base:text-center base:rounded-lg base:text-base base:font-semibold base:transition-all base:duration-300 base:no-underline base:cursor-pointer base:whitespace-nowrap base:bg-transparent base:border-[3px] base:border-[#47a138] base:text-[#47a138] base:hover:bg-[#47a138] base:hover:text-white"
						>
							Já tenho conta
						</button>
					</div>
				)}
			</div>
		</header>
	);
};

export default ByteBankHeader;
