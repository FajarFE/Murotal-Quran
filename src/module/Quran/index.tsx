import { SideBar } from "@/components/baseLayout/sideBar";
import PlayList from "@/components/Playlist";
import { useRouter } from "next/navigation";
import { fetcher } from "@/hooks/helper/fetcher";

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { MurotalTesks } from "@/components/Murotal";

export const MurotalAlQuran = () => {
	const [nomorSurah, setNomorSurah] = useState<number>(1);
	const redirect = useRouter();
	const [currentAyatIndex, setCurrentAyatIndex] = useState<number>(0);
	const [audioStarted, setAudioStarted] = useState<boolean>(false);
	const audioRef = useRef<HTMLAudioElement>(null);
	const {
		data,
		error: errorDetail,
		isLoading: loadingQuran,
	} = useSWR(`https://equran.id/api/v2/surat/${nomorSurah}`, fetcher);

	const {
		data: surahData,
		error: errorSurah,
		isLoading: loadingSurah,
	} = useSWR("https://equran.id/api/v2/surat", fetcher);

	const maksLength = data?.ayat?.length;
	const audioElement = audioRef.current;

	const handlePlay = () => {
		if (audioStarted) {
			audioElement?.pause();
			setAudioStarted(false);
		} else {
			audioElement?.play();
			setAudioStarted(true);
		}
	};

	const handleNextAyat = () => {
		if (currentAyatIndex < data?.data?.jumlahAyat) {
			setCurrentAyatIndex(currentAyatIndex + 1);
			setAudioStarted(true);
		}
	};

	const handleNextSurah = () => {
		if (!isNaN(nomorSurah) && nomorSurah < surahData?.data.length) {
			setNomorSurah(nomorSurah + 1); // Tambahkan satu ke nomor surah
			setCurrentAyatIndex(0); // Reset ayat ke awal
			setAudioStarted(true); // Atur ulang status audio
		}
	};

	const handlePrevSurah = () => {
		if (!isNaN(nomorSurah) && nomorSurah > 1) {
			setNomorSurah(nomorSurah - 1); // Kurangi satu dari nomor surah
			setCurrentAyatIndex(0); // Reset ayat ke awal
			setAudioStarted(true); // Atur ulang status audio
		}
	};

	const handlePrevAyat = () => {
		if (currentAyatIndex > 1 - 1) {
			setCurrentAyatIndex(currentAyatIndex - 1);
			setAudioStarted(true);
		}
	};

	useEffect(() => {
		const audioElement = audioRef.current;

		const handleNextAyat = () => {
			if (currentAyatIndex + 1 < data?.data?.jumlahAyat) {
				setCurrentAyatIndex(currentAyatIndex + 1);
			} else if (audioElement) {
				if (nomorSurah < surahData?.data.length) {
					setNomorSurah(nomorSurah + 1); // Pindah ke surah berikutnya setelah ayat habis
					setCurrentAyatIndex(0); // Reset ayat ke awal
					setAudioStarted(true); // Lanjutkan audio
				}
			}
		};

		if (audioElement) {
			audioElement.addEventListener("ended", handleNextAyat);
			audioElement.play();
			return () => {
				audioElement?.removeEventListener("ended", handleNextAyat);
			};
		}
	}, [currentAyatIndex, audioRef, data, nomorSurah, surahData]);

	const handleChangeSurah = (number: number) => {
		setNomorSurah(number);
	};

	useEffect(() => {
		setCurrentAyatIndex(0);
	}, [nomorSurah]);

	const handleKeyDown = (event: any) => {
		if (event.code === "Space") {
			event.preventDefault(); // Mencegah scroll halaman saat menekan spasi
			handlePlay();
		} else if (event.code === "ArrowLeft") {
			handlePrevSurah();
		} else if (event.code === "ArrowRight") {
			handleNextSurah();
		} else if (event.code === "ArrowUp") {
			event.preventDefault();
			handleNextAyat();
		} else if (event.code === "ArrowDown") {
			event.preventDefault();
			handlePrevAyat();
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [audioStarted, nomorSurah, currentAyatIndex]);

	return (
		<>
			<div className='grid grid-cols-12 min-h-screen relative w-full px-2 h-screen p-4 justify-center items-center'>
				<div className='absolute top-3 w-full flex justify-center items-center font-amiri'>
					Created - Fajar
				</div>
				<div className='w-full col-span-3 flex relative justify-center items-start h-screen px-9 '>
					<SideBar
						childreen={
							<div className=' w-full absolute bottom-4'>
								<PlayList
									currentAyatIndex={currentAyatIndex}
									audioRef={audioRef}
									buttonNextAyat={handleNextAyat}
									buttonNextSurah={handleNextSurah}
									buttonPlayOrPause={handlePlay}
									buttonPrevAyat={handlePrevAyat}
									buttonPrevSurah={handlePrevSurah}
									audioStarted={audioStarted}
									data={data?.data?.ayat}
								/>
							</div>
						}
						handleChangeSurah={handleChangeSurah}></SideBar>
				</div>
				<div className='w-full h-full  col-span-9 flex justify-center items-center'>
					<MurotalTesks
						nama={data?.data?.nama}
						namaLatin={data?.data?.namaLatin}
						arti={data?.data?.arti}
						jumlahAyat={data?.data?.jumlahAyat}
						nomor={data?.data?.nomor}
						tempatTurun={data?.data?.tempatTurun}
						data={data?.data?.ayat}
						dataReadSurah={data?.data?.ayat}
						currentAyatIndex={currentAyatIndex}
					/>
				</div>
			</div>
		</>
	);
};
