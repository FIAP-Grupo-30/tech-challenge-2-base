import { useNavigate } from "react-router-dom";
import vantagensMock from "../data/vantagens.json";
import banner from "../assets/banner-home.svg";
import contaImg from "../assets/conta-e-cartao-gratuitos.svg";
import saquesImg from "../assets/saques-sem-custo.svg";
import pontosImg from "../assets/programa-de-pontos.svg";
import seguroImg from "../assets/seguro-dispositivos.svg";

interface Vantagem {
	id: number;
	titulo: string;
	descricao: string;
	imagemUrl: string;
}

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className="base:flex base:flex-col base:bg-[#FFF]">
			<div className="base:bg-gradient-to-b base:from-[#004D61] base:to-[#FFF] base:pt-10 base:pb-23">
				<div className="base:container base:mx-auto">
					{/* BANNER */}
					<div className="base:grid base:lg:grid-cols-2 base:md:grid-cols-1 base:sm:grid-cols-1 base:mb-18 base:gap-14 base:p-5">
						<section>
							<div className="base:flex base:items-center base:h-full">
								<div>
									<h1 className="base:font-bold base:text-[33px] base:leading-[1.5em] base:lg:text-left base:md:text-center base:text-center">
										Experimente mais liberdade no controle da sua vida
										financeira. Crie sua conta com a gente!!!
									</h1>
								</div>
							</div>
						</section>

						<section>
							<img
								className="base:mx-auto base:max-w-full base:h-auto"
								src={banner}
								alt="Banner"
								width="900"
								height="450"
							/>
						</section>
					</div>

					{/* CTA MOBILE */}
					<div className="base:sm:block base:md:block base:lg:hidden base:mb-18 base:pl-4 base:pr-4">
						<div className="base:flex base:gap-5 base:md:grid-cols-2">
							<button
								onClick={() => navigate("/cadastro")}
								className="base:inline-flex base:justify-center base:items-center base:h-14 base:text-center base:rounded-[8px] base:bg-[#000] base:hover:bg-[transparent] base:border-[3px] base:border-[#000] base:w-full base:font-semibold base:text-[#FFF] base:text-[19px] base:hover:text-[#000] base:transition base:duration-300"
								aria-label="Abrir minha conta"
							>
								Abrir minha conta
							</button>

							<button
								onClick={() => navigate("/login")}
								className="base:inline-flex base:justify-center base:items-center base:h-14 base:text-center base:rounded-[8px] base:bg-transparent base:hover:bg-[#000] base:border-[3px] base:border-[#000] base:w-full base:font-semibold base:text-[#000] base:hover:text-[#FFF] base:text-[19px] base:transition base:duration-300"
								aria-label="Já tenho conta"
							>
								Já tenho conta
							</button>
						</div>
					</div>

					{/* VANTAGENS */}
					<div>
						<h2 className="base:text-center base:font-bold base:text-[30px] base:mb-16">
							Vantagens do nosso banco:
						</h2>

						<div className="base:grid base:gap-14 base:md:grid-cols-2 base:lg:grid-cols-2 base:xl:grid-cols-4">
							{(vantagensMock as Vantagem[]).map((vantagem) => (
								<section key={vantagem.id} className="base:text-center base:p-4">
									<figure>
										<img
											className="base:mx-auto base:w-20 base:h-auto"
											src={
												vantagem.imagemUrl === "conta-e-cartao-gratuitos.svg"
													? contaImg
													: vantagem.imagemUrl === "saques-sem-custo.svg"
														? saquesImg
														: vantagem.imagemUrl === "programa-de-pontos.svg"
															? pontosImg
															: vantagem.imagemUrl === "seguro-dispositivos.svg"
																? seguroImg
																: ""
											}
											alt={vantagem.titulo}
											width="74"
											height="56"
										/>
									</figure>

									<h3 className="base:font-bold base:text-[22px] base:text-[#47A138] base:mt-5 base:mb-5">
										{vantagem.titulo}
									</h3>

									<p className="base:text-[#767676] base:text-[19px]">
										{vantagem.descricao}
									</p>
								</section>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
