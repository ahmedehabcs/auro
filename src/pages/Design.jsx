import React, { useEffect, useState, useCallback } from "react";
import { FaHome } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import DesignItems from "../components/Design/DesignItems.jsx";
import PreviewItems from "../components/Design/DesignPreview.jsx";
import MainPhotos from "../components/jsonFiles/DesignMainPhotos.json";
import SecondPhotos from "../components/jsonFiles/DesignSecondPhotos.json";

const DesignPage = () => {
	const navigate = useNavigate();
	const navToHome = () => navigate("/home");

	const [mainImages] = useState(MainPhotos);
	const [previewImages, setPreviewImages] = useState([]);
	const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
	const [isPreviewOpen, setIsPreviewOpen] = useState(true);

	const handleOpenPreview = useCallback((id) => {
		const mainImage = MainPhotos.find((photo) => photo.id === id);
		const newSecondImages = SecondPhotos.filter((photo) => photo.foreignId === id);
		const combined = [mainImage, ...newSecondImages];

		setPreviewImages(combined);
		setCurrentPreviewIndex(0);
		setIsPreviewOpen(false);
	}, []);

	const handleClosePreview = useCallback(() => {
		setPreviewImages([]);
		setIsPreviewOpen(true);
	}, []);

	const handlePrevImage = useCallback(() => {
		setCurrentPreviewIndex((prev) =>
			prev > 0 ? prev - 1 : previewImages.length - 1
		);
	}, [previewImages.length]);

	const handleNextImage = useCallback(() => {
		setCurrentPreviewIndex((prev) =>
			prev < previewImages.length - 1 ? prev + 1 : 0
		);
	}, [previewImages.length]);

	// Keyboard support
	useEffect(() => {
		if (isPreviewOpen) return;

		const handleKeyDown = (e) => {
			if (e.key === "Escape") handleClosePreview();
			if (e.key === "ArrowLeft") handlePrevImage();
			if (e.key === "ArrowRight") handleNextImage();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isPreviewOpen, handleClosePreview, handlePrevImage, handleNextImage]);

	// RENDER
	return (
		<section className="relative min-h-screen w-screen bg-linear-to-r from-purple-900 via-black to-purple-900 pt-10">
			{/* Top navigation */}
			<div className="absolute top-26 left-6 flex items-center text-white text-lg font-semibold z-50">
				<FaHome
					onClick={navToHome}
					className="text-3xl hover:text-purple-300 cursor-pointer transition"
				/>
				<BsArrowRight className="mx-2 text-xl" />
				<span className="text-xl">Design</span>
			</div>

			{/* Title */}
			<h2
				className="text-4xl sm:text-5xl font-bold text-white text-center mb-10"
				style={{ fontFamily: '"UnifrakturCook", cursive' }}
			>
				Discover the Design
			</h2>

			{/* Design GRID */}
			<div className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 md:p-10 sm:p-7 p-5 pt-12">
				{mainImages.map((image, index) => (
					<DesignItems
						key={index}
						imageSrc={image.src}
						imageAlt={image.alt}
						imageDesc={image.desc}
						handleOpenPreview={() => handleOpenPreview(image.id)}
					/>
				))}

				{/* PREVIEW POPUP */}
				{previewImages.length > 0 && (
					<PreviewItems
						imageSrc={previewImages[currentPreviewIndex]?.src}
						handleClosePreview={handleClosePreview}
						onPrev={handlePrevImage}
						onNext={handleNextImage}
						currentIndex={currentPreviewIndex + 1}
						totalImages={previewImages.length}
					/>
				)}

				<div className="h-24"></div>
			</div>
		</section>
	);
};

export default DesignPage;