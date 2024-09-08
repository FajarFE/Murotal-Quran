"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { BsFillSkipEndFill, BsSkipForwardFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { TbPlayerPauseFilled } from "react-icons/tb";

export interface Surah {
	length: number;
	nomorAyat: number;
	teksArab: string;
	teksIndonesia: string;
	teksLatin: string;
	audio: { [key: string]: string };
	[key: number]: any;
}

export interface Quran {
	nama: string;
	namaLatin: string;
	nomor: number;
	jumlahAyat: number;
	deskripsi: string;
	arti: string;
}

const PlayList = ({
	data,
	buttonPlayOrPause,
	audioStarted,
	buttonNextAyat,
	buttonNextSurah,
	buttonPrevAyat,
	audioRef,
	buttonPrevSurah,
	currentAyatIndex,
}: {
	data: Surah;

	buttonPlayOrPause: () => void;
	audioStarted: boolean;
	buttonNextAyat: () => void;
	buttonNextSurah: () => void;
	buttonPrevAyat: () => void;
	audioRef: React.RefObject<HTMLAudioElement>;
	buttonPrevSurah: () => void;
	currentAyatIndex: number;
}) => {
	return (
		<>
			<div className='flex flex-col h-full'>
				<div className='flex flex-col w-full h-auto justify-center items-center relative '>
					<audio
						src={data && data[currentAyatIndex]?.audio["05"]}
						autoPlay
						ref={audioRef}
						className='absolute opacity-0'
					/>
				</div>
				<div className='flex flex-row py-6 gap-8 w-full justify-center items-center'>
					<motion.button
						className='focus:outline-none'
						whileTap={{ scale: 1.6 }}
						style={{ rotate: "180deg" }}
						onClick={buttonPrevSurah}>
						<BsSkipForwardFill size={20} />
					</motion.button>
					<motion.button
						className='focus:outline-none'
						whileTap={{ scale: 1.6 }}
						style={{ rotate: "180deg" }}
						onClick={buttonPrevAyat}>
						<BsFillSkipEndFill size={20} />
					</motion.button>
					<motion.button
						whileTap={{ scale: 1.6 }}
						className='w-10 bg-slate-600 p-2 rounded-full h-10 flex justify-center items-center focus:outline-none'
						transition={{
							stiffness: 0.2,
						}}
						onClick={buttonPlayOrPause}>
						{audioStarted ? (
							<TbPlayerPauseFilled size={23} color='white' />
						) : (
							<FaPlay size={20} color='white' />
						)}
					</motion.button>
					<motion.button
						className='focus:outline-none'
						whileTap={{ scale: 1.6 }}
						onClick={buttonNextAyat}>
						<BsFillSkipEndFill size={20} />
					</motion.button>
					<motion.button
						className='focus:outline-none'
						whileTap={{ scale: 1.6 }}
						onClick={buttonNextSurah}>
						<BsSkipForwardFill size={20} />
					</motion.button>
				</div>
			</div>
		</>
	);
};

export default PlayList;
