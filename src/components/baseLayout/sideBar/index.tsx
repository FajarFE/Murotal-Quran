"use client";
import Link from "next/link";
import { fetcher } from "@/hooks/helper/fetcher";
import useSWR from "swr";
import { toArabicNumber } from "@/lib/utils";

interface ButtonIndex {
	handleChangeSurah: (nomor: number) => void;
	childreen: React.ReactNode; // Adjusted to accept a parameter
}

export const SideBar = ({ handleChangeSurah, childreen }: ButtonIndex) => {
	const {
		data,
		error: errorSurah,
		isLoading: loadingSurah,
	} = useSWR("https://equran.id/api/v2/surat", fetcher);

	if (loadingSurah) return <p>Loading...</p>;
	if (errorSurah) return <p>Error loading data</p>;

	return (
		<div className='flex relative h-full w-full justify-center items-center flex-col overflow-hidden'>
			<div
				style={{
					zIndex: 200,
					overflowY: "scroll",
				}}
				className='w-full scroll-hide h-[85%] top-[40px] absolute bg-slate-600 rounded-md p-4'>
				<div className='flex-col flex gap-3 w-full'>
					{data &&
						data.data.map((item: any, index: number) => (
							<button
								style={{ pointerEvents: "auto" }}
								className='cursor-pointer bg-white rounded-md text-lg p-2 flex justify-start gap-6 items-center '
								onClick={() => handleChangeSurah(item.nomor)}
								key={index}>
								<div>{toArabicNumber(item.nomor)}</div>
								<div className='flex flex-col justify-start items-start gap-2'>
									<div className='flex flex-row justify-center items-center gap-2 font-bold'>
										<div>{item.namaLatin}</div>
										<span>-</span>{" "}
										<div className='font-amiri '>{item.nama}</div>
									</div>
									<div className='flex flex-row gap-2 text-sm'>
										<div>{item.arti}</div>
										<span>-</span>
										<div>{item.jumlahAyat} Ayat</div>
									</div>
								</div>
							</button>
						))}
				</div>
			</div>
			<div className='flex justify-center items-center'>{childreen}</div>
		</div>
	);
};
