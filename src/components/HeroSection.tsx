const HeroSection = () => {
	return (
		<div
			style={{
				background:
					"url('https://laverdaboom.s3.eu-north-1.amazonaws.com/uploads/valpar_cover.jpeg'), rgb(150, 150, 150)",
				backgroundSize: "cover",
				backgroundAttachment: "scroll",
				backgroundPosition: "center",
			}}
			className="w-full h-[100vh] flex items-center bg-blend-multiply pt-[20rem]"
		>
			<div className="relative w-[80%] m-auto text-white">
				<p className="absolute left-[30px] medium:left-[100px] top-[-20px] medium:top-[40px] text-[4rem] font-cursive font-thin">
					Kennel
				</p>
				<h1 className="font-cursive text-[5.5rem] medium:text-[10rem] font-thin ">
					Laverdaboom
				</h1>
				<p className="font-secondary text-[1.4rem] pl-[20px] absolute bottom-[-40px] sm:bottom-[0px] left-[-15px] medium:left-[0px] medium:bottom-[20px]">
					En liten kennel som föder upp taxar i familjemiljö
				</p>
			</div>
		</div>
	);
};

export default HeroSection;
