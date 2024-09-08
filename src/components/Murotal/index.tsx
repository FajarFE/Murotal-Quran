"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { clsx } from "clsx";
import { BsFillSkipEndFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

import localFont from "next/font/local";
import Link from "next/link";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { BsSkipForwardFill } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { fetcher } from "@/hooks/helper/fetcher";
import useSWR from "swr";
import { toArabicNumber } from "@/lib/utils";
interface dataSurah {
	length: number;
	nomorAyat: number;
	teksArab: string;
	teksIndonesia: string;
	teksLatin: string;
	audio: object;
	[key: number]: any;
}

interface dataQuran {
	nama: string;
	namaLatin: string;
	nomor: number;
	jumlahAyat: number;
	deskripsi: HTMLElement;
	arti: string;
}

type AudioFull = {
	"01": string;
	"02": string;
	"03": string;
	"04": string;
	"05": string;
};

type Tafsir = {
	ayat: number;
	teks: string;
};

type Surat = {
	nomor: number;
	nama: string;
	namaLatin: string;
	jumlahAyat: number;
};

type DataSurat = {
	nomor: number;
	nama: string;
	namaLatin: string;
	jumlahAyat: number;
	tempatTurun: string;
	arti: string;
	deskripsi: string;
	audioFull: AudioFull;
	tafsir: Tafsir[];
	suratSelanjutnya?: Surat;
	suratSebelumnya?: Surat;
};

type ApiResponse = {
	code: number;
	message: string;
	data: DataSurat;
};

export const MurotalTesks = ({
	data,
	jumlahAyat,
	nama,
	arti,
	tempatTurun,
	nomor,
	namaLatin,
	dataReadSurah,
	currentAyatIndex,
}: {
	data: dataSurah;
	dataReadSurah: dataSurah[];
	jumlahAyat: number;
	nama: string;
	arti: string;
	nomor: number;
	tempatTurun: string;
	namaLatin: string;
	currentAyatIndex: number;
}) => {
	const redirect = useRouter();
	const [murotal, setMurotal] = useState<boolean>(true);
	const [tafsir, setTafsir] = useState<boolean>(false);
	const [numberTafsir, setNumberTafsir] = useState<number>(0);
	const [readQuran, setReadQuran] = useState<boolean>(false);
	const variants: Variants = {
		initial: { opacity: 0, translateY: 60 },
		animate: { opacity: 1, translateY: 0 },
		exit: { opacity: 0, translateY: -60 },
	};

	const {
		data: dataTafsir,
		error: errorTafsir,
		isLoading: loadingTafsir,
	} = useSWR(`https://equran.id/api/tafsir/${nomor}`, fetcher);

	console.log(dataTafsir);
	const handleMurotal = () => {
		setMurotal(true);
		setReadQuran(false);
		setTafsir(false);
	};

	console.log(JSON.stringify(dataTafsir), "awodkoakdo");

	const handleReadQuran = () => {
		setReadQuran(true);
		setMurotal(false);
		setTafsir(false);
	};

	const handleTafsir = (number: number) => {
		setTafsir(true);
		setMurotal(false);
		setReadQuran(false);
		setNumberTafsir(number);
	};

	const handleReadTafsir = () => {
		setTafsir(true);
		setMurotal(false);
		setReadQuran(false);
	};
	return (
		<>
			<div className='grid  grid-rows-12 w-full  h-screen pt-10 pr-10'>
				<div className='w-full row-span-2 text-poopins bg-slate-600 rounded-md  text-2xl p-4 flex-row'>
					<div className='bg-white rounded-md p-4 w-full flex justify-between items-center h-full'>
						<div className='flex-col flex gap-2  justify-center items-start text-slate-600'>
							<div className='flex flex-row gap-2'>
								<div>{namaLatin}</div>
								<span>-</span>
								<div className='font-amiri'>{nama}</div>
							</div>
							<div className='flex flex-row gap-2 text-lg'>
								<div>{arti}</div>
								<span>-</span>
								<div>{jumlahAyat}</div>
								<span>-</span>
								<div>{tempatTurun}</div>
							</div>
						</div>
						<div className='text-slate-600'>{toArabicNumber(nomor)}</div>
					</div>
				</div>
				<div className='row-span-1 flex flex-row justify-start items-center gap-5'>
					<button
						className={`focus:outline-none font-bold  py-2 px-5 rounded-md  ${
							murotal
								? "bg-slate-600 text-white"
								: "bg-slate-300 text-slate-600"
						}`}
						onClick={handleMurotal}>
						Murotal
					</button>
					<button
						className={`focus:outline-none font-bold  py-2 px-5 rounded-md  ${
							readQuran
								? "bg-slate-600 text-white"
								: "bg-slate-300 text-slate-600"
						}`}
						onClick={handleReadQuran}>
						Baca Al Quran
					</button>
					<button
						className={`focus:outline-none font-bold  py-2 px-5 rounded-md  ${
							tafsir ? "bg-slate-600 text-white" : "bg-slate-300 text-slate-600"
						}`}
						onClick={handleReadTafsir}>
						Tafsir
					</button>
				</div>
				{murotal && (
					<>
						<div className='w-full  h-full   justify-center items-center flex flex-col row-span-4 text-right'>
							<AnimatePresence>
								<motion.p
									variants={variants}
									initial='initial'
									animate='animate'
									exit='exit'
									transition={{
										duration: 0.4,
									}}
									className='absolute text-right text-[30px] font-amiri px-20 leading-loose text-slate-500'
									key={data && data[currentAyatIndex]?.teksArab}>
									{data && data[currentAyatIndex]?.teksArab}
								</motion.p>
							</AnimatePresence>
						</div>
						<div className='w-full h-full  relative justify-center items-center flex row-span-2'>
							<AnimatePresence>
								<motion.p
									variants={variants}
									initial='initial'
									animate='animate'
									exit='exit'
									transition={{
										duration: 0.4,
									}}
									key={data && data[currentAyatIndex]?.teksLatin}
									className='w-full absolute flex justify-start items-center px-20 text-left text-lg font-bold '>
									{data && data[currentAyatIndex]?.teksLatin}
								</motion.p>
							</AnimatePresence>
						</div>
						<div className='w-full h-auto  relative justify-center items-center flex row-span-2'>
							<AnimatePresence>
								<motion.p
									variants={variants}
									initial='initial'
									animate='animate'
									exit='exit'
									transition={{
										duration: 0.4,
									}}
									key={data && data[currentAyatIndex]?.teksIndonesia}
									className='w-full absolute flex justify-start items-center px-20 text-left text-md '>
									{data && data[currentAyatIndex]?.teksIndonesia}
								</motion.p>
							</AnimatePresence>
						</div>
					</>
				)}
				<div
					style={{
						zIndex: 200,
						overflowY: "scroll",
					}}
					className='flex row-span-9 gap-2 flex-col scroll-hide'>
					{readQuran && (
						<>
							{dataReadSurah &&
								dataReadSurah.map((data: any, index: number) => (
									<div
										key={index}
										className='flex rounded-md flex-col border-2 p-8 gap-4'>
										<div className='flex justify-end items-center font-amiri text-2xl text-slate-500 gap-10 leading-loose'>
											<div>{toArabicNumber(data.nomorAyat)}</div>
											<div>{data.teksArab}</div>
										</div>
										<div>{data.teksLatin}</div>
										<div>{data.teksIndonesia}</div>
										<button
											onClick={() => handleTafsir(data.nomorAyat)}
											className='bg-slate-500 gap-2 justify-center items-center w-[10%] py-2 px-5 flex flex-row rounded-md text-white'>
											<div>Tafsir</div>
											<TbReportSearch size={25} color='white' />
										</button>
									</div>
								))}
						</>
					)}

					{tafsir && (
						<>
							<pre className='my-10 font-poopins  whitespace-pre-wrap'>
								{dataTafsir?.tafsir[numberTafsir].tafsir}
							</pre>
						</>
					)}
				</div>
			</div>
		</>
	);
};
