import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const toArabicNumber = (number?: number) => {
	if (typeof number !== "number" || isNaN(number)) {
		return ""; // Mengembalikan string kosong jika input tidak valid
	}

	const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

	return number
		.toString()
		.split("")
		.map((digit) => arabicNumbers[parseInt(digit)])
		.join("");
};
