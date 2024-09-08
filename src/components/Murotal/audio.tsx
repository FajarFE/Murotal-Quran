import React from "react";

interface AudioProps {
	data: { [key: string]: any } | null;
	currentAyatIndex: string;
	audioRef: React.RefObject<HTMLAudioElement>;
}

const Audio: React.FC<AudioProps> = ({ data, currentAyatIndex, audioRef }) => {
	return (
		<audio
			src={data && data[currentAyatIndex].audio["05"]}
			controls
			autoPlay
			ref={audioRef}
		/>
	);
};

export default Audio;
