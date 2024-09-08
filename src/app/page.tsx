"use client";
import Image from "next/image";

import useSWR from "swr";
import Link from "next/link";
import { MurotalAlQuran } from "@/module/Quran";

const fetcher = async (url: any) => {
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

export default function Home() {
	const { data, error, isLoading } = useSWR(
		"https://equran.id/api/v2/surat/1",
		fetcher
	);
	const {
		data: surah1,
		error: errorSurah,
		isLoading: loadingSurah,
	} = useSWR("https://equran.id/api/v2/surat", fetcher);

	console.log(data, "bwa");

	return (
		<main className='flex font-poopins min-h-screen flex-col items-center justify-between h-screen overflow-hidden'>
			<MurotalAlQuran />
		</main>
	);
}
